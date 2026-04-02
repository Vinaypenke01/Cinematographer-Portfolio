import { useEffect, useState, useRef, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import LazyVideo from "@/components/ui/LazyVideo";
import client from "../../tina/__generated__/client";

const categories = ["All", "Cinematic", "Drone Shots", "Events", "Reels"];

interface Reel {
  id: string | number;
  thumb?: string;
  category: string;
  title: string;
  views: string;
  videoUrl: string;
}

const ReelCard = forwardRef<HTMLDivElement, {
  reel: Reel;
  index: number;
  onSelect: (reel: Reel) => void;
}>(({
  reel,
  index,
  onSelect,
}, ref) => {
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
      ref={ref}
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
      onClick={() => onSelect(reel)}
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
});

ReelCard.displayName = "ReelCard";

const ReelShowcase = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await client.queries.reelConnection();
        const edges = response.data.reelConnection.edges || [];
        setReels(edges.map((edge: any) => ({
          id: edge.node.id,
          ...edge.node
        })));
      } catch (error) {
        console.error("Error fetching reels:", error);
      }
    };
    fetchReels();
  }, []);

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
              key={reel.id || i}
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
        {selectedReel && (
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
              {selectedReel.videoUrl ? (
                <div className="relative rounded-xl overflow-hidden shadow-2xl h-[80vh] w-auto aspect-[9/16]">
                  <video
                    ref={modalVideoRef}
                    src={selectedReel.videoUrl}
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
                    src={selectedReel.thumb}
                    alt={selectedReel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="text-center mt-6">
                <h3 className="font-display text-3xl text-foreground">
                  {selectedReel.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-1">
                  {selectedReel.views} views • {selectedReel.category}
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
