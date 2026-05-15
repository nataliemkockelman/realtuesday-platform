import { ImageResponse } from 'next/og';

/**
 * Apple touch icon — 180×180. Used when someone "Add to Home Screen"s the
 * site on iOS, and as a higher-res fallback in some browsers/social previews.
 *
 * Bigger badge with more breathing room than the favicon — at this size we
 * can show the M generously without losing crispness.
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
            width: 132,
            height: 132,
            borderRadius: 999,
            background: '#C75D4A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1A2238',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: 90,
            lineHeight: 1,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size },
  );
}
