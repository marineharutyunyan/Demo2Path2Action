import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  const values = [
    {
      icon: Users,
      title: t.values.community.title,
      description: t.values.community.description,
    },
    {
      icon: Target,
      title: t.values.impact.title,
      description: t.values.impact.description,
    },
    {
      icon: Heart,
      title: t.values.inclusion.title,
      description: t.values.inclusion.description,
    },
    {
      icon: Lightbulb,
      title: t.values.innovation.title,
      description: t.values.innovation.description,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                {t.mission.title}
              </h2>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                {t.mission.description}
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                {t.story.title}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>{t.story.paragraph1}</p>
                <p>{t.story.paragraph2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {t.valuesTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.team.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t.team.description}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t.cta.title}
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              {t.cta.description}
            </p>
            <a
              href="/wizard"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full bg-background text-primary hover:bg-background/90 transition-colors"
            >
              {t.cta.button}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
