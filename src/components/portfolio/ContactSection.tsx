import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { getProfile, type Profile } from "@/lib/portfolio-data";

export default function ContactSection() {
  const [profile, setProfile] = useState<Profile>(getProfile());
  useEffect(() => setProfile(getProfile()), []);

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-16 text-foreground"
        >
          <Mail className="inline mr-3 text-primary" size={36} />
          Contact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 space-y-6"
        >
          <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mail size={22} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-display">{profile.email}</div>
            </div>
          </a>

          <a href={`tel:${profile.phone}`} className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone size={22} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-display">{profile.phone}</div>
            </div>
          </a>

          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Linkedin size={22} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">LinkedIn</div>
              <div className="font-display">Priyanka P</div>
            </div>
          </a>

          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Github size={22} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">GitHub</div>
              <div className="font-display">copilot</div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
