# Real Stories — Data Source Strategy

## Phase 1 (CURRENT) — Hardcoded sample data
File: `src/components/arefin/testimonials-variations/data.ts`

8 sample reviews in Google Places review schema. Marked clearly as PLACEHOLDER until real Google reviews are seeded.

**To replace with real reviews:** open `data.ts` and replace the `GOOGLE_REVIEWS` array with content extracted from the Google Maps page.

## Phase 2 (FUTURE) — Featurable API (recommended)

Featurable is a free service that wraps the Google Places API. It's how WordPress plugins like "Widgets for Google Reviews" work without asking the user for an API key — the vendor's server handles authentication with Google.

### Setup
1. Go to https://featurable.com
2. Add Dr. Arefin's business (Place ID: CID `15108412135090448897`)
3. Featurable returns a `widgetId` (e.g. `abc123`)
4. Their public endpoint: `https://featurable.com/api/v1/widgets/{widgetId}` (returns JSON with `reviews[]` and `aggregateRating`)

### Implementation (Lovable Cloud edge function)
```ts
// supabase/functions/google-reviews/index.ts
const WIDGET_ID = Deno.env.get('FEATURABLE_WIDGET_ID')!;

Deno.serve(async () => {
  const r = await fetch(`https://featurable.com/api/v1/widgets/${WIDGET_ID}`);
  const data = await r.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 's-maxage=21600' },
  });
});
```

Then in React:
```ts
const { data } = useQuery({
  queryKey: ['google-reviews'],
  queryFn: () => fetch('/functions/v1/google-reviews').then(r => r.json()),
  staleTime: 6 * 60 * 60 * 1000, // 6h
});
```

## Phase 2 (ALTERNATIVE) — Direct Google Places API

If you prefer official Google API:
1. Google Cloud Console → enable Places API → create API key → restrict to your domain
2. Add `GOOGLE_PLACES_API_KEY` as a Lovable Cloud secret
3. Edge function calls `https://maps.googleapis.com/maps/api/place/details/json?place_id={CID}&fields=reviews,rating,user_ratings_total&key={KEY}`
4. **Hard limit: 5 most recent reviews only** (Google does not expose more via Places API)

## Why we did NOT scrape directly
- The Google Maps share link returns HTML where reviews are loaded by JavaScript after page load — they are NOT in the initial HTML we can fetch.
- Scraping the JS-rendered page violates Google ToS and breaks every few months.

## Component Contract Stability
All three variations consume:
```ts
import { GOOGLE_REVIEWS, GOOGLE_AGGREGATE } from './data';
```
Phase 2 simply replaces those constants with hook-fetched values; no component edits needed.
