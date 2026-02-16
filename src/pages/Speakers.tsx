import { User } from "lucide-react";

const speakers = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Keynote Speaker",
    affiliation: "University of Wolverhampton",
    topic: "AI and Machine Learning in Healthcare",
    bio: "Senior Lecturer in Computer Science with over 15 years of experience in artificial intelligence research.",
  },
  {
    name: "Prof. James Okonkwo",
    role: "Keynote Speaker",
    affiliation: "University of Birmingham",
    topic: "Cybersecurity in the Age of IoT",
    bio: "Professor of Cybersecurity and a leading researcher in Internet of Things security protocols.",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Invited Speaker",
    affiliation: "Capgemini UK",
    topic: "Bridging Academia and Industry in Software Engineering",
    bio: "Industry researcher and alumna specialising in agile development methodologies.",
  },
  {
    name: "Mr. David Chen",
    role: "Panel Moderator",
    affiliation: "University of Wolverhampton",
    topic: "Student Research Journeys",
    bio: "Postgraduate researcher in data science and an advocate for student-led research initiatives.",
  },
];

const Speakers = () => {
  return (
    <>
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Speakers</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Meet our keynote and invited speakers</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {speakers.map((speaker) => (
              <div key={speaker.name} className="bg-card border border-border rounded p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{speaker.name}</h3>
                    <p className="text-primary font-body text-sm font-semibold">{speaker.role}</p>
                    <p className="text-muted-foreground font-body text-xs mt-0.5">{speaker.affiliation}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-body text-foreground font-medium mb-1">Topic: {speaker.topic}</p>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground font-body text-sm">
              Interested in speaking at Research Corner? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Speakers;
