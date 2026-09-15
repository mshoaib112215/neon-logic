import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import LazyVideo from "./LazyVideo";

const STORY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4";

export default function Section2() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const y = useTransform(smooth, [0, 1], [60, -120]);
  const opacity = useTransform(smooth, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${y}px) translateZ(15px)`;

  return (
    <section
      ref={ref}
      className="relative flex h-screen h-[100dvh!] items-center justify-center overflow-hidden"
      style={{ perspective: "400px" }}
    >
      <LazyVideo
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={STORY_VIDEO}
      />

      <div
        className="absolute left-0 right-0 top-0 z-10 h-[180px]"
        style={{ backgroundImage: "linear-gradient(to bottom, #010103, transparent)" }}
      />

      <motion.p
        style={{ opacity, transform, transformStyle: "preserve-3d" }}
        className="relative z-20 max-w-5xl select-none px-6 text-center font-sans text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:px-12 sm:text-[30px] md:text-[36px] lg:text-[42px]"
      >
        A neural-AI interface built on the architecture of the human nervous system. SynapseX
        translates synaptic activity into computational intelligence. Every signal becomes
        measurable, structured, and visible. It continuously reconstructs internal state as a
        dynamic neural map. Biological noise is filtered into actionable cognitive patterns.
      </motion.p>
    </section>
  );
}