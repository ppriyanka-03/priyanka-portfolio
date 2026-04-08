import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { getInternships, type Internship } from "@/lib/portfolio-data";

export default function InternshipsSection() {
  const [internships, setInternships] = useState<Internship[]>([]);
  useEffect(() => setInternships(getInternships()), []);

  if (internships.length === 0) return null;

  return (
    <section id="internships" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-16 text-foreground"
        >
          <Briefcase className="inline mr-3 text-primary" size={36} />
          Internships
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

          {internships.map((intern, i) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative flex mb-12 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-6 z-10 animate-pulse-glow" />

              <div className={`glass glow-card rounded-2xl p-6 ml-10 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
                  <Briefcase size={16} />
                  {intern.duration}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">{intern.role}</h3>
                <p className="text-accent text-sm mb-2">{intern.company}</p>
                <p className="text-muted-foreground text-sm">{intern.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
