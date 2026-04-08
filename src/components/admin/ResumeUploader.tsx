import { useState, useEffect } from "react";
import { getProfile, saveProfile, fileToBase64, type Profile } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { Upload, FileText } from "lucide-react";

export default function ResumeUploader() {
  const [profile, setProfile] = useState<Profile>(getProfile());
  useEffect(() => setProfile(getProfile()), []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      const updated = { ...profile, resume: base64 };
      setProfile(updated);
      saveProfile(updated);
      toast.success("Resume uploaded!");
    }
  };

  const handleRemove = () => {
    const updated = { ...profile, resume: "" };
    setProfile(updated);
    saveProfile(updated);
    toast.success("Resume removed!");
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Resume Upload</h1>
      <div className="glass-strong rounded-2xl p-6 md:p-8 max-w-2xl">
        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
          <Upload size={48} className="mx-auto text-primary/50 mb-4" />
          <p className="text-muted-foreground mb-4">Upload your resume (PDF)</p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary file:cursor-pointer"
          />
        </div>

        {profile.resume && (
          <div className="mt-6 glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-primary" />
              <span className="text-foreground font-display">Resume uploaded</span>
            </div>
            <div className="flex gap-2">
              <a href={profile.resume} download="resume.pdf" className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors">
                Download
              </a>
              <button onClick={handleRemove} className="px-4 py-2 rounded-lg bg-destructive/20 text-destructive text-sm hover:bg-destructive/30 transition-colors">
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
