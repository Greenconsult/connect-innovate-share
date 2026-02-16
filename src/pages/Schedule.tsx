const schedule = [
  { time: "14:00 – 14:10", title: "Welcome Address", description: "Overview of the session and introduction of speakers." },
  { time: "14:10 – 14:30", title: "Keynote Talk", description: "Invited guest shares insights on a topical research area (15–20 mins)." },
  { time: "14:30 – 15:30", title: "Student & Graduate Presentations", description: "2–3 presentations (20 mins each), each followed by a 5-minute Q&A." },
  { time: "15:30 – 16:00", title: "Panel Discussion", description: "Open conversation on challenges and opportunities in student research." },
  { time: "16:00 – 16:30", title: "Networking & Refreshments", description: "Informal discussion, idea exchange, and mentorship opportunities." },
];

const Schedule = () => {
  return (
    <>
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Schedule</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Typical event agenda for each session</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="mb-8 bg-section-alt border border-border rounded p-4">
            <p className="text-sm font-body text-muted-foreground">
              <strong className="text-foreground">Frequency:</strong> Twice every year &nbsp;|&nbsp;
              <strong className="text-foreground">Duration:</strong> 2–3 hours per session
            </p>
          </div>

          <div className="space-y-0">
            {schedule.map((item, i) => (
              <div key={item.title} className="flex gap-4 md:gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {i < schedule.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className="text-xs font-body font-semibold text-primary uppercase tracking-wide">{item.time}</p>
                  <h3 className="font-display font-bold text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
