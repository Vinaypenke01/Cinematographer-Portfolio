import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import projectWedding from "@/assets/project-wedding.jpg";
import projectTravel from "@/assets/project-travel.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectMusic from "@/assets/project-music.jpg";

const categories = ["All", "Cinematic", "Drone Shots", "Events", "Reels"];

interface Reel {
  id: number;
  thumb: string;
  category: string;
  title: string;
  views: string;
  videoUrl?: string;
  youtubeId?: string;
}

const reels: Reel[] = [
  {
    id: 1,
    thumb: projectWedding,
    category: "Events",
    title: "Royal Wedding",
    views: "2.4M",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    thumb: projectTravel,
    category: "Drone Shots",
    title: "Mountain Chase",
    views: "1.8M",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    thumb: projectBrand,
    category: "Cinematic",
    title: "Brand Story",
    views: "956K",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 4,
    thumb: projectMusic,
    category: "Reels",
    title: "Stage Heat",
    views: "3.1M",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 5,
    thumb: projectTravel,
    category: "Drone Shots",
    title: "Coastal Flyover",
    views: "1.2M",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: 6,
    thumb: projectWedding,
    category: "Cinematic",
    title: "Eternal Vows",
    views: "780K",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
];

const ReelCard = ({
  reel,
  index,
  onSelect,
}: {
  reel: Reel;
  index: number;
  onSelect: (id: number) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (videoRef.current && reel.videoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [reel.videoUrl]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-4 break-inside-avoid group cursor-pointer relative overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(reel.id)}
    >
      {/* Thumbnail */}
      <img
        src={reel.thumb}
        alt={reel.title}
        className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
          isHovering && reel.videoUrl ? "opacity-0" : "opacity-100"
        }`}
        style={{
          aspectRatio:
            index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/5" : "1/1",
        }}
        loading="lazy"
      />

      {/* Video preview on hover */}
      {reel.videoUrl && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        } flex flex-col justify-end p-4`}
      >
        <p className="font-display text-2xl text-foreground">{reel.title}</p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          {reel.views} views
        </p>
      </div>

      {/* Play icon when not hovering */}
      {!isHovering && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center">
            <Play className="text-primary ml-1" size={24} />
          </div>
        </div>
      )}

      {/* Category badge */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-card">
        <span className="font-body text-[10px] tracking-wider uppercase text-primary">
          {reel.category}
        </span>
      </div>
    </motion.div>
  );
};

const ReelShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedReel, setSelectedReel] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const filtered =
    activeCategory === "All"
      ? reels
      : reels.filter((r) => r.category === activeCategory);

  const selectedReelData = reels.find((r) => r.id === selectedReel);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (modalVideoRef.current) {
        modalVideoRef.current.muted = prev;
      }
      return !prev;
    });
  }, []);

  return (
    <section id="reels" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-5xl md:text-7xl gradient-text">
          The Reel Feed
        </h2>
        <p className="font-body text-muted-foreground mt-4 tracking-wide">
          Curated visual stories — hover to preview
        </p>
      </motion.div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-body text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
              activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={i}
              onSelect={setSelectedReel}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Fullscreen modal with video player */}
      <AnimatePresence>
        {selectedReel && selectedReelData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6"
            onClick={() => setSelectedReel(null)}
          >
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedReelData.videoUrl ? (
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    ref={modalVideoRef}
                    src={selectedReelData.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full rounded-xl"
                  />
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="text-foreground" size={18} />
                    ) : (
                      <Volume2 className="text-primary" size={18} />
                    )}
                  </button>
                </div>
              ) : (
                <img
                  src={selectedReelData.thumb}
                  alt={selectedReelData.title}
                  className="w-full rounded-xl"
                />
              )}
              <div className="text-center mt-6">
                <h3 className="font-display text-3xl text-foreground">
                  {selectedReelData.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-1">
                  {selectedReelData.views} views • {selectedReelData.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReelShowcase;
