import { Link, useNavigate } from "react-router-dom";
import { createBlankEvent } from "@/lib/eventStore";
import { useEvents, useSaveEvent, useDeleteEvent, useSetCurrentEvent } from "@/hooks/useEvents";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Star, Trash2, LogOut, Edit, Calendar, Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: events = [], isLoading } = useEvents();
  const saveEventMutation = useSaveEvent();
  const deleteEventMutation = useDeleteEvent();
  const setCurrentMutation = useSetCurrentEvent();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleCreate = async () => {
    const ev = createBlankEvent();
    await saveEventMutation.mutateAsync(ev);
    navigate(`/admin/events/${ev.id}`);
  };

  const handleSetCurrent = (id: string) => {
    setCurrentMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteEventMutation.mutate(id);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display font-bold text-lg text-foreground">REC Admin</h1>
        <div className="flex items-center gap-2">
          <Link to="/admin/settings">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-1" /> Site Settings
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-foreground">Events</h2>
          <Button onClick={handleCreate} size="sm">
            <Plus className="w-4 h-4 mr-1" /> New Event
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && events.length === 0 && (
          <p className="text-muted-foreground text-sm font-body">No events yet. Create one to get started.</p>
        )}

        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className={`bg-card border rounded-xl p-5 shadow-sm flex items-center gap-4 ${ev.isCurrent ? "border-primary ring-1 ring-primary/30" : "border-border"}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-foreground truncate">{ev.name || "Untitled Event"}</h3>
                  {ev.isCurrent && (
                    <span className="bg-primary/10 text-primary text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase">Current</span>
                  )}
                  <span className={`text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase ${ev.status === "upcoming" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                    {ev.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date || "No date"}</span>
                  <span>{ev.speakers.length} speakers</span>
                  <span>{ev.schedule.length} schedule items</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!ev.isCurrent && (
                  <Button variant="ghost" size="icon" title="Set as current" onClick={() => handleSetCurrent(ev.id)}>
                    <Star className="w-4 h-4" />
                  </Button>
                )}
                <Link to={`/admin/events/${ev.id}`}>
                  <Button variant="ghost" size="icon" title="Edit">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" title="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete event?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete "{ev.name || "Untitled Event"}". This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(ev.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
