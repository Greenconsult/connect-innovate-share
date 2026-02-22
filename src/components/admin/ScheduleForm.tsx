import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { ScheduleItem } from "@/lib/eventStore";

interface Props {
  schedule: ScheduleItem[];
  onChange: (schedule: ScheduleItem[]) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const ScheduleForm = ({ schedule, onChange }: Props) => {
  const add = () => onChange([...schedule, { id: uid(), time: "", title: "", description: "" }]);
  const remove = (id: string) => onChange(schedule.filter((s) => s.id !== id));
  const update = (id: string, field: keyof ScheduleItem, value: string) =>
    onChange(schedule.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">Schedule ({schedule.length})</h2>
        <Button onClick={add} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Item</Button>
      </div>
      {schedule.map((item) => (
        <div key={item.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body font-semibold text-sm text-foreground">{item.title || "New Item"}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Time</Label><Input value={item.time} onChange={(e) => update(item.id, "time", e.target.value)} placeholder="e.g. 14:00 – 14:10" /></div>
            <div className="space-y-1"><Label>Title</Label><Input value={item.title} onChange={(e) => update(item.id, "title", e.target.value)} /></div>
          </div>
          <div className="space-y-1"><Label>Description</Label><Textarea rows={2} value={item.description} onChange={(e) => update(item.id, "description", e.target.value)} /></div>
        </div>
      ))}
      {schedule.length === 0 && <p className="text-muted-foreground text-sm font-body">No schedule items yet.</p>}
    </div>
  );
};

export default ScheduleForm;
