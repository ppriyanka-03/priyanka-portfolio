import { useState, useEffect } from "react";
import { getInternships, saveInternships, generateId, fileToBase64, type Internship } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

export default function InternshipsManager() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [editing, setEditing] = useState<Internship | null>(null);

  useEffect(() => setInternships(getInternships()), []);

  const handleSave = (item: Internship) => {
    let updated: Internship[];
    if (internships.find((i) => i.id === item.id)) {
      updated = internships.map((i) => (i.id === item.id ? item : i));
    } else {
      updated = [...internships, item];
    }
    setInternships(updated);
    saveInternships(updated);
    setEditing(null);
    toast.success("Internship saved!");
  };

  const handleDelete = (id: string) => {
    const updated = internships.filter((i) => i.id !== id);
    setInternships(updated);
    saveInternships(updated);
    toast.success("Internship deleted!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Internships</h1>
        <button onClick={() => setEditing({ id: generateId(), company: "", role: "", duration: "", description: "", image: "" })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-all">
          <Plus size={18} /> Add Internship
        </button>
      </div>

      {editing && <InternForm item={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}

      <div className="space-y-4">
        {internships.map((item) => (
          <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-foreground truncate">{item.role}</h3>
              <p className="text-primary text-sm">{item.company} • {item.duration}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(item)} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InternForm({ item, onSave, onCancel }: { item: Internship; onSave: (i: Internship) => void; onCancel: () => void }) {
  const [data, setData] = useState(item);
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setData({ ...data, image: await fileToBase64(file) });
  };
  return (
    <div className="glass-strong rounded-2xl p-6 mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-semibold text-foreground">{item.company ? "Edit" : "New"} Internship</h3>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
      </div>
      <input type="text" placeholder="Company Name" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
      <input type="text" placeholder="Role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
      <input type="text" placeholder="Duration (e.g., 3 Months)" value={data.duration} onChange={(e) => setData({ ...data, duration: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
      <textarea placeholder="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary file:cursor-pointer" />
      <button onClick={() => onSave(data)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-all"><Save size={16} /> Save</button>
    </div>
  );
}
