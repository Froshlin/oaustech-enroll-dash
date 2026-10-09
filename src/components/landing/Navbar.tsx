import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/landing/ThemeToggle";
import logo from "@/assets/oaustech-sch-logo.png";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Documents", href: "#documents" },
  { label: "Portals", href: "#portals" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="OAUSTECH Logo" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900 dark:text-white">OAUSTECH</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Registration Portal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button onClick={() => navigate("/student-login")} size="sm">
            Student login
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-6 dark:border-slate-800">
                <SheetClose asChild>
                  <Button variant="outline" onClick={() => navigate("/student-register")}>
                    Start registration
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={() => navigate("/student-login")}>Student login</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
