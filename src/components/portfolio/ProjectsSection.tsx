import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { getProjects, type Project } from "@/lib/portfolio-data";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => setProjects(getProjects()), []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-16 text-foreground"
        >
          <Code2 className="inline mr-3 text-primary" size={36} />
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass glow-card rounded-2xl overflow-hidden group"
            >
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
                  <Code2 size={48} className="text-primary/40" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
