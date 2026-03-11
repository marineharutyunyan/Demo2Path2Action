import { Sparkles, FileText, DollarSign, Share2, Clock, Wifi } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const featureIcons = [Sparkles, FileText, DollarSign, Share2, Clock, Wifi];
const gradients = [
  "from-primary to-creative",
  "from-accent to-primary",
  "from-warning to-secondary",
  "from-secondary to-accent",
  "from-creative to-warning",
  "from-primary to-secondary",
];

export const Features = () => {
  const { language } = useLanguage();
  const t = translations[language].features;

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Card
                key={index}
                className="group hover:shadow-glow transition-base border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-base`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
