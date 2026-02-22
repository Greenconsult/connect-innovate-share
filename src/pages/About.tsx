import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_SETTINGS } from "@/lib/settingsStore";
import { iconMap } from "@/lib/iconMap";
import { BookOpen } from "lucide-react";

const About = () => {
  const { data: settings } = useSettings();
  const s = settings ?? DEFAULT_SETTINGS;

  return (
    <>
      {/* Header */}
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">{s.aboutPageTitle}</h1>
          <p className="text-primary-foreground/70 font-body mt-2">{s.aboutPageSubtitle}</p>
        </div>
      </section>

      {/* About content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">{s.aboutPageHeading}</h2>
          {s.aboutPageParagraphs.map((para, i) => (
            <p key={i} className="text-muted-foreground font-body leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-section-alt py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-10 text-center">{s.objectivesHeading}</h2>
          <div className="space-y-6">
            {s.objectives.map((obj) => {
              const Icon = iconMap[obj.icon] || BookOpen;
              return (
                <div key={obj.title} className="flex gap-4 bg-card border border-border rounded p-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">{obj.title}</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{obj.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
