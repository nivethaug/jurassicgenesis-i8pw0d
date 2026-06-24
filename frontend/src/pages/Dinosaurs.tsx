import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Filter,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Ruler,
  Weight,
  Utensils,
  Calendar,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Diet = "Carnivore" | "Herbivore" | "Omnivore";
type Era = "Late Jurassic" | "Early Cretaceous" | "Late Cretaceous";

type Dinosaur = {
  id: string;
  name: string;
  species: string;
  era: Era;
  diet: Diet;
  length: number; // meters
  height: number; // meters
  weight: number; // tonnes
  topSpeed: number; // km/h
  threatLevel: 1 | 2 | 3 | 4 | 5;
  habitat: string;
  description: string;
  facts: string[];
  silhouette: "trex" | "triceratops" | "brachio" | "raptor" | "spino";
  accent: string;
};

const DINOSAURS: Dinosaur[] = [
  {
    id: "trex",
    name: "Tyrannosaurus Rex",
    species: "T. rex",
    era: "Late Cretaceous",
    diet: "Carnivore",
    length: 12.3,
    height: 4.0,
    weight: 8.4,
    topSpeed: 32,
    threatLevel: 5,
    habitat: "Inland floodplains · Laramidia",
    description:
      "The tyrant king. With a bite force of 57,000 newtons, T. rex could crush bone and trailer-sized prey alike. Its binocular vision and acute olfaction made it a near-perfect ambush predator.",
    facts: [
      "Bite force strong enough to shatter a car",
      "Could see in motionless detail up to 5 km away",
      "Lived alongside Triceratops and Edmontosaurus",
    ],
    silhouette: "trex",
    accent: "from-red-500/30 to-amber-700/40",
  },
  {
    id: "triceratops",
    name: "Triceratops",
    species: "T. horridus",
    era: "Late Cretaceous",
    diet: "Herbivore",
    length: 9.0,
    height: 3.0,
    weight: 6.0,
    topSpeed: 24,
    threatLevel: 3,
    habitat: "Open woodlands · North America",
    description:
      "A three-horned fortress on legs. Its 1.5-meter frill shielded the neck while dual brow horns deterred even the most determined tyrannosaur.",
    facts: [
      "Skull alone could reach 2.5 meters",
      "Fought T. rex using horn thrusts",
      "Herds numbered in the hundreds",
    ],
    silhouette: "triceratops",
    accent: "from-emerald-500/30 to-teal-800/40",
  },
  {
    id: "brachio",
    name: "Brachiosaurus",
    species: "B. altithorax",
    era: "Late Jurassic",
    diet: "Herbivore",
    length: 22.0,
    height: 13.0,
    weight: 56.0,
    topSpeed: 14,
    threatLevel: 2,
    habitat: "Floodplain forests · Morrison Formation",
    description:
      "A skyscraper with a heartbeat. Brachiosaurus cropped foliage 16 meters above the ground — a height no other Jurassic herbivore could reach.",
    facts: [
      "Ingested up to 400 kg of foliage daily",
      "Heart estimated at 1.5x human body weight",
      "Could peer over a five-story building",
    ],
    silhouette: "brachio",
    accent: "from-sky-500/30 to-indigo-800/40",
  },
  {
    id: "raptor",
    name: "Velociraptor",
    species: "V. mongoliensis",
    era: "Late Cretaceous",
    diet: "Carnivore",
    length: 2.0,
    height: 0.5,
    weight: 0.015,
    topSpeed: 64,
    threatLevel: 4,
    habitat: "Arid badlands · Mongolian deserts",
    description:
      "Feathered, intelligent, and relentless. Velociraptor hunted in coordinated packs, using its sickle claw to pin and dispatch prey much larger than itself.",
    facts: [
      "Brain-to-body ratio comparable to modern birds",
      "Sickle claw measured 9 cm on the inside toe",
      "Likely covered in pennaceous feathers",
    ],
    silhouette: "raptor",
    accent: "from-orange-500/30 to-rose-800/40",
  },
  {
    id: "spino",
    name: "Spinosaurus",
    species: "S. aegyptiacus",
    era: "Early Cretaceous",
    diet: "Carnivore",
    length: 14.0,
    height: 4.5,
    weight: 7.4,
    topSpeed: 22,
    threatLevel: 5,
    habitat: "Mangrove swamps · North Africa",
    description:
      "The longest carnivorous dinosaur known. A crocodilian snout, dense bones, and a dorsal sail up to 2 meters tall mark it as a semi-aquatic apex hunter.",
    facts: [
      "Sail may have regulated temperature or display",
      "Could swim powerfully after giant fish",
      "Larger and heavier than T. rex",
    ],
    silhouette: "spino",
    accent: "from-cyan-500/30 to-blue-900/40",
  },
];

