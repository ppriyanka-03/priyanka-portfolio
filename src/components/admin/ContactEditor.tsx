import { useState, useEffect } from "react";
import { getProfile, saveProfile, type Profile } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ContactEditor() {
  const [profile, setProfile] = useState<Profile>(getProfile());
  useEffect(() => setProfile(getProfile()), []);

  const handleSave = () => {
    saveProfile(profile);
    toast.success("Contact info saved!");
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Contact Info</h1>
      <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl">
        {[
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "linkedin", label: "LinkedIn URL" },
          { key: "github", label: "GitHub URL" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm text-muted-foreground block mb-1">{field.label}</label>
            <input
              type="text"
              value={(profile as any)[field.key]}
              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Save size={18} /> Save Contact
        </button>
      </div>
    </div>
  );
}
