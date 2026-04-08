import { useState, useEffect } from "react";
import { getProfile, saveProfile, fileToBase64, type Profile } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile>(getProfile());

  useEffect(() => setProfile(getProfile()), []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setProfile({ ...profile, photo: base64 });
    }
  };

  const handleSave = () => {
    saveProfile(profile);
    toast.success("Profile saved!");
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Edit Profile</h1>
      <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Profile Photo</label>
          <div className="flex items-center gap-4">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border border-border" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-display">
                {profile.name.charAt(0)}
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary file:cursor-pointer" />
          </div>
        </div>

        {[
          { key: "name", label: "Full Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "course", label: "Course" },
          { key: "college", label: "College" },
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

        <div>
          <label className="text-sm text-muted-foreground block mb-1">About Me</label>
          <textarea
            value={profile.about}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Save size={18} /> Save Profile
        </button>
      </div>
    </div>
  );
}
