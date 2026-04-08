import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import { getCertificates, type Certificate } from "@/lib/portfolio-data";

export default function CertificatesSection() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);
  useEffect(() => setCerts(getCertificates()), []);

  if (certs.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-16 text-foreground"
        >
          <Award className="inline mr-3 text-primary" size={36} />
          Certificates
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass glow-card rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelected(cert)}
            >
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-accent/10 flex items-center justify-center">
                  <Award size={48} className="text-accent/40" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-foreground">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h3 className="text-xl font-display font-semibold text-foreground">{selected.title}</h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <X size={24} />
                </button>
              </div>
              {selected.image && (
                <img src={selected.image} alt={selected.title} className="w-full max-h-[60vh] object-contain bg-background/50" />
              )}
              <div className="p-4">
                <p className="text-muted-foreground">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
