/**
 * Build a stable, SEO-friendly URL for a YouTube video page.
 *
 * Format: /video/{slug}-{videoId}
 *   - slug: kebab-case from title, ASCII only, max ~80 chars
 *   - videoId: appended last so it can always be recovered with a
 *     simple regex even if the title (and slug) changes later.
 *
 * Recovery: the last `-XXXXXXXXXXX` segment of the path is the videoId
 * (YouTube IDs are 11 chars, [A-Za-z0-9_-]).
 */
export function slugify(input: string): string {
  return (input || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // keep letters/numbers/space/dash (handles Bangla)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
    .replace(/-$/, "");
}

export function buildVideoPath(title: string, videoId: string): string {
  const slug = slugify(title);
  return slug ? `/video/${slug}-${videoId}` : `/video/${videoId}`;
}

/** Recover the YouTube videoId from a path param like "my-title-dQw4w9WgXcQ" or just "dQw4w9WgXcQ". */
export function extractVideoId(slugOrId: string): string {
  if (!slugOrId) return "";
  const m = slugOrId.match(/([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : slugOrId;
}
