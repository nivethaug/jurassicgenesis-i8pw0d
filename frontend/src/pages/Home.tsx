import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Play, Mountain, Droplets, Flame, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

type Ecosystem = {
  id: string;
  name: string;
  era: string;
  icon: "jungle" | "volcano" | "swamp" | "coast";
  description: string;
  temperature: string;
  species: number;
  accent: string;
};

const ECOSYSTEMS: Ecosystem[] = [
  {
    id: "ancient-jungle",
    name: "Ancient Jungle",
    era: "Late Jurassic · 150 MYA",
    icon: "jungle",
    description:
      "Dense canopy forests tower over fern-covered floors. Massive sauropods strip foliage from treetops while predators stalk in the undergrowth.",
    temperature: "32°C",
    species: 248,
    accent: "from-emerald-500/30 to-green-900/60",
  },
  {
    id: "volcanic-lands",
    name: "Volcanic Lands",
    era: "Early Cretaceous · 120 MYA",
    icon: "volcano",
    description:
      "Rivers of molten lava carve through obsidian plains. Ash-choked skies shelter armored creatures adapted to extreme heat and sulfur.",
    temperature: "58°C",
    species: 132,
    accent: "from-orange-500/30 to-red-950/70",
  },
  {
    id: "swamp-region",
    name: "Swamp Region",
    era: "Late Cretaceous · 75 MYA",
    icon: "swamp",
    description:
      "Misty wetlands stretch to the horizon. Crocodilian giants and Spinosaurus hunt in murky waters beneath hanging moss.",
    temperature: "29°C",
    species: 184,
    accent: "from-teal-500/30 to-slate-900/70",
  },
  {
    id: "coastal-cliffs",
    name: "Coastal Cliffs",
    era: "Late Cretaceous · 68 MYA",
    icon: "coast",
    description:
      "Towering sea cliffs face an endless prehistoric ocean. Pterosaurs ride thermals above crashing waves while hadrosaurs graze cliffside.",
    temperature: "21°C",
    species: 96,
    accent: "from-sky-500/30 to-indigo-950/70",
  },
];

