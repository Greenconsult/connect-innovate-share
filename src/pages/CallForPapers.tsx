import { FileText, CheckCircle } from "lucide-react";

const CallForPapers = () => {
  return (
    <>
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Call for Papers</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Submit your research for presentation</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-start gap-4 mb-8 bg-section-alt border border-border rounded p-6">
            <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display font-bold text-foreground mb-2">We Welcome Your Research</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Research Corner invites submissions from undergraduate students, postgraduate students, and recent graduates of the School of Computing & Mathematical Sciences.
              </p>
            </div>
          </div>

          <h3 className="font-display font-bold text-foreground text-lg mb-4">Topics of Interest</h3>
          <ul className="space-y-2 mb-8">
            {[
              "Artificial Intelligence & Machine Learning",
              "Cybersecurity & Network Security",
              "Software Engineering & DevOps",
              "Data Science & Big Data Analytics",
              "Internet of Things (IoT)",
              "Human-Computer Interaction",
              "Mathematical Modelling & Optimisation",
              "Cloud Computing & Distributed Systems",
            ].map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                {topic}
              </li>
            ))}
          </ul>

          <h3 className="font-display font-bold text-foreground text-lg mb-4">Submission Guidelines</h3>
          <div className="bg-card border border-border rounded p-6 space-y-3 mb-8">
            <p className="text-sm font-body text-muted-foreground"><strong className="text-foreground">Abstract Length:</strong> 250–500 words</p>
            <p className="text-sm font-body text-muted-foreground"><strong className="text-foreground">Presentation Duration:</strong> 20 minutes + 5 minutes Q&A</p>
            <p className="text-sm font-body text-muted-foreground"><strong className="text-foreground">Format:</strong> PDF or Word document</p>
            <p className="text-sm font-body text-muted-foreground"><strong className="text-foreground">Submission Email:</strong>{" "}
              <a href="mailto:researchcorner@wlv.ac.uk" className="text-primary hover:underline">researchcorner@wlv.ac.uk</a>
            </p>
          </div>

          <h3 className="font-display font-bold text-foreground text-lg mb-4">Important Dates</h3>
          <div className="bg-card border border-border rounded overflow-hidden">
            <table className="w-full text-sm font-body">
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 font-semibold text-foreground">Abstract Submission Deadline</td>
                  <td className="p-3 text-muted-foreground">TBA</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-semibold text-foreground">Notification of Acceptance</td>
                  <td className="p-3 text-muted-foreground">TBA</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">Presentation Date</td>
                  <td className="p-3 text-muted-foreground">TBA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallForPapers;
