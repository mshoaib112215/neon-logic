import { motion } from "framer-motion";
import LazyVideo from "./LazyVideo";

const METRICS_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4";

const METRICS = [
  { value: "2.4ms", label: "Synaptic Latency" },
  { value: "99.7%", label: "Signal Accuracy" },
  { value: "140B", label: "Neural Parameters" },
];

export default function Section3() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <LazyVideo
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={METRICS_VIDEO}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 text-center text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]"
        >
          Performance Metrics
        </motion.p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-[clamp(48px,10vw,96px)] font-light leading-none tracking-[-0.04em] text-white">
                {metric.value}
              </span>
              <span className="mt-4 text-[13px] tracking-wide text-white/40 sm:text-[15px]">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}