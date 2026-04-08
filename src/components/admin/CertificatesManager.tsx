import { useState, useEffect } from "react";
import { getCertificates, saveCertificates, generateId, fileToBase64, type Certificate } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

export default function CertificatesManager() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [editing, setEditing] = useState<Certificate | null>(null);

  useEffect(() => setCerts(getCertificates()), []);

  const handleSave = (cert: Certificate) => {
    let updated: Certificate[];
    if (certs.find((c) => c.id === cert.id)) {
      updated = certs.map((c) => (c.id === cert.id ? cert : c));
    } else {
      updated = [...certs, cert];
    }
    setCerts(updated);
    saveCertificates(updated);
    setEditing(null);
    toast.success("Certificate saved!");
  };

  const handleDelete = (id: string) => {
    const updated = certs.filter((c) => c.id !== id);
    setCerts(updated);
    saveCertificates(updated);
    toast.success("Certificate deleted!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Certificates</h1>
        <button onClick={() => setEditing({ id: generateId(), title: "", description: "", image: "" })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-all">
          <Plus size={18} /> Add Certificate
        </button>
      </div>

      {editing && <CertForm item={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}

      <div className="space-y-4">
        {certs.map((c) => (
          <div key={c.id} className="glass rounded-xl p-4 flex items-center gap-4">
            {c.image ? <img src={c.image} alt={c.title} className="w-16 h-16 rounded-lg object-cover" /> : <div className="w-16 h-16 rounded-lg bg-accent/10" />}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-foreground truncate">{c.title}</h3>
              <p className="text-muted-foreground text-sm truncate">{c.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(c)} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertForm({ item, onSave, onCancel }: { item: Certificate; onSave: (c: Certificate) => void; onCancel: () => void }) {
  const [data, setData] = useState(item);
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setData({ ...data, image: await fileToBase64(file) });
  };
  return (
    <div className="glass-strong rounded-2xl p-6 mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-semibold text-foreground">{item.title ? "Edit" : "New"} Certificate</h3>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
      </div>
      <input type="text" placeholder="Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
      <textarea placeholder="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary file:cursor-pointer" />
      <button onClick={() => onSave(data)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-all"><Save size={16} /> Save</button>
    </div>
  );
}
