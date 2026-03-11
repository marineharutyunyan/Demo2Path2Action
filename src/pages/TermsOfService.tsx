import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const sectionIds = [
  "introduction", "when-apply", "where-apply", "change-services", "change-terms",
  "charges", "ownership", "permitted-uses", "ai-features", "effect-termination",
  "linked-services", "liability", "communication", "contact", "miscellaneous",
  "dispute-resolution", "jurisdiction",
];

const TermsOfService = () => {
  const { language } = useLanguage();
  const t = translations[language].termsOfService;
  const s = t.sections;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-creative bg-clip-text text-transparent">
            {t.title}
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* Table of Contents */}
            <section className="bg-muted/30 rounded-xl p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">{t.tocTitle}</h2>
              <p className="text-muted-foreground mb-4">{t.tocIntro}</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                {t.tocItems.map((item, i) => (
                  <li key={i}>
                    <a href={`#${sectionIds[i]}`} className="hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ol>
            </section>

            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s1.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s1.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s1.p2}</p>
              <p className="text-muted-foreground">{s.s1.p3}</p>
            </section>

            {/* 2 */}
            <section id="when-apply" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s2.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s2.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s2.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s2.outro}</p>
            </section>

            {/* 3 */}
            <section id="where-apply" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s3.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s3.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {s.s3.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            {/* 4 */}
            <section id="change-services" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s4.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s4.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s4.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s4.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s4.outro}</p>
            </section>

            {/* 5 */}
            <section id="change-terms" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s5.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s5.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s5.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s5.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s5.outro}</p>
            </section>

            {/* 6 */}
            <section id="charges" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s6.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s6.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s6.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {s.s6.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            {/* 7 */}
            <section id="ownership" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s7.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s7.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s7.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s7.outro}</p>
            </section>

            {/* 8 */}
            <section id="permitted-uses" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s8.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s8.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s8.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {s.s8.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            {/* 9 */}
            <section id="ai-features" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s9.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s9.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s9.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s9.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s9.outro}</p>
            </section>

            {/* 10 */}
            <section id="effect-termination" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s10.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s10.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s10.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s10.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s10.outro}</p>
            </section>

            {/* 11 */}
            <section id="linked-services" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s11.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s11.p1}</p>
              <p className="text-muted-foreground mb-4">{s.s11.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s11.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s11.outro}</p>
            </section>

            {/* 12 */}
            <section id="liability" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s12.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s12.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s12.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s12.outro}</p>
            </section>

            {/* 13 */}
            <section id="communication" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s13.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s13.intro}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {s.s13.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-muted-foreground">{s.s13.outro}</p>
            </section>

            {/* 14 */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s14.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s14.intro}</p>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email:</strong> {s.s14.email}<br />
                  <strong className="text-foreground">Project:</strong> {s.s14.project}
                </p>
              </div>
            </section>

            {/* 15 */}
            <section id="miscellaneous" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s15.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s15.p1}</p>
              <p className="text-muted-foreground">{s.s15.p2}</p>
            </section>

            {/* 16 */}
            <section id="dispute-resolution" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s16.title}</h2>
              <p className="text-muted-foreground">{s.s16.content}</p>
            </section>

            {/* 17 */}
            <section id="jurisdiction" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{s.s17.title}</h2>
              <p className="text-muted-foreground mb-4">{s.s17.p1}</p>
              <p className="text-muted-foreground">{s.s17.p2}</p>
            </section>

            {/* Effective Date */}
            <section className="bg-muted/30 rounded-xl p-6 border border-border mt-12">
              <p className="text-muted-foreground text-center">
                <strong className="text-foreground">{t.effectiveDateLabel}</strong> {t.effectiveDate}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
