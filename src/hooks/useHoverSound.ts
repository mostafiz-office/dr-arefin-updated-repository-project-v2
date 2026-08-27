import { useCallback, useEffect, useRef } from "react";
import swooshSrc from "@/assets/audio/fade-swoosh.mp3";

/**
 * Shared hover-sound hook.
 * - One singleton HTMLAudioElement per page (reused across all triggers).
 * - Respects prefers-reduced-motion (silent if the user opts out).
 * - Primes audio on first user pointerdown to bypass autoplay restrictions.
 */
let sharedAudio: HTMLAudioElement | null = null;
let primed = false;

function getAudio(): HTMLAudioElement {
  if (!sharedAudio) {
    sharedAudio = new Audio(swooshSrc);
    sharedAudio.preload = "auto";
    sharedAudio.volume = 0.4;
  }
  return sharedAudio;
}

export function useHoverSound() {
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", onChange);

    // Prime the audio element on first user interaction so the very
    // first hover after page load is allowed to play.
    const prime = () => {
      if (primed) return;
      primed = true;
      const a = getAudio();
      const prevVolume = a.volume;
      a.volume = 0;
      a.play()
        .then(() => {
          a.pause();
          a.currentTime = 0;
          a.volume = prevVolume;
        })
        .catch(() => {
          a.volume = prevVolume;
        });
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("keydown", prime, { once: true });

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);

  const play = useCallback(() => {
    if (reducedMotion.current) return;
    const a = getAudio();
    try {
      a.currentTime = 0;
      void a.play().catch(() => {
        /* autoplay blocked — will work after first interaction */
      });
    } catch {
      /* noop */
    }
  }, []);

  return play;
}
