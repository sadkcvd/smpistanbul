"use client";

import * as React from "react";

export type HeroVideoSources = {
  mp4: string;
  webm?: string;
};

/**
 * Progressive-enhancement video background. Mounts only on the client (after
 * hydration) so it never becomes the LCP candidate — the `poster` image is
 * what the browser paints first and remains the fallback if the source files
 * are missing or fail to load.
 */
export function HeroVideo({
  sources,
  poster,
  className = "absolute inset-0 h-full w-full object-cover",
}: {
  sources: HeroVideoSources;
  poster: string;
  className?: string;
}) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      className={className}
    >
      {sources.webm ? <source src={sources.webm} type="video/webm" /> : null}
      <source src={sources.mp4} type="video/mp4" />
    </video>
  );
}
