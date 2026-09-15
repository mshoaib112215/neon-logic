import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SynapseXLogo from "./SynapseXLogo";
import SquashHamburger from "./SquashHamburger";
import ScrambleText from "./ScrambleText";

interface NavProps {
  entranceComplete: boolean;
}

const MENU_SPRING = { type: "spring" as const, stiffness: 350, damping: 28 };

function scrollToPosition(position: number) {
  window.scrollTo({ top: position, behavior: "smooth" });
}

interface NavLinkProps {
  text: string;
  onClick: () => void;
  mobile?: boolean;
}

function NavLink({ text, onClick, mobile }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`font-normal text-white/85 hover:text-white transition-colors ${
        mobile ? "text-[13px]" : "text-[16px]"
      }`}
    >
      <ScrambleText text={text} isHovered={hovered} />
    </button>
  );
}

interface DownloadButtonProps {
  mobile?: boolean;
}

function DownloadButton({ mobile }: DownloadButtonProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 rounded-full bg-white text-black font-medium ${
        mobile ? "h-9 px-3.5 text-[13px]" : "h-12 px-6 text-[16px]"
      }`}
    >
      <i className="bi bi-apple" />
      <ScrambleText text="Download" isHovered={hovered} />
    </motion.button>
  );
}

export default function Nav({ entranceComplete }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-0 z-50 h-20 px-4 sm:px-6 md:px-8"
    >
      {/* Desktop */}
      <div className="hidden h-full items-center justify-between sm:flex">
        <div className="flex items-center gap-2">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToPosition(0);
            }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.22)" }}
            whileTap={{ scale: 0.98 }}
            className={`${
              menuOpen ? "hidden md:flex" : "flex"
            } h-12 items-center gap-2.5 rounded-[14px] bg-white/15 px-5 backdrop-blur-md`}
          >
            <SynapseXLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">SynapseX</span>
          </motion.a>

          <motion.div
            initial={false}
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={MENU_SPRING}
            className="flex h-12 items-center rounded-[14px] bg-white/15 backdrop-blur-md"
          >
            <motion.button
              onClick={toggleMenu}
              animate={{
                width: menuOpen ? 36 : 48,
                height: menuOpen ? 36 : 48,
                borderRadius: menuOpen ? 11 : 14,
              }}
              transition={MENU_SPRING}
              className={`flex items-center justify-center transition-colors duration-300 ${
                menuOpen ? "ml-1.5 bg-white/10 hover:bg-white/20" : "bg-transparent"
              }`}
            >
              <SquashHamburger open={menuOpen} />
            </motion.button>

            <AnimatePresence initial={false}>
              {menuOpen && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="ml-5 flex items-center gap-7"
                >
                  <NavLink text="About" onClick={() => scrollToPosition(window.innerHeight)} />
                  <NavLink
                    text="Metrics"
                    onClick={() => scrollToPosition(window.innerHeight * 2)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </div>

      {/* Mobile */}
      <div className="flex h-full items-center justify-between gap-2 sm:hidden">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <motion.div
            animate={{
              width: menuOpen ? 0 : "auto",
              paddingLeft: menuOpen ? 0 : 12,
              paddingRight: menuOpen ? 0 : 12,
            }}
            transition={MENU_SPRING}
            className="flex h-9 min-w-0 flex-shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-[10px] bg-white/15 backdrop-blur-md"
          >
            <SynapseXLogo size={14} className="text-white" />
            <span className="text-[13px] font-medium tracking-tight text-white">SynapseX</span>
          </motion.div>

          <motion.div
            animate={{ width: menuOpen ? "100%" : 44 }}
            transition={MENU_SPRING}
            className="flex h-9 items-center rounded-[10px] bg-white/15 backdrop-blur-md"
          >
            <button
              onClick={toggleMenu}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center"
            >
              <SquashHamburger mobile open={menuOpen} />
            </button>

            <AnimatePresence initial={false}>
              {menuOpen && (
                <motion.div
                  key="mobile-links"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="ml-4 flex items-center gap-5"
                >
                  <NavLink
                    mobile
                    text="About"
                    onClick={() => scrollToPosition(window.innerHeight)}
                  />
                  <NavLink
                    mobile
                    text="Metrics"
                    onClick={() => scrollToPosition(window.innerHeight * 2)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton mobile />
      </div>
    </motion.header>
  );
}