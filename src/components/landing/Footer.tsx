import logo from "@/assets/oaustech-sch-logo.png";

const footerLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Documents", href: "#documents" },
  { label: "Portals", href: "#portals" },
  { label: "FAQ", href: "#faq" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <img src={logo} alt="OAUSTECH Logo" className="h-9 w-9 object-contain" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">OAUSTECH</p>
              <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
                Olusegun Agagu University of Science and Technology — Student Registration Portal.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {year} OAUSTECH Student Registration Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
