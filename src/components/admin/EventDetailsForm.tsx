import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EventData } from "@/lib/eventStore";

interface Props {
  event: EventData;
  onChange: (partial: Partial<EventData>) => void;
}

const EventDetailsForm = ({ event, onChange }: Props) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <h2 className="font-display font-bold text-lg text-foreground">Event Details</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Event Name</Label>
          <Input value={event.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. REC 2026" />
        </div>
        <div className="space-y-1.5">
          <Label>Date</Label>
          <Input type="date" value={event.date} onChange={(e) => onChange({ date: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Duration</Label>
          <Input value={event.duration} onChange={(e) => onChange({ duration: e.target.value })} placeholder="e.g. 3 hours" />
        </div>
        <div className="space-y-1.5">
          <Label>Venue</Label>
          <Input value={event.venue} onChange={(e) => onChange({ venue: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Postcode</Label>
          <Input value={event.postcode} onChange={(e) => onChange({ postcode: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input value={event.phone} onChange={(e) => onChange({ phone: e.target.value })} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Tagline</Label>
          <Input value={event.tagline} onChange={(e) => onChange({ tagline: e.target.value })} placeholder="e.g. Research-Driven. Industry-Ready." />
        </div>
        <div className="space-y-1.5">
          <Label>Audience</Label>
          <Input value={event.audience} onChange={(e) => onChange({ audience: e.target.value })} placeholder="e.g. UG, PG & Graduates" />
        </div>
        <div className="space-y-1.5">
          <Label>Status</Label>
          <div className={`flex items-center gap-2 h-10 px-3 rounded-md border border-border text-sm font-body ${event.status === "upcoming" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
            <span className={`w-2 h-2 rounded-full ${event.status === "upcoming" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
            {event.status === "upcoming" ? "Upcoming" : "Past"}
            <span className="text-xs text-muted-foreground ml-auto">(auto from date)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsForm;
