import { useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

const Flyer = () => {
  const flyerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!flyerRef.current) return;
    const canvas = await html2canvas(flyerRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = "REC-2026-Flyer.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="py-12 flex flex-col items-center gap-6 px-4">
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" /> Download Flyer
      </button>

      {/* Flyer */}
      <div
        ref={flyerRef}
        className="w-[640px] overflow-hidden"
        style={{ fontFamily: "'Merriweather', Georgia, serif" }}
      >
        {/* Top gold header bar */}
        <div
          className="px-10 py-6 text-center"
          style={{ backgroundColor: "hsl(42, 65%, 55%)" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase font-sans font-bold text-black/70 mb-1">
            Department of Computing & Mathematical Sciences
          </p>
          <p className="text-xs font-sans text-black/60">
            University of Wolverhampton
          </p>
        </div>

        {/* Main dark body */}
        <div
          className="px-12 py-10"
          style={{ backgroundColor: "hsl(220, 15%, 14%)" }}
        >
          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight text-white mb-1">
            Research and
          </h1>
          <h1 className="text-4xl font-bold leading-tight text-white mb-1">
            Employability
          </h1>
          <h1
            className="text-4xl font-bold leading-tight mb-6"
            style={{ color: "hsl(42, 65%, 55%)" }}
          >
            Corner
          </h1>

          {/* Tagline */}
          <p
            className="text-base italic font-semibold mb-10"
            style={{ color: "hsl(42, 65%, 75%)" }}
          >
            Research-Driven · Industry-Ready · Career-Focused
          </p>

          {/* Divider */}
          <div
            className="w-16 h-1 rounded mb-10"
            style={{ backgroundColor: "hsl(42, 65%, 55%)" }}
          />

          {/* Details */}
          <div className="space-y-6 mb-10">
            <DetailRow label="DATE" value="April 21, 2026" />
            <DetailRow label="VENUE" value="City Campus, University of Wolverhampton" />
            <DetailRow label="DURATION" value="3-Hour Interactive Session" />
            <DetailRow label="OPEN TO" value="All Students — UG, PG & Recent Graduates" />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/15 mb-10" />

          {/* Highlights */}
          <p className="text-white/50 text-[10px] uppercase tracking-[0.25em] font-sans font-bold mb-4">
            What to Expect
          </p>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: "🔬", text: "Present Your Research" },
              { icon: "🤝", text: "Network & Collaborate" },
              { icon: "📈", text: "Build Your Profile" },
            ].map((h) => (
              <div
                key={h.text}
                className="border border-white/15 rounded-lg p-5 text-center"
              >
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="text-white text-xs font-sans font-semibold leading-snug">
                  {h.text}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="border-t border-white/15 pt-6">
            <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-sans font-bold mb-3">
              Contact
            </p>
            <p className="text-white text-sm font-sans font-semibold mb-1">
              📞 +44 (0)7438 023912
            </p>
            <p className="text-white/60 text-xs font-sans">
              University of Wolverhampton · WV1 1LY
            </p>
          </div>
        </div>

        {/* Bottom gold bar */}
        <div
          className="px-10 py-4 text-center"
          style={{ backgroundColor: "hsl(42, 65%, 55%)" }}
        >
          <p className="text-sm font-sans font-bold text-black tracking-wide">
            REC 2026
          </p>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-sans font-bold mb-1">
      {label}
    </p>
    <p className="text-white text-sm font-sans font-semibold">{value}</p>
  </div>
);

export default Flyer;
