"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { VideoWatermark } from "./VideoWatermark";

type VideoPlayerProps = {
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
  totalSeconds: number;
  userEmail: string;
  userPhone: string;
  previousLessonHref?: string;
  nextLessonHref?: string;
};

export function VideoPlayer({
  lessonId,
  lessonTitle,
  moduleTitle,
  totalSeconds,
  userEmail,
  userPhone,
  previousLessonHref,
  nextLessonHref,
}: VideoPlayerProps): React.JSX.Element {
  const [playbackUrl, setPlaybackUrl] = useState<string>("");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [watchedSeconds, setWatchedSeconds] = useState<number>(0);
  const [syncError, setSyncError] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const watchedPercent = useMemo(() => {
    if (totalSeconds <= 0) {
      return 0;
    }
    return Math.min((watchedSeconds / totalSeconds) * 100, 100);
  }, [totalSeconds, watchedSeconds]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadToken = async (): Promise<void> => {
      const response = await fetch(`/api/video/token?lessonId=${lessonId}`, {
        signal: abortController.signal,
      });
      if (!response.ok) {
        setSyncError("Could not load video token.");
        return;
      }
      const payload = (await response.json()) as { data?: { playbackUrl?: string } };
      if (!payload.data?.playbackUrl) {
        setSyncError("Playback URL missing.");
        return;
      }
      setSyncError("");
      setPlaybackUrl(payload.data.playbackUrl);
    };

    void loadToken();
    return () => abortController.abort();
  }, [lessonId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if ((event.ctrlKey || event.metaKey) && ["s", "u", "p"].includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      const nextPosition = Math.min(lastPosition + 30, totalSeconds);
      const nextWatched = Math.min(watchedSeconds + 30, totalSeconds);

      setLastPosition(nextPosition);
      setWatchedSeconds(nextWatched);
      const percent = totalSeconds > 0 ? (nextWatched / totalSeconds) * 100 : 0;
      setIsCompleted(percent >= 85);

      const saveProgress = async (): Promise<void> => {
        const response = await fetch(`/api/progress/${lessonId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            watchedSeconds: nextWatched,
            totalSeconds,
            lastPosition: nextPosition,
          }),
        });
        if (!response.ok) {
          setSyncError("Progress sync failed. Retrying on next interval.");
          return;
        }
        setSyncError("");
      };

      void saveProgress();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [isPlaying, lastPosition, lessonId, totalSeconds, watchedSeconds]);

  const togglePlay = (): void => {
    setIsPlaying((value) => !value);
  };

  const cycleSpeed = (): void => {
    const options = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = options.indexOf(playbackSpeed);
    const nextIndex = currentIndex >= options.length - 1 ? 0 : currentIndex + 1;
    setPlaybackSpeed(options[nextIndex]);
  };

  const openFullscreen = (): void => {
    if (!playerContainerRef.current) {
      return;
    }
    void playerContainerRef.current.requestFullscreen();
  };

  useEffect(() => {
    if (watchedPercent >= 85) {
      setIsCompleted(true);
    }
  }, [watchedPercent]);

  return (
    <section className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-4 md:p-5">
      <div
        ref={playerContainerRef}
        onContextMenu={(event) => event.preventDefault()}
        className="relative overflow-hidden rounded-2xl border border-[rgba(0,200,150,0.15)] bg-[var(--color-navy)]"
      >
        {playbackUrl ? (
          <iframe
            src={playbackUrl}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={lessonTitle}
          />
        ) : (
          <div className="grid aspect-video w-full place-items-center text-sm text-[var(--color-text-muted)]">
            Loading secure stream...
          </div>
        )}
        <VideoWatermark userEmail={userEmail} userPhone={userPhone} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="rounded-full bg-[var(--gradient-cta)] px-4 py-2 text-xs font-bold text-[var(--color-navy)]"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={cycleSpeed}
          className="rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-2 text-xs"
        >
          Speed: {playbackSpeed}x
        </button>
        <button
          type="button"
          onClick={openFullscreen}
          className="rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-2 text-xs"
        >
          Fullscreen
        </button>
      </div>

      <div className="mt-5">
        <h1 className="font-[var(--font-display)] text-2xl">{lessonTitle}</h1>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {moduleTitle} · Watched {Math.round(watchedPercent)}%
          {isCompleted ? " · Completed" : ""}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        {previousLessonHref ? (
          <Link
            href={previousLessonHref}
            className="rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-2 text-[var(--color-text-primary)]"
          >
            Previous
          </Link>
        ) : (
          <span />
        )}
        {nextLessonHref ? (
          <Link
            href={nextLessonHref}
            className="rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-2 text-[var(--color-text-primary)]"
          >
            Next
          </Link>
        ) : (
          <span />
        )}
      </div>

      {syncError ? <p className="mt-4 text-xs text-[var(--color-error)]">{syncError}</p> : null}
    </section>
  );
}