const ICON_MAP = {
  jungle: Mountain,
  volcano: Flame,
  swamp: Droplets,
  coast: Wind,
} as const;

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [vibration, setVibration] = useState(false);
  const [activeEra, setActiveEra] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ground vibration pulse for T-Rex emergence
  useEffect(() => {
    const interval = setInterval(() => {
      setVibration(true);
      const t = setTimeout(() => setVibration(false), 420);
      return () => clearTimeout(t);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle eras in the breach log
  useEffect(() => {
    const i = setInterval(() => setActiveEra((e) => (e + 1) % 4), 3200);
    return () => clearInterval(i);
  }, []);

  const mistOffset = (scrollY * 0.04) % 100;

  return (
    <main
      ref={heroRef}
      data-testid="home-page"
      className="relative w-full bg-slate-950 text-slate-50 overflow-x-hidden"
    >
      {/* ============ SECTION 1 — THE TIME BREACH ============ */}
      <section
        aria-label="The Time Breach"
        data-testid="home-hero-section"
        className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${
          vibration ? "animate-pulse" : ""
        }`}
      >
        {/* Atmospheric layers */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-slate-950 to-slate-950 transition-transform duration-300"
          style={{ transform: `translateY(${scrollY * 0.18}px)` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 78%, rgba(251,191,36,0.22), transparent 55%), radial-gradient(ellipse at 20% 30%, rgba(16,185,129,0.12), transparent 60%)",
          }}
        />
        {/* Moving fog */}
        <div
          aria-hidden="true"
          data-testid="home-fog-layer"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent blur-2xl"
          style={{ transform: `translateX(${mistOffset - 50}px)` }}
        />
        {/* Sun rays */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] opacity-40"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(251,191,36,0.18) 12deg, transparent 24deg, rgba(251,191,36,0.14) 36deg, transparent 48deg)",
          }}
        />

        {/* Cinematic T-Rex silhouette (CSS-built) */}
        <div
          aria-hidden="true"
          data-testid="home-trex-figure"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(80vw,820px)] aspect-[16/9] pointer-events-none"
          style={{ transform: `translate(-50%, ${scrollY * 0.08}px)` }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 aspect-[3/2]">
            {/* Body */}
            <div className="absolute bottom-[20%] left-[18%] w-[55%] h-[45%] rounded-[45%_55%_40%_60%/60%_50%_50%_40%] bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-2xl shadow-black/80" />
            {/* Head */}
            <div className="absolute bottom-[48%] left-[60%] w-[26%] h-[22%] rounded-[60%_40%_30%_70%/70%_60%_50%_40%] bg-gradient-to-br from-slate-800 to-black rotate-[-8deg]" />
            {/* Jaw */}
            <div className="absolute bottom-[42%] left-[64%] w-[22%] h-[8%] rounded-b-[40%] bg-black/90" />
            {/* Tail */}
            <div className="absolute bottom-[28%] left-[0%] w-[28%] h-[10%] rounded-l-full bg-gradient-to-l from-slate-900 to-black rotate-[12deg]" />
            {/* Legs */}
            <div className="absolute bottom-0 left-[30%] w-[8%] h-[28%] bg-gradient-to-b from-slate-800 to-black rounded-t-md" />
            <div className="absolute bottom-0 left-[48%] w-[10%] h-[34%] bg-gradient-to-b from-slate-800 to-black rounded-t-lg" />
            {/* Tiny arm */}
            <div className="absolute bottom-[42%] left-[52%] w-[5%] h-[6%] bg-black rounded-sm" />
          </div>
        </div>

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 220px 60px rgba(0,0,0,0.9)" }}
        />

        {/* Headline + CTAs */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-amber-300 backdrop-blur-md">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
            200 Million Years · Reopened
          </div>
          <h1
            className="mt-6 font-serif text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight bg-gradient-to-b from-white via-amber-50 to-amber-200/80 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            style={{ textShadow: "0 4px 40px rgba(251,191,36,0.18)" }}
          >
            Before Humanity,
            <br />
            There Were Giants
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-slate-300/90 leading-relaxed">
            Step through the Time Breach into a living prehistoric planet — where towering predators, mist-draped jungles,
            and apocalyptic extinction events unfold before your eyes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button
              asChild
              size="lg"
              data-testid="home-enter-world-button"
              className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-amber-900/40 transition-all duration-300 hover:scale-[1.04] hover:shadow-amber-500/30"
            >
              <Link to="/ecosystems" className="flex items-center gap-2">
                <Play aria-hidden="true" className="w-5 h-5" />
                Enter The World
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              data-testid="home-begin-expedition-button"
              className="border-amber-400/40 bg-white/5 text-slate-100 hover:bg-white/10 backdrop-blur-md px-8 py-6 rounded-xl transition-all duration-300 hover:scale-[1.04]"
            >
              <Link to="/dinosaurs" className="flex items-center gap-2">
                Begin Expedition
                <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Era log ticker */}
          <div
            aria-live="polite"
            className="mt-14 flex flex-wrap items-center justify-center gap-3 text-xs font-mono uppercase tracking-widest text-slate-400"
            data-testid="home-era-ticker"
          >
            {ECOSYSTEMS.map((eco, idx) => (
              <span
                key={eco.id}
                className={`px-3 py-1.5 rounded-full border transition-all duration-500 ${
                  idx === activeEra
                    ? "border-amber-400/60 bg-amber-500/15 text-amber-200 shadow-[0_0_24px_rgba(251,191,36,0.25)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {eco.era.split("·")[0].trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to breach time</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-400/80 to-transparent" />
        </div>
      </section>

      {/* ============ SECTION 2 — LOST ECOSYSTEMS ============ */}
      <section
        aria-labelledby="ecosystems-heading"
        data-testid="home-ecosystems-section"
        className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-amber-400/80 text-xs tracking-[0.3em] uppercase mb-4">Section II — Living Worlds</p>
            <h2
              id="ecosystems-heading"
              className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
            >
              Lost Ecosystems
            </h2>
            <p className="mt-5 text-slate-400 text-lg leading-relaxed">
              The camera drifts through four primordial biomes. Each is populated by creatures, weather, and stories
              preserved in stone for 66 million years.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="home-ecosystem-grid">
            {ECOSYSTEMS.map((eco) => {
              const Icon = ICON_MAP[eco.icon];
              return (
                <article
                  key={eco.id}
                  data-testid={`home-ecosystem-card-${eco.id}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-8 transition-all duration-500 hover:scale-[1.02] hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-900/20"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br ${eco.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-300/80">
                          <Icon aria-hidden="true" className="w-4 h-4" />
                          {eco.era}
                        </span>
                        <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-white">{eco.name}</h3>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-3xl font-bold text-amber-300">{eco.species}</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400">Species</span>
                      </div>
                    </div>
                    <p className="mt-5 text-slate-300/80 leading-relaxed">{eco.description}</p>
                    <div className="mt-6 flex items-center justify-between pt-5 border-t border-white/10">
                      <span className="text-sm text-slate-400">
                        Mean Temp · <span className="text-white font-medium">{eco.temperature}</span>
                      </span>
                      <Link
                        to="/ecosystems"
                        data-testid={`home-explore-${eco.id}-link`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
                      >
                        Explore biome
                        <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURE STRIP — THE TITANS ============ */}
      <section
        aria-labelledby="titans-heading"
        data-testid="home-titans-section"
        className="relative py-24 md:py-32 bg-black overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(251,191,36,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.12), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-400/80 text-xs tracking-[0.3em] uppercase mb-4">Section IV — Scale Beyond Imagination</p>
            <h2
              id="titans-heading"
              className="font-serif text-4xl md:text-6xl font-bold text-white"
            >
              The Titans
            </h2>
            <p className="mt-5 text-slate-400 text-lg leading-relaxed">
              A lone Brachiosaurus stretches 22 meters into the canopy. Migrating herds thunder across the valley. Above,
              pterosaurs cast shadows the size of gliders. Stand beneath them and feel impossibly small.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <div className="text-4xl font-bold text-amber-300">22m</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Height</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-300">56t</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Mass</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-300">150M</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Years Ago</div>
              </div>
            </div>
            <Button
              asChild
              className="mt-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-5 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.03]"
            >
              <Link to="/dinosaurs" className="flex items-center gap-2">
                Meet the Titans
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Brachiosaurus silhouette */}
          <div className="relative h-80 md:h-96 flex items-end justify-center">
            <div aria-hidden="true" className="relative w-full h-full">
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/30 to-transparent" />
              {/* Body */}
              <div className="absolute bottom-[15%] left-[10%] w-[55%] h-[35%] rounded-[50%_50%_40%_60%/70%_70%_40%_30%] bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl" />
              {/* Neck */}
              <div className="absolute bottom-[42%] left-[48%] w-[8%] h-[45%] bg-gradient-to-t from-slate-800 to-slate-700 rotate-[18deg] origin-bottom rounded-t-full" />
              {/* Head */}
              <div className="absolute bottom-[85%] left-[54%] w-[12%] h-[10%] rounded-full bg-slate-700" />
              {/* Legs */}
              <div className="absolute bottom-0 left-[18%] w-[6%] h-[18%] bg-slate-800 rounded-t" />
              <div className="absolute bottom-0 left-[50%] w-[8%] h-[22%] bg-slate-800 rounded-t" />
              <div className="absolute bottom-0 left-[58%] w-[6%] h-[16%] bg-slate-900 rounded-t" />
              {/* Tail */}
              <div className="absolute bottom-[18%] left-0 w-[14%] h-[5%] bg-gradient-to-l from-slate-800 to-transparent rounded-l-full rotate-[-6deg]" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL — EVERY WORLD HAS A STORY ============ */}
      <section
        aria-labelledby="finale-heading"
        data-testid="home-finale-section"
        className="relative py-32 md:py-40 bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden text-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.15), transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <Sparkles aria-hidden="true" className="w-8 h-8 text-amber-400 mx-auto mb-6" />
          <h2
            id="finale-heading"
            className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-amber-200/70 bg-clip-text text-transparent"
          >
            Every World Has A Story
          </h2>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            The asteroid fell. The skies darkened. From the ashes, a new planet was born. Trace Earth's deepest timeline —
            from the first giant to the final breath.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              data-testid="home-explore-past-button"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold px-8 py-6 rounded-xl shadow-lg shadow-amber-900/40 transition-all duration-300 hover:scale-[1.04]"
            >
              <Link to="/timeline" className="flex items-center gap-2">
                Explore Earth's Past
                <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-20 text-xs text-slate-600 tracking-widest uppercase">
            JurassicGenesis · A Cinematic Prehistoric Experience
          </p>
        </div>
      </section>
    </main>
  );
}
