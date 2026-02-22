import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { CommitteeMember } from "@/lib/eventStore";

interface Props {
  committee: CommitteeMember[];
  onChange: (committee: CommitteeMember[]) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const CommitteeForm = ({ committee, onChange }: Props) => {
  const add = () => onChange([...committee, { id: uid(), name: "", role: "", affiliation: "" }]);
  const remove = (id: string) => onChange(committee.filter((c) => c.id !== id));
  const update = (id: string, field: keyof CommitteeMember, value: string) =>
    onChange(committee.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">Committee ({committee.length})</h2>
        <Button onClick={add} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Member</Button>
      </div>
      {committee.map((m) => (
        <div key={m.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body font-semibold text-sm text-foreground">{m.name || "New Member"}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1"><Label>Name</Label><Input value={m.name} onChange={(e) => update(m.id, "name", e.target.value)} /></div>
            <div className="space-y-1"><Label>Role</Label><Input value={m.role} onChange={(e) => update(m.id, "role", e.target.value)} /></div>
            <div className="space-y-1"><Label>Affiliation</Label><Input value={m.affiliation} onChange={(e) => update(m.id, "affiliation", e.target.value)} /></div>
          </div>
        </div>
      ))}
      {committee.length === 0 && <p className="text-muted-foreground text-sm font-body">No committee members yet.</p>}
    </div>
  );
};

export default CommitteeForm;