function Silhouette({ type, className = "" }: { type: Dinosaur["silhouette"]; className?: string }) {
  const common = "relative";
  if (type === "trex") {
    return (
      <div aria-hidden="true" className={`${common} ${className}`}>
        <div className="absolute bottom-[20%] left-[18%] w-[55%] h-[45%] rounded-[45%_55%_40%_60%/60%_50%_50%_40%] bg-gradient-to-br from-slate-700 to-black" />
        <div className="absolute bottom-[48%] left-[60%] w-[26%] h-[22%] rounded-[60%_40%_30%_70%/70%_60%_50%_40%] bg-gradient-to-br from-slate-700 to-black rotate-[-8deg]" />
        <div className="absolute bottom-[42%] left-[64%] w-[22%] h-[8%] rounded-b-[40%] bg-black/90" />
        <div className="absolute bottom-[28%] left-0 w-[28%] h-[10%] rounded-l-full bg-gradient-to-l from-slate-800 to-black rotate-[12deg]" />
        <div className="absolute bottom-0 left-[30%] w-[8%] h-[28%] bg-slate-800 rounded-t" />
        <div className="absolute bottom-0 left-[48%] w-[10%] h-[34%] bg-slate-800 rounded-t-lg" />
      </div>
    );
  }
  if (type === "triceratops") {
    return (
      <div aria-hidden="true" className={`${common} ${className}`}>
        <div className="absolute bottom-[15%] left-[18%] w-[55%] h-[40%] rounded-[50%_40%_50%_60%/70%_60%_50%_40%] bg-gradient-to-br from-slate-700 to-black" />
        {/* Frill */}
        <div className="absolute bottom-[40%] left-[55%] w-[34%] h-[42%] rounded-[40%_60%_50%_50%/50%_50%_60%_40%] bg-gradient-to-br from-slate-700 to-black rotate-[8deg]" />
        {/* Horns */}
        <div className="absolute bottom-[60%] left-[64%] w-[3%] h-[20%] bg-amber-100/60 rotate-[-12deg]" />
        <div className="absolute bottom-[62%] left-[70%] w-[3%] h-[16%] bg-amber-100/60" />
        <div className="absolute bottom-[78%] left-[68%] w-[2.5%] h-[10%] bg-amber-100/50" />
        <div className="absolute bottom-0 left-[22%] w-[10%] h-[18%] bg-slate-800 rounded-t" />
        <div className="absolute bottom-0 left-[50%] w-[12%] h-[20%] bg-slate-800 rounded-t" />
        <div className="absolute bottom-[20%] left-0 w-[20%] h-[8%] rounded-l-full bg-gradient-to-l from-slate-800 to-black rotate-[-8deg]" />
      </div>
    );
  }
  if (type === "brachio") {
    return (
      <div aria-hidden="true" className={`${common} ${className}`}>
        <div className="absolute bottom-[12%] left-[12%] w-[55%] h-[35%] rounded-[50%_50%_40%_60%/70%_70%_40%_30%] bg-gradient-to-br from-slate-700 to-slate-900" />
        <div className="absolute bottom-[40%] left-[50%] w-[8%] h-[50%] bg-gradient-to-t from-slate-800 to-slate-700 rotate-[18deg] origin-bottom rounded-t-full" />
        <div className="absolute bottom-[88%] left-[56%] w-[12%] h-[10%] rounded-full bg-slate-700" />
        <div className="absolute bottom-0 left-[20%] w-[6%] h-[14%] bg-slate-800 rounded-t" />
        <div className="absolute bottom-0 left-[52%] w-[8%] h-[18%] bg-slate-800 rounded-t" />
        <div className="absolute bottom-[16%] left-0 w-[14%] h-[5%] bg-gradient-to-l from-slate-800 to-transparent rounded-l-full rotate-[-6deg]" />
      </div>
    );
  }
  if (type === "raptor") {
    return (
      <div aria-hidden="true" className={`${common} ${className}`}>
        <div className="absolute bottom-[30%] left-[15%] w-[50%] h-[40%] rounded-[45%_55%_40%_60%/70%_60%_60%_40%] bg-gradient-to-br from-orange-900 to-slate-900" />
        <div className="absolute bottom-[55%] left-[55%] w-[28%] h-[26%] rounded-[60%_50%_40%_70%/80%_70%_50%_30%] bg-gradient-to-br from-orange-900 to-slate-900 rotate-[-6deg]" />
        <div className="absolute bottom-[50%] left-[60%] w-[22%] h-[6%] rounded-b bg-slate-900" />
        {/* Sickle claw */}
        <div className="absolute bottom-[8%] left-[44%] w-[6%] h-[14%] bg-amber-200/70 rounded rotate-[18deg]" />
        <div className="absolute bottom-0 left-[30%] w-[6%] h-[30%] bg-slate-900 rounded-t" />
        <div className="absolute bottom-0 left-[48%] w-[7%] h-[36%] bg-slate-900 rounded-t" />
        <div className="absolute bottom-[36%] left-0 w-[18%] h-[6%] rounded-l-full bg-gradient-to-l from-slate-900 to-transparent rotate-[20deg]" />
        {/* Feathers */}
        <div className="absolute bottom-[48%] left-[30%] w-[18%] h-[10%] bg-orange-700/30 rounded-full blur-[1px]" />
      </div>
    );
  }
  // spino
  return (
    <div aria-hidden="true" className={`${common} ${className}`}>
      {/* Sail */}
      <div className="absolute bottom-[40%] left-[20%] w-[50%] h-[40%] bg-gradient-to-t from-cyan-700/80 via-cyan-500/50 to-transparent rounded-t-full" />
      <div className="absolute bottom-[20%] left-[18%] w-[55%] h-[35%] rounded-[45%_55%_40%_60%/70%_60%_50%_40%] bg-gradient-to-br from-slate-700 to-black" />
      <div className="absolute bottom-[45%] left-[58%] w-[30%] h-[20%] rounded-[60%_40%_50%_70%/90%_70%_40%_30%] bg-gradient-to-br from-slate-700 to-black" />
      <div className="absolute bottom-[42%] left-[66%] w-[24%] h-[8%] rounded-b-[50%] bg-slate-900" />
      <div className="absolute bottom-0 left-[28%] w-[8%] h-[24%] bg-slate-800 rounded-t" />
      <div className="absolute bottom-0 left-[48%] w-[10%] h-[30%] bg-slate-800 rounded-t-lg" />
      <div className="absolute bottom-[28%] left-0 w-[22%] h-[8%] rounded-l-full bg-gradient-to-l from-slate-800 to-black rotate-[14deg]" />
    </div>
  );
}

