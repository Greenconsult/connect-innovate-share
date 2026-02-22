import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { type EventData } from "@/lib/eventStore";
import { useEvent, useSaveEvent } from "@/hooks/useEvents";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EventDetailsForm from "@/components/admin/EventDetailsForm";
import SpeakersForm from "@/components/admin/SpeakersForm";
import ScheduleForm from "@/components/admin/ScheduleForm";
import CommitteeForm from "@/components/admin/CommitteeForm";
import ProceedingsForm from "@/components/admin/ProceedingsForm";
import FlyerForm from "@/components/admin/FlyerForm";

const AdminEventEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { data: fetchedEvent, isLoading } = useEvent(id);
  const saveEventMutation = useSaveEvent();
  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin", { replace: true });
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (fetchedEvent) {
      setEvent(fetchedEvent);
    } else if (!isLoading && !fetchedEvent && id) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [fetchedEvent, isLoading, id]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) return null;

  const update = (partial: Partial<EventData>) => {
    setEvent((prev) => prev ? { ...prev, ...partial } : prev);
  };

  const handleSave = async () => {
    if (event) {
      try {
        await saveEventMutation.mutateAsync(event);
        toast({ title: "Saved", description: "Event has been saved successfully." });
      } catch (err: any) {
        toast({ title: "Error", description: err.message || "Failed to save event.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <h1 className="font-display font-bold text-lg text-foreground truncate">{event.name || "Untitled Event"}</h1>
        </div>
        <Button onClick={handleSave} size="sm">
          <Save className="w-4 h-4 mr-1" /> Save
        </Button>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="details">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="committee">Committee</TabsTrigger>
            <TabsTrigger value="proceedings">Proceedings</TabsTrigger>
            <TabsTrigger value="flyer">Flyer</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <EventDetailsForm event={event} onChange={update} />
          </TabsContent>
          <TabsContent value="speakers">
            <SpeakersForm speakers={event.speakers} onChange={(speakers) => update({ speakers })} eventId={event.id} />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleForm schedule={event.schedule} onChange={(schedule) => update({ schedule })} />
          </TabsContent>
          <TabsContent value="committee">
            <CommitteeForm committee={event.committee} onChange={(committee) => update({ committee })} />
          </TabsContent>
          <TabsContent value="proceedings">
            <ProceedingsForm event={event} onChange={update} />
          </TabsContent>
          <TabsContent value="flyer">
            <FlyerForm event={event} onChange={update} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminEventEdit;
