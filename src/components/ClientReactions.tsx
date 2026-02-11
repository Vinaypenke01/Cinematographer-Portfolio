import { motion } from "framer-motion";

const reactions = [
  { user: "@travel_vibes", avatar: "🌍", text: "🔥 insane visuals bro", time: "2h" },
  { user: "@brand.studio", avatar: "🎯", text: "next level drone shots 🚁", time: "5h" },
  { user: "@weddingdiaries", avatar: "💍", text: "made our wedding look like a MOVIE 🎬", time: "1d" },
  { user: "@filmmaker.pro", avatar: "🎥", text: "the color grading is absolutely insane", time: "2d" },
  { user: "@musiclabel_hq", avatar: "🎵", text: "best music video we've ever had, period.", time: "3d" },
  { user: "@startup.india", avatar: "🚀", text: "our brand film went viral thanks to SKB 🙌", time: "1w" },
];

const ClientReactions = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
          The Buzz
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground">Client Reactions</h2>
      </motion.div>

      <div className="max-w-xl mx-auto space-y-1">
        {reactions.map((reaction, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors duration-300 group"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
              {reaction.avatar}
            </div>

            {/* Comment */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-body text-sm font-semibold text-foreground">
                  {reaction.user}
                </span>
                <span className="font-body text-xs text-muted-foreground">{reaction.time}</span>
              </div>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                {reaction.text}
              </p>
            </div>

            {/* Like */}
            <span className="text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              ❤️
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ClientReactions;
