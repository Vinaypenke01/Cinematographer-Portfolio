import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const roles = ["Editor", "Drone Pilot", "Cinematographer", "Creator"];

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-30px]"
        style={{ x: bgX, y: bgY }}
      >
        <img
          src={heroBg}
          alt="Cinematic background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 cinematic-overlay" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="font-body text-sm md:text-base tracking-[0.4em] uppercase text-primary mb-6">
            Visual Storyteller
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="glitch-text font-display text-7xl md:text-[10rem] lg:text-[12rem] leading-none glow-text text-foreground"
          data-text="SKB"
        >
          SKB
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-8"
        >
          {roles.map((role, i) => (
            <span key={role} className="flex items-center gap-3 md:gap-4">
              <span className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-muted-foreground">
                {role}
              </span>
              {i < roles.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-primary" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 scroll-indicator"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Scroll
            </span>
            <ChevronDown size={20} className="text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
