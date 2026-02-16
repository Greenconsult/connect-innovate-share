import { User } from "lucide-react";

const committee = [
  { name: "Julius Odede", role: "Chair", affiliation: "School of Computing & Mathematical Sciences" },
  { name: "Consolée Mbarushimana", role: "Co-Chair", affiliation: "School of Computing & Mathematical Sciences" },
  { name: "Dr. Helen Price", role: "Programme Committee", affiliation: "Department of Computer Science" },
  { name: "Dr. Rajesh Patel", role: "Programme Committee", affiliation: "Department of Mathematics" },
  { name: "Ms. Laura Benson", role: "Organising Committee", affiliation: "Postgraduate Research Office" },
  { name: "Mr. Kwame Asante", role: "Student Representative", affiliation: "PhD Candidate, Computer Science" },
];

const Committee = () => {
  return (
    <>
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Committee</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Meet the organising team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            {committee.map((member) => (
              <div key={member.name} className="flex items-center gap-4 bg-card border border-border rounded p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-sm">{member.name}</h3>
                  <p className="text-secondary font-body text-xs font-semibold">{member.role}</p>
                  <p className="text-muted-foreground font-body text-xs">{member.affiliation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Committee;
