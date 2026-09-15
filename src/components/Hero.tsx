import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrambleIn from "./ScrambleIn";

interface HeroProps {
  entranceComplete: boolean;
}

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4";

const EASE_OUT_EXPO = [0.215, 0.61, 0.355, 1] as const;

const FRAME_STEP = 1 / 30;
const SEEK_EPSILON = FRAME_STEP * 0.5;

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingTarget = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const scheduleSeek = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const target = pendingTarget.current;
        if (target === null || video.seeking) return;
        if (Math.abs(target - video.currentTime) < SEEK_EPSILON) {
          pendingTarget.current = null;
          return;
        }
        video.currentTime = target;
      });
    };

    const handleSeeked = () => {
      scheduleSeek();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (video.readyState < 1 || !Number.isFinite(video.duration) || video.duration === 0) return;
      const width = window.innerWidth || 1;
      const progress = Math.min(Math.max(e.clientX / width, 0), 1);
      const raw = progress * video.duration;
      const frameAligned = Math.round(raw / FRAME_STEP) * FRAME_STEP;
      pendingTarget.current = Math.min(frameAligned, video.duration);
      scheduleSeek();
    };

    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      video.removeEventListener("seeked", handleSeeked);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  return (
    <section className="relative flex h-screen h-[100dvh!] flex-col overflow-hidden px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8">
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.05,
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-[calc(50%+50px)] z-[1] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap uppercase leading-none"
        style={{
          fontFamily: '"Anton SC", sans-serif',
          fontSize: "clamp(120px, 30vw, 521px)",
          letterSpacing: "-4px",
          opacity: 0.1,
          backgroundImage: "radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        TRANSCENDENCE
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: entranceComplete ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]"
            >
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX
              continuously maps neural pathways, cognitive load, and physiological states into a
              single adaptive intelligence layer.
            </motion.p>
          </div>

          <div className="flex justify-end">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: entranceComplete ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="text-left text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] md:text-right"
            >
              <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
}