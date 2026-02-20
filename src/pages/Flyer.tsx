import { useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

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
    <div className="py-12 flex flex-col items-center gap-6">
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-body font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" /> Download Flyer
      </button>

      {/* Flyer canvas */}
      <div
        ref={flyerRef}
        className="relative w-[640px] min-h-[900px] overflow-hidden text-white"
        style={{
          fontFamily: "'Merriweather', Georgia, serif",
        }}
      >
        {/* Background */}
        <img
          src={campusHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,12%)/0.88] via-[hsl(215,20%,18%)/0.92] to-[hsl(220,15%,10%)/0.95]" />

        {/* Content */}
        <div className="relative z-10 px-12 py-14 flex flex-col h-full">
          {/* Top badge */}
          <div className="text-xs tracking-[0.25em] uppercase text-white/60 font-sans mb-8">
            Department of Computing &amp; Mathematical Sciences
          </div>

          {/* Big title */}
          <h1 className="text-5xl font-bold leading-[1.15] mb-2">
            Research and
            <br />
            Employability
            <br />
            <span className="text-[hsl(42,65%,55%)]">Corner</span>
          </h1>

          <div className="flex items-center gap-3 mt-4 mb-8">
            <span className="bg-[hsl(42,65%,55%)] text-black font-bold text-lg px-4 py-1 rounded font-sans">
              REC 2026
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[hsl(42,65%,75%)] text-lg font-semibold italic mb-10">
            Research-Driven · Industry-Ready · Career-Focused
          </p>

          {/* Details grid */}
          <div className="space-y-5 mb-10">
            <DetailRow emoji="📅" label="Date" value="April 21, 2026" />
            <DetailRow emoji="📍" label="Venue" value="City Campus, University of Wolverhampton" />
            <DetailRow emoji="🕐" label="Duration" value="3-Hour Interactive Session" />
            <DetailRow emoji="🎓" label="Open To" value="All Students — UG, PG & Recent Graduates" />
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { icon: "🔬", text: "Present Your Research" },
              { icon: "🤝", text: "Network & Collaborate" },
              { icon: "📈", text: "Build Your Profile" },
            ].map((h) => (
              <div
                key={h.text}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-4 text-center"
              >
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="text-xs font-sans font-semibold leading-tight">{h.text}</div>
              </div>
            ))}
          </div>

          {/* Bottom contact */}
          <div className="mt-auto pt-6 border-t border-white/15">
            <p className="text-white/50 text-xs font-sans mb-1">For enquiries</p>
            <p className="text-sm font-sans font-semibold">
              📞 +44 (0)7438 023912
            </p>
            <p className="text-[hsl(42,65%,55%)] text-xs font-sans mt-3 tracking-wide uppercase font-bold">
              University of Wolverhampton · WV1 1LY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ emoji, label, value }: { emoji: string; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <span className="text-xl">{emoji}</span>
    <div>
      <div className="text-white/50 text-[10px] uppercase tracking-widest font-sans">{label}</div>
      <div className="text-white text-sm font-sans font-semibold">{value}</div>
    </div>
  </div>
);

export default Flyer;
