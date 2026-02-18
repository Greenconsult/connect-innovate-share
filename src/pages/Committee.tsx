import { User } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const committee = [
  { name: "Julius Odede", role: "Chair", affiliation: "Department of Computing & Mathematical Sciences", color: "from-yellow-400 to-yellow-500" },
  { name: "Consolée Mbarushimana", role: "Co-Chair", affiliation: "Department of Computing & Mathematical Sciences", color: "from-blue-500 to-blue-600" },
  { name: "Dr. Helen Price", role: "Programme Committee", affiliation: "Department of Computer Science", color: "from-emerald-500 to-emerald-600" },
  { name: "Dr. Rajesh Patel", role: "Programme Committee", affiliation: "Department of Mathematics", color: "from-emerald-500 to-emerald-600" },
  { name: "Ms. Laura Benson", role: "Organising Committee", affiliation: "Postgraduate Research Office", color: "from-violet-500 to-violet-600" },
  { name: "Mr. Kwame Asante", role: "Student Representative", affiliation: "PhD Candidate, Computer Science", color: "from-orange-400 to-orange-500" },
];

const Committee = () => {
  return (
    <>
      {/* Vibrant hero */}
      <section className="relative py-20 flex items-center overflow-hidden">
        <img
          src={campusHero}
          alt="University of Wolverhampton"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            REC 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Committee</h1>
          <p className="text-white/70 font-body text-lg">Meet the organising team behind the event</p>
        </div>
      </section>

      {/* Committee grid */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-5">
            {committee.map((member) => (
              <div key={member.name} className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center flex-shrink-0 shadow`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-sm">{member.name}</h3>
                  <p className="text-xs font-body font-semibold text-slate-600 mt-0.5">{member.role}</p>
                  <p className="text-muted-foreground font-body text-xs mt-0.5 leading-snug">{member.affiliation}</p>
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
