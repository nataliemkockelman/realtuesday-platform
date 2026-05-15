import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Open Graph share preview — 1200×630 PNG, used by iMessage, Facebook,
 * LinkedIn, Slack, Twitter/X, etc. when the site URL is pasted anywhere.
 *
 * Layout matches the home hero:
 *   rT submark + eyebrow at the top
 *   "real" (Bricolage 800 cream) + "Tuesday" (Fraunces italic with copper
 *   foil rendered as inline SVG) stacked
 *   tagline below
 *   url stamp bottom-right
 *
 * Font note: Satori needs static TTFs — variable-font woff2 crashes its
 * parser. The two TTFs in app/fonts/og/ are downloaded by
 * scripts/install-og-fonts.mjs from upstream font repos on GitHub.
 */

export const alt =
  'real Tuesday — a studio making things worth your Tuesday';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const [bricolage, fraunces] = await Promise.all([
    readFile(path.join(process.cwd(), 'app', 'fonts', 'og', 'BricolageGrotesque-ExtraBold.ttf')),
    readFile(path.join(process.cwd(), 'app', 'fonts', 'og', 'Fraunces-Italic.ttf')),
  ]);

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
        {/* Top — rT cream submark + eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 6,
              background: '#F6F1E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A2238',
              fontFamily: 'Bricolage Grotesque',
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginRight: 18,
              position: 'relative',
            }}
          >
            rT
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                width: 11,
                height: 3,
                background: '#C97B3E',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'Bricolage Grotesque',
              fontSize: 18,
              color: '#E9A566',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            — est · sioux falls —
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
          <div
            style={{
              fontFamily: 'Bricolage Grotesque',
              fontWeight: 800,
              fontSize: 180,
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              color: '#F6F1E8',
              textTransform: 'lowercase',
              marginBottom: 4,
            }}
          >
            real
          </div>

          {/* Foil "Tuesday" — Satori doesn't support SVG <text>, but does
              support CSS background-clip:text + transparent color.
              Gradient stops match the in-site FoilText 'copper' variant. */}
          <div
            style={{
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: 180,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              backgroundImage:
                'linear-gradient(110deg, #A8531F 0%, #C97B3E 20%, #E9A566 40%, #F5D18F 50%, #E9A566 60%, #C97B3E 80%, #A8531F 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Tuesday
          </div>

          {/* Copper hairline + tagline */}
          <div
            style={{
              width: 56,
              height: 4,
              background: '#C97B3E',
              marginTop: 28,
              marginBottom: 18,
            }}
          />
          <div
            style={{
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: 30,
              color: '#F5D18F',
              letterSpacing: '0.005em',
              lineHeight: 1.3,
            }}
          >
            A studio making things worth your Tuesday.
          </div>
        </div>

        {/* Bottom-right URL stamp */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            bottom: 48,
            fontFamily: 'Bricolage Grotesque',
            fontWeight: 800,
            fontSize: 16,
            color: '#E8C5BD',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          arealtuesday.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bricolage Grotesque', data: bricolage, style: 'normal', weight: 800 },
        { name: 'Fraunces', data: fraunces, style: 'italic', weight: 400 },
      ],
    },
  );
}
