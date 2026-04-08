import { useState, useEffect } from "react";
import { getSkills, saveSkills, generateId, type Skill } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);

  useEffect(() => setSkills(getSkills()), []);

  const handleSave = (skill: Skill) => {
    let updated: Skill[];
    if (skills.find((s) => s.id === skill.id)) {
      updated = skills.map((s) => (s.id === skill.id ? skill : s));
    } else {
      updated = [...skills, skill];
    }
    setSkills(updated);
    saveSkills(updated);
    setEditing(null);
    toast.success("Skill saved!");
  };

  const handleDelete = (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    saveSkills(updated);
    toast.success("Skill deleted!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Skills</h1>
        <button onClick={() => setEditing({ id: generateId(), name: "", level: 50 })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-all">
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {editing && (
        <div className="glass-strong rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-semibold text-foreground">{editing.name ? "Edit" : "New"} Skill</h3>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>
          <input type="text" placeholder="Skill Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Proficiency: {editing.level}%</label>
            <input type="range" min={0} max={100} value={editing.level} onChange={(e) => setEditing({ ...editing, level: Number(e.target.value) })}
              className="w-full accent-primary" />
          </div>
          <button onClick={() => handleSave(editing)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-all">
            <Save size={16} /> Save
          </button>
        </div>
      )}

      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.id} className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-display font-semibold text-foreground">{s.name}</span>
                <span className="text-primary text-sm">{s.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${s.level}%` }} />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(s)} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
