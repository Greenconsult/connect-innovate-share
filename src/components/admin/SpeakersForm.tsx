import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, X, Loader2, AlertCircle } from "lucide-react";
import type { Speaker } from "@/lib/eventStore";
import { uploadSpeakerImage } from "@/lib/speakerImageUpload";
import { useState } from "react";

interface Props {
  speakers: Speaker[];
  onChange: (speakers: Speaker[]) => void;
  eventId?: string;
}

const uid = () => Math.random().toString(36).slice(2, 10);

// Per-speaker upload state
interface UploadState {
  isLoading: boolean;
  error?: string;
}

const SpeakersForm = ({ speakers, onChange, eventId = "default" }: Props) => {
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({});

  const add = () =>
    onChange([...speakers, { id: uid(), name: "", role: "", affiliation: "", topic: "", bio: "" }]);
  const remove = (id: string) => onChange(speakers.filter((s) => s.id !== id));
  const update = (id: string, field: keyof Speaker, value: string | undefined) =>
    onChange(speakers.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const handleImageUpload = async (speakerId: string, file: File) => {
    setUploadStates((prev) => ({ ...prev, [speakerId]: { isLoading: true } }));

    const result = await uploadSpeakerImage(file, eventId, speakerId);

    if (result.success && result.url) {
      update(speakerId, "imageUrl", result.url);
      setUploadStates((prev) => ({ ...prev, [speakerId]: { isLoading: false } }));
    } else {
      setUploadStates((prev) => ({
        ...prev,
        [speakerId]: { isLoading: false, error: result.error || "Upload failed" },
      }));
    }
  };

  const removeImage = (speakerId: string) => {
    update(speakerId, "imageUrl", undefined);
  };

  const clearError = (speakerId: string) => {
    setUploadStates((prev) => {
      const newState = { ...prev };
      delete newState[speakerId];
      return newState;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">Speakers ({speakers.length})</h2>
        <Button onClick={add} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Speaker
        </Button>
      </div>
      {speakers.map((s) => {
        const uploadState = uploadStates[s.id] || { isLoading: false };
        return (
          <div key={s.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body font-semibold text-sm text-foreground">
                {s.name || "New Speaker"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => remove(s.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            {/* Image upload section */}
            <div className="space-y-2">
              <Label>Speaker Photo</Label>
              <div className="flex gap-3 items-start">
                {s.imageUrl ? (
                  <div className="relative">
                    <img
                      src={s.imageUrl}
                      alt={s.name}
                      className="w-20 h-20 rounded-lg object-cover border border-border"
                    />
                    <button
                      onClick={() => removeImage(s.id)}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-muted border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">No photo</span>
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(s.id, file);
                      }
                      // Reset input so same file can be uploaded again
                      e.target.value = "";
                    }}
                    disabled={uploadState.isLoading}
                    id={`image-${s.id}`}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploadState.isLoading}
                    onClick={() => document.getElementById(`image-${s.id}`)?.click()}
                  >
                    {uploadState.isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-1" /> {s.imageUrl ? "Change Photo" : "Upload Photo"}
                      </>
                    )}
                  </Button>
                  {uploadState.error && (
                    <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        {uploadState.error}
                        <button
                          onClick={() => clearError(s.id)}
                          className="ml-2 underline hover:no-underline text-xs"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">JPG, PNG, WebP or GIF • Max 10MB</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Role</Label>
                <Input
                  value={s.role}
                  onChange={(e) => update(s.id, "role", e.target.value)}
                  placeholder="e.g. Keynote Speaker"
                />
              </div>
              <div className="space-y-1">
                <Label>Affiliation</Label>
                <Input
                  value={s.affiliation}
                  onChange={(e) => update(s.id, "affiliation", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Topic</Label>
                <Input
                  value={s.topic}
                  onChange={(e) => update(s.id, "topic", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Bio</Label>
              <Textarea
                rows={2}
                value={s.bio}
                onChange={(e) => update(s.id, "bio", e.target.value)}
              />
            </div>
          </div>
        );
      })}
      {speakers.length === 0 && (
        <p className="text-muted-foreground text-sm font-body">No speakers added yet.</p>
      )}
    </div>
  );
};

export default SpeakersForm;
