import { useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import uniLogo from "@/assets/uni_logo-2.png";
import { getCurrentEvent } from "@/lib/eventStore";

const Flyer = () => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const event = getCurrentEvent();

  const handleDownload = async () => {
    if (!flyerRef.current) return;
    const canvas = await html2canvas(flyerRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = `${event?.name || "REC"}-Flyer.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const displayDate = event?.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })
    : "April 21, 2026";

  const highlights = event?.flyerHighlights ?? [
    { id: "f1", icon: "🔬", text: "Present Your Research" },
    { id: "f2", icon: "🤝", text: "Network & Collaborate" },
    { id: "f3", icon: "📈", text: "Connect With Industry" },
  ];

  return (
    <div className="py-12 flex flex-col items-center gap-6 px-4">
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" /> Download Flyer
      </button>

      <div ref={flyerRef} className="w-[640px] overflow-hidden" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
        <div
          className="px-12 pt-10 pb-8 relative"
          style={{ background: "linear-gradient(135deg, hsl(215, 60%, 15%) 0%, hsl(225, 55%, 22%) 40%, hsl(210, 50%, 18%) 100%)" }}
        >
          <div className="absolute top-6 right-6 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(50, 95%, 55%) 0%, transparent 70%)" }} />
          <div className="absolute bottom-20 left-4 w-24 h-24 rounded-full opacity-8" style={{ background: "radial-gradient(circle, hsl(195, 80%, 50%) 0%, transparent 70%)" }} />

          <div
            className="inline-block px-5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: "linear-gradient(135deg, hsl(50, 95%, 50%), hsl(55, 100%, 55%))", color: "hsl(215, 60%, 12%)" }}
          >
            {event?.name || "REC 2026"}
          </div>

          <h1 className="text-[40px] font-bold leading-[1.1] text-white mb-1 tracking-wide">Research & Employability</h1>
          <h1
            className="text-[40px] font-bold leading-[1.1] mb-5 text-center"
            style={{ background: "linear-gradient(135deg, hsl(50, 95%, 60%), hsl(55, 100%, 65%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Corner
          </h1>

          <p className="text-base font-semibold mb-8 text-center" style={{ color: "hsl(50, 95%, 55%)" }}>
            {event?.tagline || "Research-Driven · Industry-Ready · Career-Focused"}
          </p>

          <div className="w-20 h-1.5 rounded-full mb-8" style={{ background: "linear-gradient(90deg, hsl(50, 95%, 55%), hsl(195, 70%, 55%))" }} />

          <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8">
            <DetailRow label="DATE" value={displayDate} color="hsl(50, 95%, 55%)" />
            <DetailRow label="DURATION" value={event?.duration || "3-Hour Session"} color="hsl(50, 95%, 55%)" />
            <DetailRow label="VENUE" value={event?.venue || "City Campus, Wolverhampton"} color="hsl(50, 95%, 55%)" />
            <DetailRow label="OPEN TO" value={event?.audience || "UG, PG & Graduates"} color="hsl(50, 95%, 55%)" />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {highlights.map((h) => (
              <div key={h.id} className="rounded-xl p-4 text-center" style={{ background: "hsla(0, 0%, 100%, 0.06)", borderLeft: "3px solid hsl(50, 95%, 55%)" }}>
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="text-white text-xs font-sans font-bold leading-snug">{h.text}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl px-6 py-4 flex items-center justify-between" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
            <div>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-sans font-bold mb-1">Enquiries</p>
              <p className="text-white text-sm font-sans font-semibold">📞 {event?.phone || "+44 (0)7438 023912"}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-sans font-bold mb-1">Postcode</p>
              <p className="text-white text-sm font-sans font-semibold">{event?.postcode || "WV1 1LY"}</p>
            </div>
          </div>

          <p className="text-white/50 text-[10px] font-sans text-center mt-6">
            {event?.fundedBy || "Funded by the Department of Computing, University of Wolverhampton"}
          </p>
        </div>

        <div className="h-3" style={{ background: "linear-gradient(90deg, hsl(50, 95%, 50%), hsl(195, 70%, 55%), hsl(160, 60%, 50%), hsl(280, 60%, 65%))" }} />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div>
    <p className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold mb-1" style={{ color }}>{label}</p>
    <p className="text-white text-sm font-sans font-semibold">{value}</p>
  </div>
);

export default Flyer;
