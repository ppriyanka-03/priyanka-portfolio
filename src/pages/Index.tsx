import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificatesSection from "@/components/portfolio/CertificatesSection";
import InternshipsSection from "@/components/portfolio/InternshipsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Spotlight cursor effect
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.setProperty("--mouse-x", `${e.clientX}px`);
      el.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div ref={containerRef} className="animated-bg min-h-screen relative overflow-x-hidden scroll-smooth">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed w-[300px] h-[300px] rounded-full opacity-20 blur-3xl z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          left: "var(--mouse-x, -300px)",
          top: "var(--mouse-y, -300px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <CertificatesSection />
      <InternshipsSection />
      <SkillsSection />
      <ContactSection />

      <footer className="text-center py-8 text-muted-foreground text-sm border-t border-border space-y-2">
        <p>© {new Date().getFullYear()} Priyanka P. All rights reserved.</p>
        <Link to="/admin" className="text-primary/50 hover:text-primary text-xs transition-colors">
          Admin
        </Link>
      </footer>
    </div>
  );
}
