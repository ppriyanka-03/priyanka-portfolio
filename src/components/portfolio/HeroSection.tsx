import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, ChevronDown } from "lucide-react";
import { getProfile, type Profile } from "@/lib/portfolio-data";

const roles = ["Web Developer", "BCA Student", "Tech Enthusiast", "Problem Solver"];

export default function HeroSection() {
  const [profile, setProfile] = useState<Profile>(getProfile());
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayed === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? currentRole.slice(0, displayed.length - 1)
          : currentRole.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-36 h-36 rounded-full mx-auto border-2 border-primary/50 shadow-lg shadow-primary/20 object-cover"
            />
          ) : (
            <div className="w-36 h-36 rounded-full mx-auto glass flex items-center justify-center text-5xl font-display text-primary animate-pulse-glow">
              {profile.name.charAt(0)}
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl font-display font-bold mb-4 text-foreground"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-2 font-body"
        >
          {profile.course} • {profile.college}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl md:text-3xl font-display text-primary mb-8 h-10"
        >
          {displayed}
          <span className="inline-block w-0.5 h-7 bg-accent ml-1 animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
        >
          {profile.about}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glow-card px-6 py-3 rounded-lg flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glow-card px-6 py-3 rounded-lg flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Github size={20} /> GitHub
          </a>
          {profile.resume && (
            <a
              href={profile.resume}
              download
              className="bg-primary/20 border border-primary/30 glow-card px-6 py-3 rounded-lg flex items-center gap-2 text-primary hover:bg-primary/30 transition-colors"
            >
              <Download size={20} /> Resume
            </a>
          )}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
