import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { EventData, ImportantDate } from "@/lib/eventStore";

interface Props {
  event: EventData;
  onChange: (partial: Partial<EventData>) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const ProceedingsForm = ({ event, onChange }: Props) => {
  // Topics
  const addTopic = () => onChange({ topics: [...event.topics, ""] });
  const removeTopic = (i: number) => onChange({ topics: event.topics.filter((_, idx) => idx !== i) });
  const updateTopic = (i: number, val: string) => onChange({ topics: event.topics.map((t, idx) => (idx === i ? val : t)) });

  // Submission guidelines
  const addGuideline = () => onChange({ submissionGuidelines: [...event.submissionGuidelines, ""] });
  const removeGuideline = (i: number) => onChange({ submissionGuidelines: event.submissionGuidelines.filter((_, idx) => idx !== i) });
  const updateGuideline = (i: number, val: string) => onChange({ submissionGuidelines: event.submissionGuidelines.map((g, idx) => (idx === i ? val : g)) });

  // Important dates
  const addDate = () => onChange({ importantDates: [...event.importantDates, { id: uid(), label: "", date: "" }] });
  const removeDate = (id: string) => onChange({ importantDates: event.importantDates.filter((d) => d.id !== id) });
  const updateDate = (id: string, field: keyof ImportantDate, val: string | boolean) =>
    onChange({ importantDates: event.importantDates.map((d) => (d.id === id ? { ...d, [field]: val } : d)) });

  return (
    <div className="space-y-8">
      {/* Topics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">Topics of Interest ({event.topics.length})</h2>
          <Button onClick={addTopic} size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
        </div>
        {event.topics.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={t} onChange={(e) => updateTopic(i, e.target.value)} placeholder="Topic name" />
            <Button variant="ghost" size="icon" onClick={() => removeTopic(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">Submission Guidelines ({event.submissionGuidelines.length})</h2>
          <Button onClick={addGuideline} size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
        </div>
        {event.submissionGuidelines.map((g, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={g} onChange={(e) => updateGuideline(i, e.target.value)} placeholder="e.g. Abstract Length: 250–500 words" />
            <Button variant="ghost" size="icon" onClick={() => removeGuideline(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </div>

      {/* Important Dates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">Important Dates ({event.importantDates.length})</h2>
          <Button onClick={addDate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
        </div>
        {event.importantDates.map((d) => (
          <div key={d.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Label</Label><Input value={d.label} onChange={(e) => updateDate(d.id, "label", e.target.value)} /></div>
              <div className="space-y-1"><Label>Date</Label><Input value={d.date} onChange={(e) => updateDate(d.id, "date", e.target.value)} placeholder="e.g. TBA or March 15, 2026" /></div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeDate(d.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProceedingsForm;
