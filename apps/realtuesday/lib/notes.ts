/**
 * Filesystem-backed newsletter loader. Reads .md files from
 * `app/../content/notes/` and parses YAML frontmatter via gray-matter.
 *
 * No CMS, no DB. When the post list grows enough to need indexing,
 * pagination, or tagging, revisit — until then, this is the simplest
 * thing that works.
 *
 * All functions are server-only (Node fs). Call them from Server
 * Components or Route Handlers, never from a `'use client'` boundary.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Resolve against the Next.js project root (process.cwd()). For both
// `next build` and `next dev`, cwd is the app directory containing
// package.json — so this works locally and on Vercel.
const NOTES_DIR = join(process.cwd(), 'content', 'notes');

export interface NoteFrontmatter {
  title: string;
  slug: string;
  issue: number;
  issueLabel: string;
  deck: string;
  readingTime: string;
  publishedAt: string; // ISO date
  byline: string;
}

export interface Note extends NoteFrontmatter {
  /** Sanitized HTML rendered from the markdown body. */
  bodyHtml: string;
  /** Raw markdown source — useful for word counts, RSS, etc. */
  body: string;
}

export interface NoteSummary extends NoteFrontmatter {
  /** First paragraph for list previews. */
  excerpt: string;
}

async function readNoteFile(filename: string): Promise<Note> {
  const raw = await readFile(join(NOTES_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as NoteFrontmatter;
  const bodyHtml = await marked.parse(content, { async: true });
  return { ...fm, body: content, bodyHtml };
}

/** All notes, newest first. */
export async function getAllNotes(): Promise<NoteSummary[]> {
  const files = (await readdir(NOTES_DIR)).filter((f) => f.endsWith('.md'));
  const notes = await Promise.all(
    files.map(async (filename) => {
      const raw = await readFile(join(NOTES_DIR, filename), 'utf8');
      const { data, content } = matter(raw);
      const fm = data as NoteFrontmatter;
      // Excerpt = first non-heading paragraph, with markdown emphasis stripped.
      const firstPara =
        content
          .split('\n\n')
          .find((b) => b.trim() && !b.startsWith('#') && !b.startsWith('>'))
          ?.replace(/[*_`]/g, '')
          .trim() ?? '';
      return { ...fm, excerpt: firstPara };
    }),
  );
  return notes.sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1));
}

/** A single note by slug, or null if not found. */
export async function getNote(slug: string): Promise<Note | null> {
  try {
    return await readNoteFile(`${slug}.md`);
  } catch {
    return null;
  }
}

/** Slugs for static params generation. */
export async function getAllNoteSlugs(): Promise<string[]> {
  const files = (await readdir(NOTES_DIR)).filter((f) => f.endsWith('.md'));
  return files.map((f) => f.replace(/\.md$/, ''));
}
