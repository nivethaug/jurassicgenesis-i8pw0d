import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Layout component - Main application layout wrapper.
 *
 * Structure:
 * - Sticky top navigation (Navbar) on every route
 * - Full-height flex column; main is the scroll container
 * - Pages render inside <Outlet />
 */
const Layout = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
