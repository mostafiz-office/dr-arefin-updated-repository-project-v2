import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const CHANNEL_ID = 'UCmaCT3yCPPlApmGsvqUQBGA';
// Allow override via env; falls back to the project's existing key.
const API_KEY = Deno.env.get('YOUTUBE_API_KEY') ?? 'AIzaSyBXaJHyheJHlplVRWJijHtqp9Gxou9N8TU';

interface VideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}

const REFERER = Deno.env.get('YOUTUBE_REFERRER') ?? 'https://drarefin.com/';

async function fetchUploadsPlaylistId(): Promise<string> {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
  const res = await fetch(url, { headers: { Referer: REFERER } });
  if (!res.ok) throw new Error(`channels ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const id = json?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!id) throw new Error('uploads playlist not found');
  return id;
}

async function fetchPlaylistItems(playlistId: string, max = 12): Promise<VideoItem[]> {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${max}&playlistId=${playlistId}&key=${API_KEY}`;
  const res = await fetch(url, { headers: { Referer: REFERER } });
  if (!res.ok) throw new Error(`playlistItems ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return (json.items || []).map((it: any) => {
    const s = it.snippet || {};
    const videoId = s.resourceId?.videoId || '';
    const thumb =
      s.thumbnails?.maxres?.url ||
      s.thumbnails?.high?.url ||
      s.thumbnails?.medium?.url ||
      s.thumbnails?.default?.url ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    return {
      videoId,
      title: s.title || '',
      description: s.description || '',
      thumbnail: thumb,
      publishedAt: s.publishedAt || '',
      link: `https://www.youtube.com/watch?v=${videoId}`,
    } as VideoItem;
  }).filter((v: VideoItem) => v.videoId);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
    const playlistId = await fetchUploadsPlaylistId();
    const items = await fetchPlaylistItems(playlistId, 12);
    return new Response(JSON.stringify({ items }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=900',
      },
    });
  } catch (e) {
    console.error('[youtube-feed]', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
