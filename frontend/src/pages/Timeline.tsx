import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Flame,
  Flower,
  Zap,
  Skull,
  ArrowUpRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Calendar,
  Wind,
  Mountain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Epoch = {
  id: string;
  name: string;
  period: string;
  mya: number; // million years ago
  summary: string;
  detail: string;
  events: string[];
  color: string;
  accent: string;
};

const EPOCHS: Epoch[] = [
  {
    id: "triassic",
    name: "Triassic Dawn",
    period: "Triassic",
    mya: 252,
    summary: "From the ash of the Great Dying, the first dinosaurs rise.",
    detail:
      "The Permian-Triassic extinction erased 96% of marine life. From the silence, small bipedal predators like Eoraptor emerged — the humble ancestors of an empire that would last 165 million years.",
    events: [
      "First true dinosaurs appear in South America",
      "Pangaea begins as a single supercontinent",
      "Archosaurs outcompete mammal-like reptiles",
    ],
    color: "from-amber-900/60 to-orange-950/80",
    accent: "amber",
  },
  {
    id: "jurassic",
    name: "Jurassic Bloom",
    period: "Jurassic",
    mya: 201,
    summary: "Forests explode upward, and giants inherit the earth.",
    detail:
      "Warm, humid climates turned Pangaea green. Sauropods — Brachiosaurus, Diplodocus, Apatosaurus — grew to unimaginable size, while Allosaurus and Stegosaurus shaped the first great predator-prey arms races.",
    events: [
      "Brachiosaurus reaches 22m tall",
      "Archaeopteryx takes the first feathered flight",
      "Pangaea splits into Laurasia and Gondwana",
    ],
    color: "from-emerald-900/60 to-green-950/80",
    accent: "emerald",
  },
  {
    id: "cretaceous",
    name: "Cretaceous Apex",
    period: "Cretaceous",
    mya: 145,
    summary: "Tyrants rule, flowers bloom, and diversity peaks.",
    detail:
      "The longest dinosaur epoch saw the rise of T. rex, Triceratops, and Spinosaurus. Flowering plants transformed ecosystems. Continental rifting created isolated worlds where evolution ran wild.",
    events: [
      "T. rex stalks Laramidia 66 MYA",
      "First flowering plants (angiosperms) spread",
      "Spinosaurus adapts to semi-aquatic life",
    ],
    color: "from-rose-900/60 to-red-950/80",
    accent: "rose",
  },
  {
    id: "impact",
    name: "The Impact",
    period: "K-Pg Boundary",
    mya: 66,
    summary: "A 10-km asteroid ends the Age of Dinosaurs in one day.",
    detail:
      "An asteroid struck the Yucatán at 72,000 km/h, releasing energy equivalent to 100 trillion tons of TNT. Global firestorms, a 1-km megatsunami, and an impact winter erased 75% of all species — including every non-avian dinosaur.",
    events: [
      "Chicxulub crater forms (180 km wide)",
      "Global temperature plummets 25°C",
      "75% of plant and animal species vanish",
    ],
    color: "from-orange-950/80 via-red-950/80 to-black",
    accent: "orange",
  },
  {
    id: "aftermath",
    name: "The Aftermath",
    period: "Paleogene",
    mya: 66,
    summary: "From the ashes, a new world rises.",
    detail:
      "In the dark, cold decades that followed, mammals — once small and nocturnal — inherited the vacant niches. Within 10 million years, whales took to the sea, primates took to the trees, and the path to humanity began.",
    events: [
      "Mammals diversify into 5,000+ species",
      "First primates appear within 100K years",
      "Birds — avian dinosaurs — survive and thrive",
    ],
    color: "from-sky-950/70 via-slate-950/80 to-black",
    accent: "sky",
  },
];

