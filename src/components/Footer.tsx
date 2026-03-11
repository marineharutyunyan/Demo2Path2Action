import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const nav = translations[language].nav;
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-8 h-8 gradient-primary rounded-lg"></div>
              Path2Action
            </NavLink>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#how-it-works"
                  onClick={(e) => handleSectionClick(e, "how-it-works")}
                  className="text-muted-foreground hover:text-primary transition-base cursor-pointer"
                >
                  {nav.howItWorks}
                </a>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {nav.about}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t.support}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {t.contactUs}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {t.faq}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {t.privacyPolicy}
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="text-muted-foreground hover:text-primary transition-base">
                  {t.termsOfService}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
