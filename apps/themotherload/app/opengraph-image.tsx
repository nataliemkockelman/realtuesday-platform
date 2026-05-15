import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Open Graph share preview — 1200×630 PNG, used by iMessage, Facebook,
 * LinkedIn, Slack, etc. when the site URL is pasted anywhere.
 *
 * Layout: M coral badge top-left, big italic Motherload wordmark in the
 * lower half, tagline below, URL bottom-right. Coral hairline accent in
 * brand palette.
 *
 * Font note: Satori needs uncompressed static TTF/OTF — variable fonts
 * crash its parser. We bundle just one static TTF (DM Serif Display Italic
 * for the wordmark) under app/fonts/og/. Other text falls back to Satori's
 * default sans-serif, which is fine — the wordmark is the brand-defining
 * piece, the rest is supporting copy.
 */

export const alt =
  'the Motherload — for moms running the whole damn show';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const dmSerifItalic = await readFile(
    path.join(process.cwd(), 'app', 'fonts', 'og', 'DMSerifDisplay-Italic.ttf'),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A2238',
          color: '#F6F1E8',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
          position: 'relative',
        }}
      >
        {/* Top — coral M badge with brand label */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: '#C75D4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A2238',
              fontWeight: 900,
              fontSize: 32,
              lineHeight: 1,
              marginRight: 18,
            }}
          >
            M
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#E8826E',
              letterSpacing: '0.05em',
              textTransform: 'lowercase',
              fontWeight: 500,
            }}
          >
            a real tuesday brand
          </div>
        </div>

        {/* Hero block — bottom-anchored */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            marginBottom: 24,
          }}
        >
          {/* "the" — small lowercase prefix above the wordmark */}
          <div
            style={{
              fontSize: 36,
              color: '#F6F1E8',
              opacity: 0.85,
              lineHeight: 1,
              marginBottom: 4,
              letterSpacing: '0.02em',
              textTransform: 'lowercase',
            }}
          >
            the
          </div>

          {/* Wordmark — DM Serif Display italic, sized to fit */}
          <div
            style={{
              fontFamily: 'DM Serif Display',
              fontStyle: 'italic',
              fontSize: 168,
              lineHeight: 0.92,
              color: '#E8826E',
              letterSpacing: '-0.02em',
            }}
          >
            Motherload
          </div>

          {/* Coral hairline + tagline */}
          <div
            style={{
              width: 56,
              height: 4,
              background: '#C75D4A',
              marginTop: 28,
              marginBottom: 18,
            }}
          />
          <div
            style={{
              fontSize: 32,
              color: '#FFB89E',
              letterSpacing: '0.005em',
            }}
          >
            for moms running the whole damn show
          </div>
        </div>

        {/* Bottom-right URL stamp */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            bottom: 48,
            fontSize: 18,
            color: '#E8C5BD',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          themotherload.co
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'DM Serif Display', data: dmSerifItalic, style: 'italic', weight: 400 },
      ],
    },
  );
}
