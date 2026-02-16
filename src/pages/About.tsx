import { BookOpen, Users, FileText, Handshake, Lightbulb } from "lucide-react";

const objectives = [
  { icon: BookOpen, title: "Enhance Research Skills", description: "Foster a culture of inquiry and critical thinking by exposing students to diverse research methods, presentation styles, and emerging research areas." },
  { icon: Users, title: "Promote Collaboration", description: "Strengthen collaboration between students, alumni, and industry professionals, bridging the gap between academic research and real-world applications." },
  { icon: FileText, title: "Encourage Publications", description: "Motivate students to transform their projects and dissertations into conference papers or journal publications, with guidance from faculty." },
  { icon: Handshake, title: "Mentorship & Networking", description: "Create mentorship links between graduates and current students to encourage continued academic and professional development." },
  { icon: Lightbulb, title: "Showcase Innovation", description: "Provide a platform for sharing innovative ideas and research outcomes that can influence future projects or partnerships." },
];

const About = () => {
  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">About</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Learn more about the Research Corner initiative</p>
        </div>
      </section>

      {/* About content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">About Research Corner</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Research Corner is a proposed initiative under the School of Computing and Mathematical Sciences at the University of Wolverhampton. The event aims to create a vibrant platform where undergraduate students, postgraduate students, and recent graduates can showcase their research, exchange ideas, and build lasting collaborations with peers, academics, and industry partners.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Each session features research presentations, panel discussions, and networking opportunities designed to promote innovation, academic excellence, and professional growth.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Sessions are held bi-monthly, each lasting 2–3 hours at the Springfield Campus (or alternating with City Campus for wider participation). The audience includes undergraduate and postgraduate students, recent graduates, academic staff and researchers, and industry representatives.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-section-alt py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-10 text-center">Core Objectives</h2>
          <div className="space-y-6">
            {objectives.map((obj) => (
              <div key={obj.title} className="flex gap-4 bg-card border border-border rounded p-6">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <obj.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{obj.title}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{obj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
