import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { EventData, FlyerHighlight } from "@/lib/eventStore";

interface Props {
  event: EventData;
  onChange: (partial: Partial<EventData>) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const FlyerForm = ({ event, onChange }: Props) => {
  const addHighlight = () => onChange({ flyerHighlights: [...event.flyerHighlights, { id: uid(), icon: "", text: "" }] });
  const removeHighlight = (id: string) => onChange({ flyerHighlights: event.flyerHighlights.filter((h) => h.id !== id) });
  const updateHighlight = (id: string, field: keyof FlyerHighlight, val: string) =>
    onChange({ flyerHighlights: event.flyerHighlights.map((h) => (h.id === id ? { ...h, [field]: val } : h)) });

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-display font-bold text-lg text-foreground">Flyer Settings</h2>
        <div className="space-y-1.5">
          <Label>Funded By Text</Label>
          <Input value={event.fundedBy} onChange={(e) => onChange({ fundedBy: e.target.value })} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">Highlights ({event.flyerHighlights.length})</h2>
          <Button onClick={addHighlight} size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
        </div>
        {event.flyerHighlights.map((h) => (
          <div key={h.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Icon (emoji)</Label><Input value={h.icon} onChange={(e) => updateHighlight(h.id, "icon", e.target.value)} placeholder="e.g. 🔬" /></div>
              <div className="space-y-1"><Label>Text</Label><Input value={h.text} onChange={(e) => updateHighlight(h.id, "text", e.target.value)} placeholder="e.g. Present Your Research" /></div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeHighlight(h.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlyerForm;
