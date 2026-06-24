import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Bone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/dinosaurs", label: "Dinosaurs", end: false },
  { to: "/ecosystems", label: "Ecosystems", end: false },
  { to: "/timeline", label: "Timeline", end: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
      "min-h-[44px] flex items-center",
      isActive
        ? "text-amber-200"
        : "text-slate-300 hover:text-white",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white"
          onClick={() => setOpen(false)}
        >
          <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-900/40">
              <Bone aria-hidden="true" className="h-5 w-5 text-black" />
            </span>
            <span className="font-serif text-lg font-bold tracking-tight">
              Jurassic<span className="text-amber-400">Genesis</span>
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              data-testid={`navbar-link-${l.label.toLowerCase()}`}
            >
              <span className="flex items-center">
                {l.label}
                <span className="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 bg-amber-400 transition-transform duration-300 [.text-amber-200_&]:scale-x-100" />
              </span>
            </NavLink>
          ))}
        </nav>

        {/* CTA (desktop) */}
        <div className="hidden md:flex items-center">
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold hover:from-amber-400 hover:to-orange-500 transition-all duration-300 hover:scale-[1.03]"
          >
            <Link to="/timeline">
              <span className="flex items-center">Start Expedition</span>
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 hover:bg-white/5 transition-colors"
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl"
        >
          <div className="space-y-1 px-4 py-3">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "block rounded-lg px-4 py-3 text-base font-medium min-h-[44px] flex items-center transition-colors",
                    isActive
                      ? "bg-amber-500/15 text-amber-200 border border-amber-400/30"
                      : "text-slate-200 hover:bg-white/5",
                  ].join(" ")
                }
              >
                <span className="flex items-center">{l.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
