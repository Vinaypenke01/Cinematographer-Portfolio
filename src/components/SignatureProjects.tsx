import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Film, Play, X, Volume2, VolumeX } from "lucide-react";

// Import videos
import weddingVideo from "@/assets/Videos/Events/Event1.mp4";
import travelVideo from "@/assets/Videos/Drone Shots/Drone1.mp4";
import brandVideo from "@/assets/Videos/Cinematic/Cinematic2.mp4";
import musicVideo from "@/assets/Videos/Reels/Reel1.mp4";

const projects = [
  {
    id: 1,
    title: "Eternal Vows",
    videoUrl: weddingVideo,
    duration: "4:32",
    location: "Udaipur, India",
    genre: "Wedding",
    year: "2025",
  },
  {
    id: 2,
    title: "The Mountain Trail",
    videoUrl: travelVideo,
    duration: "6:15",
    location: "Ladakh, India",
    genre: "Travel",
    year: "2024",
  },
  {
    id: 3,
    title: "NOIR Collection",
    videoUrl: brandVideo,
    duration: "2:48",
    location: "Mumbai, India",
    genre: "Brand Shoot",
    year: "2025",
  },
  {
    id: 4,
    title: "Stage Ignite",
    videoUrl: musicVideo,
    duration: "3:55",
    location: "Delhi, India",
    genre: "Music Video",
    year: "2024",
  },
];

const ProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: (typeof projects)[0];
  index: number;
  onSelect: (project: (typeof projects)[0]) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Poster card */}
      <div className="relative overflow-hidden rounded-xl aspect-[2/3]">
        {/* Video Preview */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-sm text-[10px] font-body tracking-wider uppercase bg-primary text-primary-foreground">
              {project.genre}
            </span>
            <span className="text-[10px] font-body text-muted-foreground">
              {project.year}
            </span>
          </div>
          <h3 className="font-display text-2xl text-foreground">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
              <Clock size={12} /> {project.duration}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
              <MapPin size={12} /> {project.location}
            </span>
          </div>
        </div>

        {/* Hover play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center glow-border">
            <Play className="text-primary ml-1" size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SignatureProjects = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (modalVideoRef.current) {
        modalVideoRef.current.muted = prev;
      }
      return !prev;
    });
  }, []);

  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
          Featured Collection
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground">
          Signature Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Fullscreen modal with video player */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <button
              onClick={() => setSelectedProject(null)}
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
              <div className="relative rounded-xl overflow-hidden shadow-2xl h-[80vh] w-auto aspect-[9/16]">
                <video
                  ref={modalVideoRef}
                  src={selectedProject.videoUrl}
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

              <div className="text-center mt-6">
                <h3 className="font-display text-3xl text-foreground">
                  {selectedProject.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-1">
                  {selectedProject.genre} • {selectedProject.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SignatureProjects;
