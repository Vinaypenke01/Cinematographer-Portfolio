import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import LazyVideo from "@/components/ui/LazyVideo";

// Cinematic Videos
import cinematic1 from "@/assets/Videos/Cinematic/Cinematic1.mp4";
import cinematic2 from "@/assets/Videos/Cinematic/Cinematic2.mp4";
import cinematic3 from "@/assets/Videos/Cinematic/Cinematic3.mp4";
import cinematic4 from "@/assets/Videos/Cinematic/Cinematic4.mp4";
import cinematicMain from "@/assets/Videos/Cinematic/cinematic.mp4";

// Drone Videos
import droneEvent from "@/assets/Videos/Drone Shots/Drone-Event.mp4";
import drone1 from "@/assets/Videos/Drone Shots/Drone1.mp4";
import drone2 from "@/assets/Videos/Drone Shots/Drone2.mp4";
import drone3 from "@/assets/Videos/Drone Shots/Drone3.mp4";

// Event Videos
import event1 from "@/assets/Videos/Events/Event1.mp4";
import event2 from "@/assets/Videos/Events/Event2.mp4";
import event3 from "@/assets/Videos/Events/Event3.mp4";

// Reels Videos
import reel1 from "@/assets/Videos/Reels/Reel1.mp4";
import reel2 from "@/assets/Videos/Reels/Reel2.mp4";
import reel3 from "@/assets/Videos/Reels/Reel3.mp4";
import reel4 from "@/assets/Videos/Reels/Reel4.mp4";
import reel5 from "@/assets/Videos/Reels/Reel5.mp4";
import reel6 from "@/assets/Videos/Reels/Reel6.mp4";
import reel7 from "@/assets/Videos/Reels/Reel7.mp4";

const categories = ["All", "Cinematic", "Drone Shots", "Events", "Reels"];

interface Reel {
  id: number;
  thumb?: string;
  category: string;
  title: string;
  views: string;
  videoUrl: string;
  youtubeId?: string;
}

const reels: Reel[] = [
  // Cinematic
  { id: 1, category: "Cinematic", title: "Cinematic Vision I", views: "1.2M", videoUrl: cinematic1 },
  { id: 2, category: "Cinematic", title: "Cinematic Vision II", views: "980K", videoUrl: cinematic2 },
  { id: 3, category: "Cinematic", title: "Cinematic Vision III", views: "1.5M", videoUrl: cinematic3 },
  { id: 4, category: "Cinematic", title: "Cinematic Vision IV", views: "2.1M", videoUrl: cinematic4 },
  { id: 5, category: "Cinematic", title: "Cinematic Masterpiece", views: "3.4M", videoUrl: cinematicMain },

  // Drone Shots
  { id: 6, category: "Drone Shots", title: "Drone Event Coverage", views: "890K", videoUrl: droneEvent },
  { id: 7, category: "Drone Shots", title: "Aerial Perspective I", views: "750K", videoUrl: drone1 },
  { id: 8, category: "Drone Shots", title: "Aerial Perspective II", views: "620K", videoUrl: drone2 },
  { id: 9, category: "Drone Shots", title: "Aerial Perspective III", views: "1.1M", videoUrl: drone3 },

  // Events
  { id: 10, category: "Events", title: "Event Highlights I", views: "2.8M", videoUrl: event1 },
  { id: 11, category: "Events", title: "Event Highlights II", views: "1.9M", videoUrl: event2 },
  { id: 12, category: "Events", title: "Event Highlights III", views: "2.3M", videoUrl: event3 },

  // Reels
  { id: 13, category: "Reels", title: "Creative Reel I", views: "4.5M", videoUrl: reel1 },
  { id: 14, category: "Reels", title: "Creative Reel II", views: "3.2M", videoUrl: reel2 },
  { id: 15, category: "Reels", title: "Creative Reel III", views: "2.7M", videoUrl: reel3 },
  { id: 16, category: "Reels", title: "Creative Reel IV", views: "5.1M", videoUrl: reel4 },
  { id: 17, category: "Reels", title: "Creative Reel V", views: "3.8M", videoUrl: reel5 },
  { id: 18, category: "Reels", title: "Creative Reel VI", views: "4.2M", videoUrl: reel6 },
  { id: 19, category: "Reels", title: "Creative Reel VII", views: "3.5M", videoUrl: reel7 },
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
      videoRef.current.play().catch(() => { });
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
      style={{
        aspectRatio:
          index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/5" : "1/1",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(reel.id)}
    >
      {/* Video preview - displayed directly */}
      {reel.videoUrl ? (
        <LazyVideo
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          className="transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <img
          src={reel.thumb}
          alt={reel.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"
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
  const [currentPage, setCurrentPage] = useState(1);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const ITEMS_PER_PAGE = 12;

  const filtered =
    activeCategory === "All"
      ? reels
      : reels.filter((r) => r.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentReels = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("reels")?.scrollIntoView({ behavior: "smooth" });
  };

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
            onClick={() => handleCategoryChange(cat)}
            className={`font-body text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto mb-12">
        <AnimatePresence mode="popLayout">
          {currentReels.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={i}
              onSelect={setSelectedReel}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="flex items-center text-sm font-body text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}

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
              className="max-w-3xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedReelData.videoUrl ? (
                <div className="relative rounded-xl overflow-hidden shadow-2xl h-[80vh] w-auto aspect-[9/16]">
                  <video
                    ref={modalVideoRef}
                    src={selectedReelData.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
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
                <div className="relative rounded-xl overflow-hidden shadow-2xl h-[80vh] w-auto aspect-[9/16]">
                  <img
                    src={selectedReelData.thumb}
                    alt={selectedReelData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
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