export default function Dinosaurs() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<"all" | Diet>("all");
  const [era, setEra] = useState<"all" | Era>("all");
  const [selected, setSelected] = useState<Dinosaur | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const rotateRef = useRef<number | null>(null);

  const filtered = useMemo(() => {
    return DINOSAURS.filter((d) => {
      const matchesQuery =
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.species.toLowerCase().includes(query.toLowerCase());
      const matchesDiet = diet === "all" || d.diet === diet;
      const matchesEra = era === "all" || d.era === era;
      return matchesQuery && matchesDiet && matchesEra;
    });
  }, [query, diet, era]);

  // Auto-rotate the holographic stage
  useEffect(() => {
    if (rotateRef.current) window.clearInterval(rotateRef.current);
    rotateRef.current = window.setInterval(() => {
      setRotation((r) => (r + 0.6) % 360);
    }, 30);
    return () => {
      if (rotateRef.current) window.clearInterval(rotateRef.current);
    };
  }, []);

  const threatColor = (lvl: number) =>
    lvl >= 5
      ? "text-red-400 bg-red-500/10 border-red-500/30"
      : lvl >= 4
      ? "text-orange-400 bg-orange-500/10 border-orange-500/30"
      : lvl >= 3
      ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
      : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";

  return (
    <main
      data-testid="dinosaurs-page"
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-50"
    >
      {/* Atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(251,191,36,0.10), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.10), transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-amber-400/80 text-xs tracking-[0.3em] uppercase mb-3">
              Holographic Sanctuary
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
              Dinosaur Sanctuary
            </h1>
            <p className="mt-4 text-slate-400 text-lg max-w-2xl">
              Project, rotate, and inspect the apex creatures of the Mesozoic. Each specimen includes verified
              morphometric data from the fossil record.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Badge variant="outline" className="border-amber-400/40 text-amber-300 bg-amber-500/10">
              {DINOSAURS.length} Specimens
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div
          className="mt-10 flex flex-col md:flex-row gap-3 md:items-center"
          data-testid="dinosaurs-filters"
        >
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            />
            <Input
              aria-label="Search dinosaurs"
              data-testid="dinosaurs-search-input"
              placeholder="Search by name or species..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter aria-hidden="true" className="w-4 h-4 text-slate-500" />
            <Select value={diet} onValueChange={(v) => setDiet(v as typeof diet)}>
              <SelectTrigger
                aria-label="Filter by diet"
                data-testid="dinosaurs-diet-select"
                className="w-40 bg-white/5 border-white/10 text-slate-100"
              >
                <SelectValue placeholder="Diet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All diets</SelectItem>
                <SelectItem value="Carnivore">Carnivore</SelectItem>
                <SelectItem value="Herbivore">Herbivore</SelectItem>
                <SelectItem value="Omnivore">Omnivore</SelectItem>
              </SelectContent>
            </Select>
            <Select value={era} onValueChange={(v) => setEra(v as typeof era)}>
              <SelectTrigger
                aria-label="Filter by era"
                data-testid="dinosaurs-era-select"
                className="w-44 bg-white/5 border-white/10 text-slate-100"
              >
                <SelectValue placeholder="Era" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All eras</SelectItem>
                <SelectItem value="Late Jurassic">Late Jurassic</SelectItem>
                <SelectItem value="Early Cretaceous">Early Cretaceous</SelectItem>
                <SelectItem value="Late Cretaceous">Late Cretaceous</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        <div
          aria-live="polite"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="dinosaurs-grid"
        >
          {filtered.map((d) => (
            <article
              key={d.id}
              data-testid={`dinosaurs-card-${d.id}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-900/20"
            >
              {/* Holographic stage */}
              <div className="relative h-56 overflow-hidden">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${d.accent} opacity-60`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(251,191,36,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.15) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div
                  className="absolute inset-0 flex items-end justify-center transition-transform duration-200"
                  style={{ transform: `scale(${1 + (rotation % 30) / 200})` }}
                >
                  <Silhouette type={d.silhouette} className="w-[70%] h-[85%]" />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-amber-400/20 blur-xl"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={`${threatColor(d.threatLevel)} border`}>
                    Threat {d.threatLevel}/5
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-black/40 border-white/20 text-slate-200">
                    {d.era}
                  </Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-xl font-semibold text-white">{d.name}</h2>
                  <span className="text-xs italic text-slate-500">{d.species}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Ruler aria-hidden="true" className="w-3 h-3" /> {d.length}m
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Weight aria-hidden="true" className="w-3 h-3" /> {d.weight}t
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Utensils aria-hidden="true" className="w-3 h-3" /> {d.diet}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-400 line-clamp-2">{d.description}</p>
                <Button
                  onClick={() => setSelected(d)}
                  data-testid={`dinosaurs-inspect-${d.id}-button`}
                  className="mt-5 w-full bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 text-slate-100 hover:text-amber-200 transition-all duration-300"
                >
                  <Info aria-hidden="true" className="w-4 h-4 mr-2" />
                  Inspect Specimen
                </Button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500" data-testid="dinosaurs-empty-state">
              <Search aria-hidden="true" className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p>No specimens match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Inspection dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          aria-label="Specimen inspection"
          data-testid="dinosaurs-inspect-dialog"
          className="max-w-4xl bg-slate-950/90 border-amber-400/20 backdrop-blur-2xl text-slate-100 p-0 overflow-hidden"
        >
          {selected && (
            <div className="grid md:grid-cols-2">
              {/* Holo stage */}
              <div className="relative h-72 md:h-auto min-h-[320px] overflow-hidden bg-gradient-to-br from-slate-900 to-black">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${selected.accent} opacity-60`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(251,191,36,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.18) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    transform: `rotate(${rotation * 0.02}deg)`,
                  }}
                />
                {/* Rotating holo ring */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-amber-400/40 rounded-full"
                  style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${zoom})` }}
                />
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-amber-400/20 rounded-full"
                  style={{ transform: `translate(-50%, -50%) rotate(${-rotation * 0.5}deg) scale(${zoom})` }}
                />
                <div
                  className="absolute inset-0 flex items-end justify-center"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <Silhouette type={selected.silhouette} className="w-[70%] h-[85%]" />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-amber-400/25 blur-2xl"
                />

                {/* Zoom controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <Button
                    aria-label="Zoom in"
                    data-testid="dinosaurs-zoom-in-button"
                    size="icon"
                    variant="secondary"
                    onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
                    className="bg-black/60 border border-white/10 hover:bg-amber-500/20"
                  >
                    <ZoomIn aria-hidden="true" className="w-4 h-4" />
                  </Button>
                  <Button
                    aria-label="Zoom out"
                    data-testid="dinosaurs-zoom-out-button"
                    size="icon"
                    variant="secondary"
                    onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
                    className="bg-black/60 border border-white/10 hover:bg-amber-500/20"
                  >
                    <ZoomOut aria-hidden="true" className="w-4 h-4" />
                  </Button>
                  <Button
                    aria-label="Reset view"
                    data-testid="dinosaurs-reset-view-button"
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      setZoom(1);
                      setRotation(0);
                    }}
                    className="bg-black/60 border border-white/10 hover:bg-amber-500/20"
                  >
                    <RotateCw aria-hidden="true" className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-amber-300">
                  <Sparkles aria-hidden="true" className="w-3 h-3" />
                  Holo Projection
                </div>
              </div>

              {/* Info panel */}
              <DialogHeader className="p-6 md:p-8 flex flex-col gap-0 space-y-0">
                <DialogTitle className="text-2xl md:text-3xl font-serif text-white">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="italic text-slate-400">
                  {selected.species} · {selected.habitat}
                </DialogDescription>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Stat icon={<Ruler className="w-4 h-4" />} label="Length" value={`${selected.length} m`} />
                  <Stat icon={<Ruler className="w-4 h-4" />} label="Height" value={`${selected.height} m`} />
                  <Stat icon={<Weight className="w-4 h-4" />} label="Weight" value={`${selected.weight} t`} />
                  <Stat icon={<Sparkles className="w-4 h-4" />} label="Top Speed" value={`${selected.topSpeed} km/h`} />
                  <Stat icon={<Utensils className="w-4 h-4" />} label="Diet" value={selected.diet} />
                  <Stat icon={<Calendar className="w-4 h-4" />} label="Era" value={selected.era} />
                </div>

                <p className="mt-5 text-sm text-slate-300 leading-relaxed">{selected.description}</p>

                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-widest text-amber-300/80 mb-2">Field Notes</p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {selected.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500">
        <span aria-hidden="true">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-white">{value}</div>
    </div>
  );
}
