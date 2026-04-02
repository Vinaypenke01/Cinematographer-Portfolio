import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import client from "../../tina/__generated__/client";

const droneShotFallback = "/media/drone-shot.jpg";

const BehindCamera = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.queries.homepage({ relativePath: "index.md" });
        setData(response.data.homepage.about);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, []);

  const statsList = data?.stats || [
    { label: "Years Experience", value: "5+" },
    { label: "Happy Clients", value: "200+" },
    { label: "Awards Won", value: "12" },
    { label: "Cities Covered", value: "30+" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={data?.profileImage || droneShotFallback}
              alt="Drone in flight"
              className="w-full object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          {/* Floating stat */}
          <div className="absolute -bottom-6 -right-4 glass-card glow-border rounded-xl p-5">
            <p className="font-display text-4xl gradient-text">{statsList[1]?.value || "150+"}</p>
            <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
              {statsList[1]?.label || "Projects Delivered"}
            </p>
          </div>
        </motion.div>

        {/* Right: Story */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary">
            {data?.title || "Behind The Camera"}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            {data?.subtitle || "Who is SKB?"}
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            {data?.bioParagraph1 || "A visual storyteller who sees the world through a cinematic lens. Every frame is crafted to evoke emotion, every shot designed to tell a story that words alone cannot capture."}
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            {data?.bioParagraph2 || "From aerial drone perspectives soaring over untouched landscapes to intimate wedding moments frozen in time — the goal is always the same: create something unforgettable."}
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            {statsList.map((stat: any, index: number) => (
              <div key={index}>
                <p className="font-display text-3xl gradient-text">{stat.value}</p>
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BehindCamera;
