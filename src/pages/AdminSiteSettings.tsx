import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings, useSaveSettings } from "@/hooks/useSettings";
import { DEFAULT_SETTINGS, type SiteSettings, type FeatureItem, type ObjectiveItem, type TravelOption, type NavLinkItem } from "@/lib/settingsStore";
import { iconOptions } from "@/lib/iconMap";
import { ArrowLeft, Loader2, Plus, Trash2, Save, GripVertical, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// ── Helpers ─────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ── Reusable section wrapper ────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8 last:mb-0">
    <h3 className="font-display font-bold text-base text-foreground mb-4 pb-2 border-b border-border">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-sm font-body mb-1.5 block">{label}</Label>
    {children}
  </div>
);

// ── Main component ──────────────────────────────────────────────────

const AdminSiteSettings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: saved, isLoading } = useSettings();
  const saveMutation = useSaveSettings();
  const { toast } = useToast();

  const [s, setS] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (saved) setS(saved);
  }, [saved]);

  if (authLoading || isLoading) {
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

  const update = <K extends keyof SiteSettings>(key: K, val: SiteSettings[K]) =>
    setS((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync(s);
      toast({ title: "Settings saved", description: "Your changes are now live." });
    } catch (e: any) {
      toast({ title: "Error saving", description: e.message, variant: "destructive" });
    }
  };

  // ── Array helpers (features, objectives, travel, navLinks, etc.) ──

  const updateFeature = (idx: number, patch: Partial<FeatureItem>) =>
    update("features", s.features.map((f, i) => (i === idx ? { ...f, ...patch } : f)));
  const addFeature = () =>
    update("features", [...s.features, { title: "", description: "", icon: "BookOpen" }]);
  const removeFeature = (idx: number) =>
    update("features", s.features.filter((_, i) => i !== idx));

  const updateObjective = (idx: number, patch: Partial<ObjectiveItem>) =>
    update("objectives", s.objectives.map((o, i) => (i === idx ? { ...o, ...patch } : o)));
  const addObjective = () =>
    update("objectives", [...s.objectives, { title: "", description: "", icon: "BookOpen" }]);
  const removeObjective = (idx: number) =>
    update("objectives", s.objectives.filter((_, i) => i !== idx));

  const updateTravel = (idx: number, patch: Partial<TravelOption>) =>
    update("travelOptions", s.travelOptions.map((t, i) => (i === idx ? { ...t, ...patch } : t)));
  const addTravel = () =>
    update("travelOptions", [...s.travelOptions, { title: "", description: "" }]);
  const removeTravel = (idx: number) =>
    update("travelOptions", s.travelOptions.filter((_, i) => i !== idx));

  const updateNav = (idx: number, patch: Partial<NavLinkItem>) =>
    update("navLinks", s.navLinks.map((n, i) => (i === idx ? { ...n, ...patch } : n)));

  const updateParagraph = (idx: number, val: string) =>
    update("aboutPageParagraphs", s.aboutPageParagraphs.map((p, i) => (i === idx ? val : p)));
  const addParagraph = () =>
    update("aboutPageParagraphs", [...s.aboutPageParagraphs, ""]);
  const removeParagraph = (idx: number) =>
    update("aboutPageParagraphs", s.aboutPageParagraphs.filter((_, i) => i !== idx));

  const updateBadge = (idx: number, val: string) =>
    update("heroBadges", s.heroBadges.map((b, i) => (i === idx ? val : b)));
  const addBadge = () =>
    update("heroBadges", [...s.heroBadges, ""]);
  const removeBadge = (idx: number) =>
    update("heroBadges", s.heroBadges.filter((_, i) => i !== idx));

  const updateFooterLine = (idx: number, val: string) =>
    update("footerContactLines", s.footerContactLines.map((l, i) => (i === idx ? val : l)));
  const addFooterLine = () =>
    update("footerContactLines", [...s.footerContactLines, ""]);
  const removeFooterLine = (idx: number) =>
    update("footerContactLines", s.footerContactLines.filter((_, i) => i !== idx));

  // ── Icon picker component ──

  const IconSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {iconOptions.map((name) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-display font-bold text-lg text-foreground">Site Settings</h1>
        </div>
        <Button onClick={handleSave} disabled={saveMutation.isPending} size="sm">
          {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
          Save Changes
        </Button>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="nav">Navigation</TabsTrigger>
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="venue">Venue</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          {/* ─── General ─── */}
          <TabsContent value="general" className="bg-card border border-border rounded-xl p-6">
            <Section title="Branding">
              <Field label="Brand / Nav Title">
                <Input value={s.brandName} onChange={(e) => update("brandName", e.target.value)} placeholder="REC 2026" />
              </Field>
              <Field label="Full Site Title">
                <Input value={s.siteTitle} onChange={(e) => update("siteTitle", e.target.value)} placeholder="Research and Employability Corner" />
              </Field>
              <Field label="Site Tagline">
                <Input value={s.siteTagline} onChange={(e) => update("siteTagline", e.target.value)} placeholder="Showcasing Research. Shaping Careers." />
              </Field>
            </Section>
          </TabsContent>

          {/* ─── Navigation ─── */}
          <TabsContent value="nav" className="bg-card border border-border rounded-xl p-6">
            <Section title="Navigation Links">
              <p className="text-xs text-muted-foreground font-body mb-2">Toggle visibility and rename nav links. Routes are fixed.</p>
              <div className="space-y-3">
                {s.navLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <Input
                      value={link.label}
                      onChange={(e) => updateNav(i, { label: e.target.value })}
                      className="flex-1"
                      placeholder="Label"
                    />
                    <code className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 font-mono">{link.to}</code>
                    <div className="flex items-center gap-2">
                      {link.visible ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      <Switch checked={link.visible} onCheckedChange={(v) => updateNav(i, { visible: v })} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </TabsContent>

          {/* ─── Home Page ─── */}
          <TabsContent value="home" className="bg-card border border-border rounded-xl p-6">
            <Section title="Hero Section">
              <Field label="Hero Title">
                <Input value={s.heroTitle} onChange={(e) => update("heroTitle", e.target.value)} />
              </Field>
              <Field label="Hero Image URL (leave empty for default)">
                <Input value={s.heroImageUrl} onChange={(e) => update("heroImageUrl", e.target.value)} placeholder="https://..." />
              </Field>
              <Field label="Hero Badges">
                {s.heroBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <Input value={badge} onChange={(e) => updateBadge(i, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeBadge(i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addBadge}>
                  <Plus className="w-3 h-3 mr-1" /> Add Badge
                </Button>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Button 1 Label">
                  <Input value={s.heroButton1Label} onChange={(e) => update("heroButton1Label", e.target.value)} />
                </Field>
                <Field label="Button 1 Link">
                  <Input value={s.heroButton1Link} onChange={(e) => update("heroButton1Link", e.target.value)} />
                </Field>
                <Field label="Button 2 Label">
                  <Input value={s.heroButton2Label} onChange={(e) => update("heroButton2Label", e.target.value)} />
                </Field>
                <Field label="Button 2 Link">
                  <Input value={s.heroButton2Link} onChange={(e) => update("heroButton2Link", e.target.value)} />
                </Field>
              </div>
            </Section>

            <Section title="About Preview">
              <Field label="Heading">
                <Input value={s.aboutPreviewHeading} onChange={(e) => update("aboutPreviewHeading", e.target.value)} />
              </Field>
              <Field label="Text">
                <Textarea rows={3} value={s.aboutPreviewText} onChange={(e) => update("aboutPreviewText", e.target.value)} />
              </Field>
            </Section>

            <Section title="Features / Why Attend">
              <Field label="Section Heading">
                <Input value={s.featuresHeading} onChange={(e) => update("featuresHeading", e.target.value)} />
              </Field>
              {s.features.map((feat, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-body font-bold text-muted-foreground uppercase">Feature {i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFeature(i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Title">
                      <Input value={feat.title} onChange={(e) => updateFeature(i, { title: e.target.value })} />
                    </Field>
                    <Field label="Icon">
                      <IconSelect value={feat.icon} onChange={(v) => updateFeature(i, { icon: v })} />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea rows={2} value={feat.description} onChange={(e) => updateFeature(i, { description: e.target.value })} />
                  </Field>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-3 h-3 mr-1" /> Add Feature
              </Button>
            </Section>

            <Section title="Call to Action">
              <Field label="Heading">
                <Input value={s.ctaHeading} onChange={(e) => update("ctaHeading", e.target.value)} />
              </Field>
              <Field label="Text">
                <Textarea rows={2} value={s.ctaText} onChange={(e) => update("ctaText", e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Button 1 Label">
                  <Input value={s.ctaButton1Label} onChange={(e) => update("ctaButton1Label", e.target.value)} />
                </Field>
                <Field label="Button 1 Link">
                  <Input value={s.ctaButton1Link} onChange={(e) => update("ctaButton1Link", e.target.value)} />
                </Field>
                <Field label="Button 2 Label">
                  <Input value={s.ctaButton2Label} onChange={(e) => update("ctaButton2Label", e.target.value)} />
                </Field>
                <Field label="Button 2 Link">
                  <Input value={s.ctaButton2Link} onChange={(e) => update("ctaButton2Link", e.target.value)} />
                </Field>
              </div>
            </Section>

            <Section title="Editions Section">
              <Field label="Heading">
                <Input value={s.editionsHeading} onChange={(e) => update("editionsHeading", e.target.value)} />
              </Field>
              <Field label="Sub-text">
                <Textarea rows={2} value={s.editionsSubtext} onChange={(e) => update("editionsSubtext", e.target.value)} />
              </Field>
            </Section>
          </TabsContent>

          {/* ─── About Page ─── */}
          <TabsContent value="about" className="bg-card border border-border rounded-xl p-6">
            <Section title="Page Header">
              <Field label="Page Title">
                <Input value={s.aboutPageTitle} onChange={(e) => update("aboutPageTitle", e.target.value)} />
              </Field>
              <Field label="Subtitle">
                <Input value={s.aboutPageSubtitle} onChange={(e) => update("aboutPageSubtitle", e.target.value)} />
              </Field>
            </Section>

            <Section title="Content">
              <Field label="Heading">
                <Input value={s.aboutPageHeading} onChange={(e) => update("aboutPageHeading", e.target.value)} />
              </Field>
              <Field label="Paragraphs">
                {s.aboutPageParagraphs.map((p, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Textarea rows={3} value={p} onChange={(e) => updateParagraph(i, e.target.value)} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => removeParagraph(i)} className="mt-1">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addParagraph}>
                  <Plus className="w-3 h-3 mr-1" /> Add Paragraph
                </Button>
              </Field>
            </Section>

            <Section title="Objectives">
              <Field label="Section Heading">
                <Input value={s.objectivesHeading} onChange={(e) => update("objectivesHeading", e.target.value)} />
              </Field>
              {s.objectives.map((obj, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-body font-bold text-muted-foreground uppercase">Objective {i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeObjective(i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Title">
                      <Input value={obj.title} onChange={(e) => updateObjective(i, { title: e.target.value })} />
                    </Field>
                    <Field label="Icon">
                      <IconSelect value={obj.icon} onChange={(v) => updateObjective(i, { icon: v })} />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea rows={2} value={obj.description} onChange={(e) => updateObjective(i, { description: e.target.value })} />
                  </Field>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addObjective}>
                <Plus className="w-3 h-3 mr-1" /> Add Objective
              </Button>
            </Section>
          </TabsContent>

          {/* ─── Venue ─── */}
          <TabsContent value="venue" className="bg-card border border-border rounded-xl p-6">
            <Section title="Location">
              <Field label="Address (line 1)">
                <Input value={s.venueAddress} onChange={(e) => update("venueAddress", e.target.value)} />
              </Field>
              <Field label="Address (line 2)">
                <Input value={s.venueAddressLine2} onChange={(e) => update("venueAddressLine2", e.target.value)} />
              </Field>
              <Field label="Postcode">
                <Input value={s.venuePostcode} onChange={(e) => update("venuePostcode", e.target.value)} />
              </Field>
              <Field label="Google Maps Embed URL">
                <Textarea rows={2} value={s.venueMapUrl} onChange={(e) => update("venueMapUrl", e.target.value)} className="font-mono text-xs" />
              </Field>
            </Section>

            <Section title="Travel Options">
              {s.travelOptions.map((opt, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-body font-bold text-muted-foreground uppercase">Option {i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeTravel(i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <Field label="Title (e.g. By Train)">
                    <Input value={opt.title} onChange={(e) => updateTravel(i, { title: e.target.value })} />
                  </Field>
                  <Field label="Description">
                    <Textarea rows={2} value={opt.description} onChange={(e) => updateTravel(i, { description: e.target.value })} />
                  </Field>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addTravel}>
                <Plus className="w-3 h-3 mr-1" /> Add Travel Option
              </Button>
            </Section>
          </TabsContent>

          {/* ─── Contact ─── */}
          <TabsContent value="contact" className="bg-card border border-border rounded-xl p-6">
            <Section title="Contact Information">
              <Field label="Email">
                <Input type="email" value={s.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
              </Field>
              <Field label="Phone">
                <Input value={s.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} />
              </Field>
              <Field label="Department">
                <Input value={s.contactDepartment} onChange={(e) => update("contactDepartment", e.target.value)} />
              </Field>
              <Field label="Address (use Shift+Enter for new lines)">
                <Textarea rows={3} value={s.contactAddress} onChange={(e) => update("contactAddress", e.target.value)} />
              </Field>
            </Section>
          </TabsContent>

          {/* ─── Footer ─── */}
          <TabsContent value="footer" className="bg-card border border-border rounded-xl p-6">
            <Section title="Footer Content">
              <Field label="Title">
                <Input value={s.footerTitle} onChange={(e) => update("footerTitle", e.target.value)} />
              </Field>
              <Field label="Tagline">
                <Input value={s.footerTagline} onChange={(e) => update("footerTagline", e.target.value)} />
              </Field>
              <Field label="Email">
                <Input type="email" value={s.footerEmail} onChange={(e) => update("footerEmail", e.target.value)} />
              </Field>
              <Field label="Copyright Text">
                <Input value={s.footerCopyright} onChange={(e) => update("footerCopyright", e.target.value)} />
              </Field>
              <Field label="Contact Lines">
                {s.footerContactLines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <Input value={line} onChange={(e) => updateFooterLine(i, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeFooterLine(i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFooterLine}>
                  <Plus className="w-3 h-3 mr-1" /> Add Line
                </Button>
              </Field>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSiteSettings;
