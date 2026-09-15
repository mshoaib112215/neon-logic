import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
}

export default function LazyVideo({ src, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50% 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      className={className}
      src={shouldLoad ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}