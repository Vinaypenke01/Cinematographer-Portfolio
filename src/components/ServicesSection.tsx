import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Plane, Film, Sparkles, HelpCircle } from "lucide-react";
import client from "../../tina/__generated__/client";

const iconMap: Record<string, any> = {
  Camera,
  Plane,
  Film,
  Sparkles,
};

const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await client.queries.homepage({ relativePath: "index.md" });
        setServices(response.data.homepage.services || []);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };
    fetchServices();
  }, []);

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
        {services.map((service, i) => {
          const Icon = iconMap[service.iconName] || HelpCircle;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-8 group cursor-pointer transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon className="text-primary" size={24} />
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
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
