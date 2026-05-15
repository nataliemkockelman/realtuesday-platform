import { ImageResponse } from 'next/og';

/**
 * Favicon — rT cream square on navy at 32×32. Mirrors the in-site nav
 * submark so the favicon matches what people see in the app.
 * Generated at build time via Next.js's ImageResponse API.
 */

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A2238',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 4,
            background: '#F6F1E8',
            color: '#1A2238',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: 14,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          rT
          {/* Copper hairline under the wordmark — same accent as the in-site nav */}
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: 4,
              width: 5,
              height: 1.5,
              background: '#C97B3E',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
