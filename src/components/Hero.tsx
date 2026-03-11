import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import heroImage from "@/assets/hero-illustration.png";
export const Hero = () => {
  const {
    language
  } = useLanguage();
  const t = translations[language].hero;
  return <section className="gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <h1 className="font-bold leading-tight">
              {t.title}{" "}
              <span className="bg-gradient-to-r from-primary to-creative bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild variant="hero" size="lg">
                <NavLink to="/wizard">
                  {t.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NavLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">
                  {t.learnMore}
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>{t.freeToUse}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>{t.noLogin}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>{t.exportPDF}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl rounded-full"></div>
            <img src={heroImage} alt="Young activists collaborating and planning civic action" className="relative w-full h-auto rounded-2xl shadow-glow" />
          </div>
        </div>
      </div>
    </section>;
};