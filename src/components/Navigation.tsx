import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { href: "/#how-it-works", label: t.howItWorks, isRoute: false, sectionId: "how-it-works" },
    { href: "/venues", label: t.ourVenues, isRoute: true },
    { href: "/about", label: t.about, isRoute: true },
    { href: "/faq", label: t.faq, isRoute: true },
  ];

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page with hash
      navigate(`/#${sectionId}`);
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 gradient-primary rounded-lg"></div>
            Path2Action
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.isRoute ? (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-base font-medium"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.sectionId!)}
                  className="text-foreground hover:text-primary transition-base font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              ),
            )}
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("arm")}>Հայերեն</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="hero" size="default">
              <NavLink to="/wizard">{t.startPlanning}</NavLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("arm")}>Հայերեն</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navItems.map((item) =>
              item.isRoute ? (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-base font-medium"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-base font-medium"
                  onClick={(e) => {
                    handleSectionClick(e, item.sectionId!);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ),
            )}
            <Button asChild variant="hero" size="default" className="w-full">
              <NavLink to="/wizard">{t.startPlanning}</NavLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
