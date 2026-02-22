import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { Speaker } from "@/lib/eventStore";

interface Props {
  speakers: Speaker[];
  onChange: (speakers: Speaker[]) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const SpeakersForm = ({ speakers, onChange }: Props) => {
  const add = () => onChange([...speakers, { id: uid(), name: "", role: "", affiliation: "", topic: "", bio: "" }]);
  const remove = (id: string) => onChange(speakers.filter((s) => s.id !== id));
  const update = (id: string, field: keyof Speaker, value: string) =>
    onChange(speakers.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">Speakers ({speakers.length})</h2>
        <Button onClick={add} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Speaker</Button>
      </div>
      {speakers.map((s) => (
        <div key={s.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body font-semibold text-sm text-foreground">{s.name || "New Speaker"}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Name</Label><Input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} /></div>
            <div className="space-y-1"><Label>Role</Label><Input value={s.role} onChange={(e) => update(s.id, "role", e.target.value)} placeholder="e.g. Keynote Speaker" /></div>
            <div className="space-y-1"><Label>Affiliation</Label><Input value={s.affiliation} onChange={(e) => update(s.id, "affiliation", e.target.value)} /></div>
            <div className="space-y-1"><Label>Topic</Label><Input value={s.topic} onChange={(e) => update(s.id, "topic", e.target.value)} /></div>
          </div>
          <div className="space-y-1"><Label>Bio</Label><Textarea rows={2} value={s.bio} onChange={(e) => update(s.id, "bio", e.target.value)} /></div>
        </div>
      ))}
      {speakers.length === 0 && <p className="text-muted-foreground text-sm font-body">No speakers added yet.</p>}
    </div>
  );
};

export default SpeakersForm;
