import { useEffect, useRef, useState } from "react";
import { Mountain, Flame, Droplets, Wind, Thermometer, Trees, Bird, Waves, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BiomeId = "jungle" | "volcano" | "swamp" | "coast";

type Species = {
  name: string;
  role: string;
};

type Biome = {
  id: BiomeId;
  name: string;
  era: string;
  tagline: string;
  description: string;
  temperature: string;
  humidity: string;
  elevation: string;
  flora: string;
  dominant: string;
  accent: string;
  species: Species[];
};

const BIOMES: Biome[] = [
  {
    id: "jungle",
    name: "Ancient Jungle",
    era: "Late Jurassic · 150 MYA",
    tagline: "Where the canopy touches the sky",
    description:
      "Dawn light cuts through 40-meter conifers and ginkgoes. Herds of Stegosaurus move through fern meadows while Compsognathus dart between roots. Above, Archaeopteryx leap between branches — the first birds testing their wings.",
    temperature: "32°C",
    humidity: "88%",
    elevation: "0–400 m",
    flora: "Conifers, cycads, ginkgoes, ferns",
    dominant: "Diplodocus herds",
    accent: "from-emerald-900/80 via-green-950/90 to-black",
    species: [
      { name: "Stegosaurus", role: "Low browser" },
      { name: "Diplodocus", role: "Canopy browser" },
      { name: "Allosaurus", role: "Apex predator" },
      { name: "Archaeopteryx", role: "Early avian" },
      { name: "Compsognathus", role: "Insectivore" },
    ],
  },
  {
    id: "volcano",
    name: "Volcanic Lands",
    era: "Early Cretaceous · 120 MYA",
    tagline: "Life forged in fire",
    description:
      "Black basalt plains stretch beneath a sky choked with ash. Lava rivers glow orange in the twilight. Armored Ankylosaurus graze on hardened lava flows where pioneer ferns have taken root, while Carnotaurus patrol the smoldering ridges.",
    temperature: "58°C",
    humidity: "22%",
    elevation: "800–2,400 m",
    flora: "Pioneer ferns, horsetails, charred cycads",
    dominant: "Carnotaurus pairs",
    accent: "from-red-950/90 via-orange-950/85 to-black",
    species: [
      { name: "Ankylosaurus", role: "Armored grazer" },
      { name: "Carnotaurus", role: "Ambush hunter" },
      { name: "Iguanodon", role: "Generalist herbivore" },
      { name: "Pteranodon", role: "Aerial scavenger" },
      { name: "Polacanthus", role: "Spiked defender" },
    ],
  },
  {
    id: "swamp",
    name: "Swamp Region",
    era: "Late Cretaceous · 75 MYA",
    tagline: "Mist over still waters",
    description:
      "A labyrinth of black water, hanging moss, and rotting logs. Spinosaurus slide through chest-deep channels, while Deinosuchus — 12-meter crocodilians — wait motionless at the banks. The air smells of sulfur and wet earth.",
    temperature: "29°C",
    humidity: "94%",
    elevation: "0–80 m",
    flora: "Mangroves, bald cypress, sphagnum moss",
    dominant: "Spinosaurus pods",
    accent: "from-teal-950/85 via-slate-950/90 to-black",
    species: [
      { name: "Spinosaurus", role: "Aquatic hunter" },
      { name: "Deinosuchus", role: "Ambush reptile" },
      { name: "Parasaurolophus", role: "Marsh browser" },
      { name: "Baryonyx", role: "Fish specialist" },
      { name: "Sarcosuchus", role: "Giant crocodilian" },
    ],
  },
  {
    id: "coast",
    name: "Coastal Cliffs",
    era: "Late Cretaceous · 68 MYA",
    tagline: "Where the land ends and the deep begins",
    description:
      "White chalk cliffs rise 90 meters above an inland sea. Pterosaurs ride thermals in spiraling columns, while Edmontosaurus herds graze the cliff-top meadows. Below, mosasaurs breach the surface in pursuit of ammonites.",
    temperature: "21°C",
    humidity: "64%",
    elevation: "0–120 m",
    flora: "Coastal grasses, flowering shrubs, palms",
    dominant: "Pteranodon colonies",
    accent: "from-sky-950/85 via-indigo-950/90 to-black",
    species: [
      { name: "Pteranodon", role: "Soaring fisher" },
      { name: "Mosasaurus", role: "Marine apex" },
      { name: "Edmontosaurus", role: "Cliff grazer" },
      { name: "Tylosaurus", role: "Deep predator" },
      { name: "Hesperornis", role: "Flightless diver" },
    ],
  },
];

const ICONS: Record<BiomeId, typeof Mountain> = {
  jungle: Mountain,
  volcano: Flame,
  swamp: Droplets,
  coast: Wind,
};

export default function Ecosystems() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<BiomeId>("jungle");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);

      // Determine active biome by midpoint of viewport
      const mid = window.innerHeight / 2;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          setActive(BIOMES[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBiome = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main
      data-testid="ecosystems-page"
      className="relative w-full bg-black text-slate-50"
    >
      {/* Sticky progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-150"
          style={{ width: `${Math.min(100, scrollProgress * 100)}%` }}
        />
      </div>

      {/* Hero */}
      <section
        aria-labelledby="ecosystems-hero-heading"
        data-testid="ecosystems-hero-section"
        className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(251,191,36,0.18), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.15), transparent 55%), linear-gradient(to bottom, #020617, #000)",
          }}
        />
        {/* Flying pterosaur silhouette */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-0 right-0 h-32 pointer-events-none"
          style={{ transform: `translateX(${(scrollProgress * 200 - 40)}vw)` }}
        >
          <svg viewBox="0 0 200 60" className="w-full h-full opacity-60">
            <path d="M10,30 Q40,5 80,25 Q100,30 120,25 Q160,5 190,30 L120,40 Q100,42 80,40 Z" fill="#1e293b" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl">
          <p className="text-amber-400/80 text-xs tracking-[0.3em] uppercase mb-4">Section II — Living Worlds</p>
          <h1
            id="ecosystems-hero-heading"
            className="font-serif text-4xl md:text-7xl font-bold bg-gradient-to-b from-white to-amber-200/70 bg-clip-text text-transparent"
          >
            Lost Ecosystems
          </h1>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Descend through four primordial biomes. Each is a complete living world — weather, predators, prey, and the
            subtle environmental cues that shaped 165 million years of evolution.
          </p>
          <div className="mt-10 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <ArrowDown aria-hidden="true" className="w-4 h-4 animate-bounce" />
            Scroll to enter the wilds
          </div>
        </div>
      </section>

      {/* Sticky biome nav (desktop) */}
      <nav
        aria-label="Biome navigation"
        className="sticky top-0 z-40 hidden md:flex items-center justify-center gap-2 py-3 bg-slate-950/80 backdrop-blur-xl border-y border-white/5"
      >
        {BIOMES.map((b, idx) => {
          const Icon = ICONS[b.id];
          const isActive = active === b.id;
          return (
            <Button
              key={b.id}
              variant="ghost"
              onClick={() => scrollToBiome(idx)}
              aria-label={`Navigate to ${b.name}`}
              data-testid={`ecosystems-nav-${b.id}-button`}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-amber-500/15 text-amber-200 border border-amber-400/40"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon aria-hidden="true" className="w-4 h-4" />
                {b.name}
              </span>
            </Button>
          );
        })}
      </nav>

      {/* Biome sections */}
      {BIOMES.map((biome, idx) => {
        const Icon = ICONS[biome.id];
        return (
          <section
            key={biome.id}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            aria-labelledby={`biome-${biome.id}-heading`}
            data-testid={`ecosystems-biome-${biome.id}`}
            className={`relative min-h-screen flex items-center py-24 md:py-32 px-6 bg-gradient-to-b ${biome.accent} overflow-hidden`}
          >
            {/* Atmospheric layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at ${idx % 2 === 0 ? "20%" : "80%"} 30%, rgba(255,255,255,0.08), transparent 55%)`,
              }}
            />
            {/* Particles */}
            <Particles biome={biome.id} />

            <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
              {/* Visual */}
              <div
                className={`order-2 ${idx % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                data-testid={`ecosystems-scene-${biome.id}`}
              >
                <BiomeScene biome={biome.id} />
              </div>

              {/* Content */}
              <div className={`order-1 ${idx % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300/80">
                  <Icon aria-hidden="true" className="w-4 h-4" />
                  {biome.era}
                </div>
                <h2
                  id={`biome-${biome.id}-heading`}
                  className="mt-4 font-serif text-4xl md:text-6xl font-bold text-white"
                >
                  {biome.name}
                </h2>
                <p className="mt-3 text-amber-200/80 italic text-lg">{biome.tagline}</p>
                <p className="mt-5 text-slate-300 leading-relaxed">{biome.description}</p>

                {/* Environment stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <EnvStat icon={<Thermometer className="w-3.5 h-3.5" />} label="Temperature" value={biome.temperature} />
                  <EnvStat icon={<Droplets className="w-3.5 h-3.5" />} label="Humidity" value={biome.humidity} />
                  <EnvStat icon={<Mountain className="w-3.5 h-3.5" />} label="Elevation" value={biome.elevation} />
                  <EnvStat icon={<Trees className="w-3.5 h-3.5" />} label="Flora" value={biome.flora} />
                  <EnvStat icon={<Bird className="w-3.5 h-3.5" />} label="Dominant" value={biome.dominant} />
                  <EnvStat icon={<Waves className="w-3.5 h-3.5" />} label="Species" value={`${biome.species.length}`} />
                </div>
              </div>
            </div>

            {/* Floating species cards */}
            <div
              aria-live="polite"
              className="relative z-10 mt-12 max-w-7xl mx-auto w-full"
            >
              <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-3">Wildlife in this biome</p>
              <div className="flex flex-wrap gap-2">
                {biome.species.map((s, i) => (
                  <Badge
                    key={s.name}
                    variant="outline"
                    className="px-3 py-1.5 bg-white/5 border-white/10 text-slate-200 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-amber-400/40 hover:bg-amber-500/10"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-slate-500 ml-2">{s.role}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Finale */}
      <section
        aria-labelledby="ecosystems-finale-heading"
        data-testid="ecosystems-finale-section"
        className="relative py-24 bg-black text-center px-6"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.12), transparent 60%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <h2 id="ecosystems-finale-heading" className="font-serif text-3xl md:text-5xl font-bold text-white">
            Four worlds. One planet.
          </h2>
          <p className="mt-4 text-slate-400">
            Each biome was a closed loop of climate, geography, and life — preserved today only as stone, bone, and
            shadow. Walk further to meet the creatures that ruled them.
          </p>
        </div>
      </section>
    </main>
  );
}

function EnvStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-400">
        <span aria-hidden="true">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white truncate">{value}</div>
    </div>
  );
}

function Particles({ biome }: { biome: BiomeId }) {
  // Reduced particle count for performance
  const count = 14;
  const config: Record<BiomeId, { hue: string; className: string }> = {
    jungle: { hue: "bg-emerald-300", className: "animate-pulse" },
    volcano: { hue: "bg-orange-400", className: "animate-ping" },
    swamp: { hue: "bg-teal-200", className: "animate-pulse" },
    coast: { hue: "bg-sky-200", className: "animate-pulse" },
  };
  const c = config[biome];
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 73) % 100;
        const top = (i * 41) % 100;
        const size = 1.5 + ((i * 7) % 3);
        const delay = (i % 5) * 0.4;
        return (
          <span
            key={i}
            className={`absolute rounded-full ${c.hue} ${c.className} opacity-50 blur-[1px]`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function BiomeScene({ biome }: { biome: BiomeId }) {
  const common = "relative w-full h-72 md:h-96 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b shadow-2xl";

  if (biome === "jungle") {
    return (
      <div aria-hidden="true" className={`${common} from-emerald-900 to-green-950`} data-testid="ecosystems-scene-jungle">
        {/* Sun rays */}
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(251,191,36,0.5), transparent 50%)" }} />
        {/* Canopy trees */}
        {[10, 30, 50, 70, 90].map((l, i) => (
          <div key={l} className="absolute bottom-0" style={{ left: `${l}%` }}>
            <div className="w-2 bg-gradient-to-t from-emerald-950 to-emerald-700 h-32 md:h-44 mx-auto" />
            <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 w-20 md:w-28 h-20 md:h-28 rounded-full bg-emerald-600/80 blur-[1px]" />
          </div>
        ))}
        {/* Diplodocus silhouette */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-20">
          <div className="absolute bottom-0 left-[10%] w-[55%] h-[60%] rounded-[50%_50%_40%_60%/70%_70%_40%_30%] bg-emerald-950" />
          <div className="absolute bottom-[40%] left-[8%] w-[40%] h-[12%] rounded-l-full bg-emerald-950 rotate-[-6deg]" />
          <div className="absolute bottom-[40%] left-[60%] w-[6%] h-[55%] bg-emerald-950 rotate-[18deg] origin-bottom rounded-t-full" />
          <div className="absolute bottom-0 left-[20%] w-[4%] h-[40%] bg-emerald-950" />
          <div className="absolute bottom-0 left-[55%] w-[5%] h-[50%] bg-emerald-950" />
        </div>
      </div>
    );
  }

  if (biome === "volcano") {
    return (
      <div aria-hidden="true" className={`${common} from-orange-950 to-red-950`} data-testid="ecosystems-scene-volcano">
        {/* Lava glow */}
        <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.7), transparent 60%)" }} />
        {/* Volcano cone */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2/3">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[200px] border-b-red-950" />
          {/* Crater glow */}
          <div className="absolute bottom-[180px] left-1/2 -translate-x-1/2 w-16 h-3 bg-orange-400 rounded-full blur-[2px] animate-pulse" />
          {/* Lava river */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-gradient-to-t from-orange-500 to-amber-300 rounded-t-full" />
        </div>
        {/* Flying ash */}
        {[20, 45, 70, 85].map((l, i) => (
          <div
            key={l}
            className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
            style={{ left: `${l}%`, top: `${(i * 23) % 60}%`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    );
  }

  if (biome === "swamp") {
    return (
      <div aria-hidden="true" className={`${common} from-teal-950 to-slate-950`} data-testid="ecosystems-scene-swamp">
        {/* Mist */}
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-teal-200/10 via-transparent to-teal-900/40" />
        {/* Water reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-teal-900/80 to-transparent" />
        {/* Trees */}
        {[15, 35, 65, 88].map((l) => (
          <div key={l} className="absolute bottom-1/3" style={{ left: `${l}%` }}>
            <div className="w-1 h-32 bg-slate-800 -rotate-3 origin-bottom" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-teal-900/60 blur-[1px]" />
          </div>
        ))}
        {/* Spinosaurus silhouette */}
        <div className="absolute bottom-4 left-1/4 w-40 h-24">
          <div className="absolute bottom-0 left-[15%] w-[55%] h-[40%] rounded-[45%_55%_40%_60%/70%_60%_50%_40%] bg-teal-950" />
          <div className="absolute bottom-[35%] left-[20%] w-[45%] h-[40%] bg-gradient-to-t from-teal-800/70 to-transparent rounded-t-full" />
          <div className="absolute bottom-[45%] left-[58%] w-[28%] h-[18%] rounded-[60%_40%_50%_70%/90%_70%_40%_30%] bg-teal-950" />
          <div className="absolute bottom-0 left-[25%] w-[7%] h-[28%] bg-teal-950 rounded-t" />
        </div>
      </div>
    );
  }

  // coast
  return (
    <div aria-hidden="true" className={`${common} from-sky-900 to-indigo-950`} data-testid="ecosystems-scene-coast">
      {/* Sky */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-700/60 to-transparent" />
      {/* Sun */}
      <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-amber-200/70 blur-[2px]" />
      {/* Cliffs */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-t from-slate-200/90 to-slate-400/60 clip-path-polygon" style={{ clipPath: "polygon(0 100%, 70% 100%, 100% 30%, 100% 0, 50% 40%, 0 60%)" }} />
        <div className="absolute bottom-0 right-0 w-1/3 h-3/4 bg-gradient-to-t from-slate-200/80 to-slate-400/50" style={{ clipPath: "polygon(20% 100%, 100% 100%, 100% 0, 60% 50%, 0 70%)" }} />
      </div>
      {/* Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-sky-700/70 to-transparent" />
      {[0, 25, 50, 75].map((l, i) => (
        <div
          key={l}
          className="absolute bottom-6 h-0.5 w-12 bg-sky-200/60 rounded-full animate-pulse"
          style={{ left: `${l}%`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
      {/* Pterosaurs */}
      <svg viewBox="0 0 60 20" className="absolute top-12 left-1/3 w-12 h-4 opacity-70" aria-hidden="true">
        <path d="M2,10 Q15,2 28,10 Q40,2 58,10 L28,15 Z" fill="#1e293b" />
      </svg>
    </div>
  );
}
