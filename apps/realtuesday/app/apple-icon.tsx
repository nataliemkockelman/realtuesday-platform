import { ImageResponse } from 'next/og';

/**
 * Apple touch icon — same rT submark scaled up to 180×180. Used when an
 * iOS visitor adds the site to their home screen, or by Safari for the
 * tab favicon on retina displays.
 */

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
            width: 140,
            height: 140,
            borderRadius: 22,
            background: '#F6F1E8',
            color: '#1A2238',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: 76,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          rT
          <div
            style={{
              position: 'absolute',
              bottom: 22,
              left: 22,
              width: 26,
              height: 6,
              background: '#C97B3E',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
