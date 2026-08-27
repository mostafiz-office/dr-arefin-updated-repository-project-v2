import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * useYouTubeUploads
 *
 * Calls the `youtube-feed` edge function which fetches YouTube's public RSS
 * server-side (no CORS, no datacenter blocks), and returns parsed video items.
 */
export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}

interface FeedItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function useYouTubeUploads(maxResults = 8) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fnErr } = await supabase.functions.invoke("youtube-feed");
        if (fnErr) throw fnErr;
        const items: FeedItem[] = (data as any)?.items || [];
        if (!items.length) throw new Error("No videos found");

        const seenIds = new Set<string>();
        const seenTitles = new Set<string>();
        const normalizeTitle = (t: string) =>
          t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim().slice(0, 60);

        const mapped: YouTubeVideo[] = items
          .map((item) => {
            if (!item.videoId) return null;
            const title = item.title?.trim() || "Untitled video";
            const titleKey = normalizeTitle(title);
            if (seenIds.has(item.videoId) || (titleKey && seenTitles.has(titleKey))) {
              return null;
            }
            seenIds.add(item.videoId);
            if (titleKey) seenTitles.add(titleKey);
            return {
              videoId: item.videoId,
              title,
              description: stripHtml(item.description || ""),
              thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
              publishedAt: item.publishedAt || "",
              link: item.link || `https://www.youtube.com/watch?v=${item.videoId}`,
            };
          })
          .filter((v): v is YouTubeVideo => v !== null)
          .slice(0, maxResults);

        if (!mapped.length) throw new Error("No videos found");
        if (!cancelled) setVideos(mapped);
      } catch (e: any) {
        console.error("[useYouTubeUploads]", e);
        if (!cancelled) setError(e?.message || "failed to load videos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [maxResults, reloadKey]);

  return { videos, loading, error, retry: () => setReloadKey((k) => k + 1) };
}
