import { Target, Users, MapPin, UserCheck, Megaphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const icons = [Target, Users, MapPin, UserCheck, Megaphone];
const colors = ["text-primary", "text-secondary", "text-accent", "text-warning", "text-creative"];
const bgColors = ["bg-primary/10", "bg-secondary/10", "bg-accent/10", "bg-warning/10", "bg-creative/10"];

export const HowItWorks = () => {
  const { language } = useLanguage();
  const t = translations[language].howItWorks;

  // Map 4 translation steps to 5 UI steps (we'll use the 4 steps for now)
  const steps = t.steps.slice(0, 4);

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-base h-full flex flex-col items-center text-center">
                  <div className={`${bgColors[index]} rounded-2xl p-4 mb-4`}>
                    <Icon className={`h-8 w-8 ${colors[index]}`} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Arrow (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-primary/30"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
