import { motion } from "framer-motion";
import { MapPin, Clock, Film } from "lucide-react";
import projectWedding from "@/assets/project-wedding.jpg";
import projectTravel from "@/assets/project-travel.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectMusic from "@/assets/project-music.jpg";

const projects = [
  {
    title: "Eternal Vows",
    thumb: projectWedding,
    duration: "4:32",
    location: "Udaipur, India",
    genre: "Wedding",
    year: "2025",
  },
  {
    title: "The Mountain Trail",
    thumb: projectTravel,
    duration: "6:15",
    location: "Ladakh, India",
    genre: "Travel",
    year: "2024",
  },
  {
    title: "NOIR Collection",
    thumb: projectBrand,
    duration: "2:48",
    location: "Mumbai, India",
    genre: "Brand Shoot",
    year: "2025",
  },
  {
    title: "Stage Ignite",
    thumb: projectMusic,
    duration: "3:55",
    location: "Delhi, India",
    genre: "Music Video",
    year: "2024",
  },
];

const SignatureProjects = () => {
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
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Poster card */}
            <div className="relative overflow-hidden rounded-xl aspect-[2/3]">
              <img
                src={project.thumb}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-body tracking-wider uppercase bg-primary text-primary-foreground">
                    {project.genre}
                  </span>
                  <span className="text-[10px] font-body text-muted-foreground">{project.year}</span>
                </div>
                <h3 className="font-display text-2xl text-foreground">{project.title}</h3>
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
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center glow-border">
                  <Film className="text-primary" size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SignatureProjects;
