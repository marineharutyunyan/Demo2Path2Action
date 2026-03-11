import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const t = translations[language].privacyPolicy;
  const s = t.sections;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-creative bg-clip-text text-transparent">
            {t.title}
          </h1>

          <p className="text-muted-foreground mb-6">{t.intro}</p>
          <p className="text-muted-foreground mb-8">{t.principlesIntro}</p>

          <div className="flex flex-wrap gap-4 mb-12">
            {Object.values(t.principles).map((p) => (
              <span key={p} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">{p}</span>
            ))}
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s1.title}</h2>
            <p className="text-muted-foreground">{s.s1.content}</p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s2.title}</h2>
            <p className="text-muted-foreground mb-4">{s.s2.content}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {s.s2.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s3.title}</h2>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">{s.s3.a.title}</h3>
            <p className="text-muted-foreground mb-3">{s.s3.a.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {s.s3.a.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground">{s.s3.a.outro}</p>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">{s.s3.b.title}</h3>
            <p className="text-muted-foreground mb-3">{s.s3.b.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {s.s3.b.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground">{s.s3.b.outro}</p>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">{s.s3.c.title}</h3>
            <p className="text-muted-foreground mb-3">{s.s3.c.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {s.s3.c.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground">{s.s3.c.outro}</p>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">{s.s3.d.title}</h3>
            <p className="text-muted-foreground">{s.s3.d.content}</p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s4.title}</h2>
            <p className="text-muted-foreground mb-3">{s.s4.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {s.s4.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s5.title}</h2>
            <p className="text-muted-foreground mb-3">{s.s5.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {s.s5.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground">{s.s5.outro}</p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s6.title}</h2>
            <p className="text-muted-foreground mb-3">{s.s6.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {s.s6.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground font-medium">{s.s6.outro}</p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s7.title}</h2>
            <p className="text-muted-foreground">{s.s7.content}</p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s8.title}</h2>
            <p className="text-muted-foreground mb-3">{s.s8.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {s.s8.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground">{s.s8.outro}</p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s9.title}</h2>
            <p className="text-muted-foreground mb-3">{s.s9.intro}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {s.s9.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s10.title}</h2>
            <p className="text-muted-foreground">{s.s10.content}</p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s11.title}</h2>
            <p className="text-muted-foreground">{s.s11.content}</p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.s12.title}</h2>
            <p className="text-muted-foreground">{s.s12.content}</p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>{t.effectiveDateLabel}</strong> {t.effectiveDate}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
