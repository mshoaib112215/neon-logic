import { motion } from "framer-motion";

interface SquashHamburgerProps {
  open: boolean;
  mobile?: boolean;
  className?: string;
}

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function SquashHamburger({ open, mobile = false, className }: SquashHamburgerProps) {
  const width = mobile ? 15 : 18;
  const height = mobile ? 10 : 12;
  const barHeight = mobile ? 1.2 : 1.5;
  const mid = (height - barHeight) / 2;

  return (
    <div className={className} style={{ position: "relative", width, height }}>
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ top: 0, height: barHeight }}
        animate={open ? { rotate: 45, y: mid } : { rotate: 0, y: 0 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ top: mid, height: barHeight }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ bottom: 0, height: barHeight }}
        animate={open ? { rotate: -45, y: -mid } : { rotate: 0, y: 0 }}
        transition={SPRING}
      />
    </div>
  );
}