const TIMELINE_BAR_GRADIENT =
  "linear-gradient(to right, rgba(251,191,36,0.6), rgba(16,185,129,0.6), rgba(244,63,94,0.7), rgba(234,88,12,0.8), rgba(56,189,248,0.7))";

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1 within the active epoch
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Auto-advance epochs when playing
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setProgress((p) => {
        const next = p + delta / 6000; // 6s per epoch
        if (next >= 1) {
          setActiveIdx((idx) => (idx + 1) % EPOCHS.length);
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  const epoch = EPOCHS[activeIdx];

  // Overall timeline progress (across all epochs)
  const overallProgress = (activeIdx + progress) / EPOCHS.length;

  return (
    <main
      data-testid="timeline-page"
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50 overflow-x-hidden"
    >
      {/* ============ HEADER ============ */}
      <section
        aria-labelledby="timeline-heading"
        data-testid="timeline-hero-section"
        className="relative px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(244,63,94,0.12), transparent 55%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-amber-400/80 text-xs tracking-[0.3em] uppercase mb-4">
            The Prehistoric Timeline
          </p>
          <h1
            id="timeline-heading"
            className="font-serif text-4xl md:text-7xl font-bold bg-gradient-to-b from-white via-amber-100 to-amber-300/80 bg-clip-text text-transparent"
          >
            200 Million Years
          </h1>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Scroll or play through the rise and fall of the dinosaurs — from the first footprint to the final impact
            that reshaped the planet forever.
          </p>
        </div>
      </section>

      {/* ============ TIMELINE TRACK ============ */}
      <section
        aria-label="Timeline track"
        data-testid="timeline-track-section"
        className="relative max-w-6xl mx-auto px-6 pb-10"
      >
        {/* Bar */}
        <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{ background: TIMELINE_BAR_GRADIENT }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 bg-white/40 transition-[width] duration-100"
            style={{ width: `${overallProgress * 100}%` }}
          />
          {/* Epoch markers */}
          <div className="absolute inset-0 flex items-center">
            {EPOCHS.map((e, idx) => (
              <button
                key={e.id}
                onClick={() => goTo(idx)}
                aria-label={`Jump to ${e.name} (${e.mya} million years ago)`}
                aria-current={idx === activeIdx ? "true" : undefined}
                data-testid={`timeline-marker-${e.id}-button`}
                className="group relative -ml-1 first:ml-0 flex-1 flex justify-start"
              >
                <span
                  className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    idx === activeIdx
                      ? "bg-amber-400 border-white scale-125 shadow-[0_0_18px_rgba(251,191,36,0.6)]"
                      : idx < activeIdx
                      ? "bg-slate-400 border-slate-300"
                      : "bg-slate-800 border-slate-600 group-hover:border-amber-300/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        {/* Labels */}
        <div className="mt-3 flex">
          {EPOCHS.map((e, idx) => (
            <div
              key={e.id}
              className={`flex-1 text-left transition-colors duration-300 ${
                idx === activeIdx ? "text-amber-200" : "text-slate-500"
              }`}
            >
              <div className="text-[10px] uppercase tracking-widest">{e.period}</div>
              <div className="text-xs font-medium">{e.mya} MYA</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CINEMATIC STAGE ============ */}
      <section
        aria-labelledby="timeline-stage-heading"
        data-testid="timeline-stage-section"
        className={`relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-gradient-to-b ${epoch.color} transition-all duration-1000 overflow-hidden`}
      >
        <h2 id="timeline-stage-heading" className="sr-only">
          {epoch.name}
        </h2>

        {/* Atmospheric backdrop */}
        <EpochBackdrop epochId={epoch.id} progress={progress} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center w-full">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300/90">
              <Calendar aria-hidden="true" className="w-4 h-4" />
              {epoch.mya} Million Years Ago
            </div>
            <h3 className="mt-3 font-serif text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              {epoch.name}
            </h3>
            <p className="mt-4 text-amber-100/80 italic text-lg">{epoch.summary}</p>
            <p className="mt-5 text-slate-200/90 leading-relaxed">{epoch.detail}</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              {epoch.events.map((ev) => (
                <li key={ev} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                  {ev}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-white/5 border-white/15 text-slate-100">
                <Sparkles aria-hidden="true" className="w-3 h-3 mr-1 text-amber-300" />
                Period · {epoch.period}
              </Badge>
              <Badge variant="outline" className="bg-white/5 border-white/15 text-slate-100">
                <Zap aria-hidden="true" className="w-3 h-3 mr-1 text-amber-300" />
                {EPOCHS.length} Epochs Total
              </Badge>
            </div>
          </div>

          {/* Cinematic scene card */}
          <div
            data-testid={`timeline-scene-card-${epoch.id}`}
            className="relative h-72 md:h-96 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <EpochScene epochId={epoch.id} progress={progress} />

            {/* Live progress within epoch */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                aria-hidden="true"
                className="h-full bg-amber-400 transition-[width] duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-amber-300/80 font-mono">
              Scene {activeIdx + 1} / {EPOCHS.length}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PLAYER CONTROLS ============ */}
      <section
        aria-label="Timeline controls"
        data-testid="timeline-controls-section"
        className="sticky bottom-0 z-40 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 py-4"
      >
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous epoch"
            data-testid="timeline-prev-button"
            onClick={() => goTo((activeIdx - 1 + EPOCHS.length) % EPOCHS.length)}
            className="text-slate-300 hover:text-amber-200 hover:bg-white/5"
          >
            <SkipBack aria-hidden="true" className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            aria-label={playing ? "Pause timeline" : "Play timeline"}
            data-testid="timeline-play-button"
            onClick={() => setPlaying((p) => !p)}
            className="px-5 py-5 rounded-full bg-amber-500/15 border-amber-400/40 text-amber-100 hover:bg-amber-500/25 hover:scale-105 transition-all"
          >
            {playing ? (
              <Pause aria-hidden="true" className="w-5 h-5" />
            ) : (
              <Play aria-hidden="true" className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next epoch"
            data-testid="timeline-next-button"
            onClick={() => goTo((activeIdx + 1) % EPOCHS.length)}
            className="text-slate-300 hover:text-amber-200 hover:bg-white/5"
          >
            <SkipForward aria-hidden="true" className="w-5 h-5" />
          </Button>
          <div
            aria-live="polite"
            className="ml-4 text-xs text-slate-400 font-mono hidden sm:block"
          >
            {playing ? "▶ Playing" : "⏸ Paused"} · {Math.round(progress * 100)}%
          </div>
        </div>
      </section>

      {/* ============ FINALE ============ */}
      <section
        aria-labelledby="timeline-finale-heading"
        data-testid="timeline-finale-section"
        className="relative py-28 md:py-36 text-center px-6 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.15), transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <Skull aria-hidden="true" className="w-10 h-10 text-amber-400 mx-auto mb-6" />
          <h2
            id="timeline-finale-heading"
            className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-amber-200/70 bg-clip-text text-transparent"
          >
            Every World Has A Story
          </h2>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed">
            For 165 million years, giants walked this planet. They are gone — but their bones remember. Walk among them
            once more in the dinosaur sanctuary.
          </p>
          <Button
            asChild
            size="lg"
            data-testid="timeline-explore-dinosaurs-button"
            className="mt-10 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold px-8 py-6 rounded-xl shadow-lg shadow-amber-900/40 transition-all duration-300 hover:scale-[1.04]"
          >
            <Link to="/dinosaurs" className="flex items-center gap-2">
              Walk Among The Giants
              <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function EpochBackdrop({ epochId, progress }: { epochId: string; progress: number }) {
  // A drifting atmospheric layer per epoch
  const offsetX = progress * 60 - 30;
  if (epochId === "impact") {
    return (
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(251,146,60,0.6), transparent 40%), radial-gradient(circle at 20% 80%, rgba(220,38,38,0.4), transparent 50%)",
          }}
        />
        {/* Asteroid streak */}
        <div
          className="absolute top-0 right-1/3 w-2 h-40 bg-gradient-to-b from-amber-200 via-orange-400 to-transparent rounded-full blur-[2px] rotate-[20deg]"
          style={{ transform: `translateY(${progress * 60}vh) rotate(20deg)` }}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-70"
      style={{
        background: `radial-gradient(ellipse at ${50 + offsetX}% 50%, rgba(255,255,255,0.10), transparent 55%)`,
      }}
    />
  );
}

function EpochScene({ epochId, progress }: { epochId: string; progress: number }) {
  if (epochId === "triassic") {
    // Small bipedal dinosaur + volcanic horizon
    return (
      <div aria-hidden="true" className="relative w-full h-full bg-gradient-to-b from-amber-900/40 to-black">
        <Mountain className="absolute bottom-0 left-0 right-0 w-full h-1/2 text-amber-950/60" />
        <Flame className="absolute bottom-1/3 right-1/4 w-12 h-12 text-orange-500/70 animate-pulse" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-12">
          <div className="absolute bottom-0 left-[20%] w-[50%] h-[55%] rounded-[50%_50%_40%_60%] bg-amber-950" />
          <div className="absolute bottom-[50%] left-[60%] w-[28%] h-[24%] rounded-[60%_40%_30%_70%] bg-amber-950 rotate-[-8deg]" />
          <div className="absolute bottom-0 left-[35%] w-[8%] h-[40%] bg-amber-950" />
          <div className="absolute bottom-[30%] left-[10%] w-[40%] h-[12%] rounded-l-full bg-amber-950 rotate-[-10deg]" />
        </div>
        <div className="absolute top-4 left-4 text-[10px] font-mono text-amber-300/70">EORAPTOR · 230 MM ANCESTOR</div>
      </div>
    );
  }
  if (epochId === "jurassic") {
    return (
      <div aria-hidden="true" className="relative w-full h-full bg-gradient-to-b from-emerald-900/40 to-black">
        {[15, 40, 65, 85].map((l) => (
          <div key={l} className="absolute bottom-0" style={{ left: `${l}%` }}>
            <div className="w-1.5 h-24 bg-emerald-950" />
            <div className="absolute bottom-20 -left-4 w-16 h-16 rounded-full bg-emerald-800/70" />
          </div>
        ))}
        {/* Brachiosaurus */}
        <div className="absolute bottom-4 right-8 w-40 h-52">
          <div className="absolute bottom-[8%] left-[15%] w-[55%] h-[30%] rounded-[50%_50%_40%_60%/70%_70%_40%_30%] bg-emerald-950" />
          <div className="absolute bottom-[30%] left-[48%] w-[8%] h-[60%] bg-emerald-950 rotate-[18deg] origin-bottom rounded-t-full" />
          <div className="absolute bottom-[88%] left-[54%] w-[12%] h-[10%] rounded-full bg-emerald-950" />
          <div className="absolute bottom-0 left-[22%] w-[6%] h-[14%] bg-emerald-950" />
          <div className="absolute bottom-0 left-[50%] w-[8%] h-[18%] bg-emerald-950" />
        </div>
        <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-300/70">BRACHIOSAURUS · 22M TALL</div>
      </div>
    );
  }
  if (epochId === "cretaceous") {
    return (
      <div aria-hidden="true" className="relative w-full h-full bg-gradient-to-b from-rose-900/40 to-black">
        <Flower className="absolute bottom-2 left-4 w-8 h-8 text-rose-400/70" />
        <Flower className="absolute bottom-3 left-12 w-6 h-6 text-amber-400/70" />
        <Flower className="absolute bottom-2 right-8 w-7 h-7 text-rose-300/70" />
        {/* T-Rex */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-32">
          <div className="absolute bottom-[15%] left-[18%] w-[55%] h-[45%] rounded-[45%_55%_40%_60%/60%_50%_50%_40%] bg-rose-950" />
          <div className="absolute bottom-[48%] left-[60%] w-[26%] h-[22%] rounded-[60%_40%_30%_70%/70%_60%_50%_40%] bg-rose-950 rotate-[-8deg]" />
          <div className="absolute bottom-[42%] left-[64%] w-[22%] h-[8%] rounded-b-[40%] bg-black/90" />
          <div className="absolute bottom-[28%] left-0 w-[28%] h-[10%] rounded-l-full bg-rose-950 rotate-[12deg]" />
          <div className="absolute bottom-0 left-[30%] w-[8%] h-[28%] bg-rose-950 rounded-t" />
          <div className="absolute bottom-0 left-[48%] w-[10%] h-[34%] bg-rose-950 rounded-t-lg" />
        </div>
        <div className="absolute top-4 left-4 text-[10px] font-mono text-rose-300/70">T. REX · 12M LONG</div>
      </div>
    );
  }
  if (epochId === "impact") {
    return (
      <div aria-hidden="true" className="relative w-full h-full bg-gradient-to-b from-orange-950 to-black">
        {/* Asteroid descending */}
        <div
          className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-600 shadow-[0_0_40px_rgba(251,146,60,0.8)]"
          style={{
            top: `${progress * 50}%`,
            right: `${30 - progress * 10}%`,
            transform: `scale(${1 + progress * 0.6})`,
          }}
        />
        {/* Fire trail */}
        <div
          className="absolute w-3 h-24 bg-gradient-to-t from-amber-400 to-transparent blur-[2px] rotate-[20deg]"
          style={{ top: `${progress * 50 - 20}%`, right: `${28 - progress * 10}%` }}
        />
        {/* Shockwave */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-400/40"
          style={{ width: `${progress * 80}%`, height: `${progress * 80}%` }}
        />
        <Zap className="absolute bottom-1/3 left-1/4 w-12 h-12 text-amber-300/70 animate-pulse" />
        <div className="absolute top-4 left-4 text-[10px] font-mono text-orange-300/70">CHICXULUB IMPACTOR · 10KM WIDE</div>
      </div>
    );
  }
  // aftermath
  return (
    <div aria-hidden="true" className="relative w-full h-full bg-gradient-to-b from-sky-950/60 to-black">
      <Wind className="absolute top-1/3 right-8 w-12 h-12 text-sky-300/50" />
      {/* Dawn */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/3 bg-gradient-to-t from-amber-300/30 to-transparent" />
      {/* Small mammal silhouette */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-8">
        <div className="absolute bottom-0 left-[20%] w-[50%] h-[70%] rounded-full bg-sky-950" />
        <div className="absolute bottom-[60%] left-[55%] w-[25%] h-[25%] rounded-full bg-sky-950" />
        <div className="absolute bottom-0 left-[20%] w-[10%] h-[30%] bg-sky-950" />
        <div className="absolute bottom-0 left-[55%] w-[10%] h-[30%] bg-sky-950" />
      </div>
      <div className="absolute top-4 left-4 text-[10px] font-mono text-sky-300/70">EARLY MAMMAL · THE NEW DAWN</div>
    </div>
  );
}
