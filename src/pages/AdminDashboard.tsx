import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminLoggedIn, adminLogout } from "@/lib/portfolio-data";
import {
  User, FolderOpen, Award, Briefcase, Cpu, Mail, FileText, LogOut, Menu, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileEditor from "@/components/admin/ProfileEditor";
import ProjectsManager from "@/components/admin/ProjectsManager";
import CertificatesManager from "@/components/admin/CertificatesManager";
import InternshipsManager from "@/components/admin/InternshipsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ContactEditor from "@/components/admin/ContactEditor";
import ResumeUploader from "@/components/admin/ResumeUploader";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "internships", label: "Internship", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "resume", label: "Resume", icon: FileText },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate("/admin");
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin");
  };

  const renderContent = () => {
    switch (active) {
      case "profile": return <ProfileEditor />;
      case "projects": return <ProjectsManager />;
      case "certificates": return <CertificatesManager />;
      case "internships": return <InternshipsManager />;
      case "skills": return <SkillsManager />;
      case "contact": return <ContactEditor />;
      case "resume": return <ResumeUploader />;
      default: return <ProfileEditor />;
    }
  };

  return (
    <div className="animated-bg min-h-screen flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 glass rounded-lg p-2 text-foreground"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== "undefined") && (
          <aside
            className={`fixed md:sticky top-0 left-0 h-screen w-60 glass-strong z-40 flex flex-col transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-display font-bold text-primary">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Portfolio Manager</p>
            </div>

            <nav className="flex-1 py-4 space-y-1 px-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActive(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-all ${
                    active === tab.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
              <a href="/" target="_blank" className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                View Portfolio
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 md:ml-0 overflow-y-auto min-h-screen">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}
