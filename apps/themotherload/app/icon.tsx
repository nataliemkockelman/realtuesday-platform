import { ImageResponse } from 'next/og';

/**
 * Favicon — coral M badge on navy at 32×32. Generated at build time via
 * Next.js's ImageResponse API. Same shape as the Nav badge so the favicon
 * matches what people see in the app.
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
            width: 24,
            height: 24,
            borderRadius: 999,
            background: '#C75D4A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1A2238',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: 16,
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
