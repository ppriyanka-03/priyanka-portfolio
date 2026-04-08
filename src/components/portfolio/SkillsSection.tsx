import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { getSkills, type Skill } from "@/lib/portfolio-data";

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => setSkills(getSkills()), []);

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-16 text-foreground"
        >
          <Cpu className="inline mr-3 text-primary" size={36} />
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-display font-semibold text-foreground">{skill.name}</span>
                <span className="text-primary text-sm">{skill.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
