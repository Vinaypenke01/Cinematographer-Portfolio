import { motion } from "framer-motion";
import { Camera, Plane, Film, Sparkles } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Cinematography",
    desc: "Cinematic storytelling with premium camera work, color grading, and visual narratives.",
    emoji: "🎥",
  },
  {
    icon: Plane,
    title: "Drone Shoots",
    desc: "Breathtaking aerial perspectives with licensed drone operations and cinematic flight paths.",
    emoji: "🚁",
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "Professional post-production with seamless transitions, sound design, and color science.",
    emoji: "🎬",
  },
  {
    icon: Sparkles,
    title: "Creative Direction",
    desc: "End-to-end creative vision from concept to final delivery for brands and creators.",
    emoji: "📸",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
          What I Offer
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground">Services</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card glass-card-hover rounded-2xl p-8 group cursor-pointer transition-all duration-500"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {service.emoji} {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
