# 07 — Videos Section: Audit & Gap

## Source content
- Live source on `drarefin.com` shows a **YouTube grid** under heading "Recent Videos of Dr. M. Arefin".
- Spec page `Dr-Arefin-Spec/pages/01-home.md` Section 6 lists 7 hardcoded Bangla titles.
- Live site notes: "loads dynamically (live site shows 'Loading videos...')".
- New requirement (this iteration): pull live from YouTube Data API v3, channel handle `@HealthPanacea`, max 8 latest uploads.

## Section name
**Recent YouTube Videos** (overrides spec heading "Recent Videos of Dr. M. Arefin").

## Goal
Replace static thumbnails with a dynamic, premium-medical YouTube feed that:
1. Fetches latest 8 uploads via the YouTube Data API.
2. Opens each video in an in-page modal lightbox (no leaving the site).
3. Maintains the Dr. Arefin light-theme aesthetic (sage greens, generous whitespace, Ubuntu/Poppins typography).
4. Provides graceful fallback (skeleton loaders + error state).

## API strategy
Two-step fetch (per user spec):
1. `GET /youtube/v3/channels?part=contentDetails&forHandle=@HealthPanacea&key=...`
   → extract `items[0].contentDetails.relatedPlaylists.uploads`.
2. `GET /youtube/v3/playlistItems?part=snippet&playlistId={uploadsId}&maxResults=8&key=...`
   → map `snippet.title`, `snippet.thumbnails.high.url`, `snippet.resourceId.videoId`.

## Security note
Per user decision, the API key is hardcoded client-side (`AIzaSyBXaJHyheJHlplVRWJijHtqp9Gxou9N8TU`).
**Recommendation logged**: restrict key by HTTP referrer in Google Cloud Console (`*.lovable.app/*`, `drarefin.com/*`) to mitigate quota abuse.
Future hardening path: move to a Lovable Cloud edge function with the key as a server secret.

## Variations
- **A — Editorial Grid**: Clean 4-col desktop grid, thumbnail-only, minimalist captions. Swiss medical-journal feel.
- **B — Featured + Grid**: First video large/featured, 6 secondary in a 3-col grid. Magazine layout.
- **C — Carousel Showcase**: Horizontal scroll-snap carousel with peek + navigation arrows. Premium boutique feel.

## Interaction
- All variations: click thumbnail → in-page modal with embedded YouTube iframe (autoplay, no related videos).
- ESC + backdrop click closes modal.
- Body scroll-lock when open.

## Accessibility
- Each thumbnail is a `<button>` with `aria-label="Play video: {title}"`.
- Modal uses `role="dialog"`, `aria-modal="true"`, `aria-label="YouTube video player"`.
- Focus returns to the trigger on close.
- Skeleton loader announces with `aria-busy="true"`.
