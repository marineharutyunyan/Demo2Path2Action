import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Users, Shield, Database, Headphones } from "lucide-react";

const FAQ = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;

  const sections = [
    {
      title: t.sections.aboutPlatform.title,
      icon: HelpCircle,
      bgColor: "bg-primary/15",
      iconBg: "bg-primary/25",
      iconColor: "text-primary",
      titleColor: "text-primary",
      questions: [
        { q: t.sections.aboutPlatform.q1, a: t.sections.aboutPlatform.a1 },
        { q: t.sections.aboutPlatform.q2, a: t.sections.aboutPlatform.a2 },
        { q: t.sections.aboutPlatform.q3, a: t.sections.aboutPlatform.a3 },
      ],
    },
    {
      title: t.sections.usingPlatform.title,
      icon: Users,
      bgColor: "bg-creative/15",
      iconBg: "bg-creative/25",
      iconColor: "text-creative",
      titleColor: "text-creative",
      questions: [
        { q: t.sections.usingPlatform.q1, a: t.sections.usingPlatform.a1 },
        { q: t.sections.usingPlatform.q2, a: t.sections.usingPlatform.a2 },
        { q: t.sections.usingPlatform.q3, a: t.sections.usingPlatform.a3 },
      ],
    },
    {
      title: t.sections.contentResponsibilities.title,
      icon: Shield,
      bgColor: "bg-emerald-100",
      iconBg: "bg-emerald-200",
      iconColor: "text-emerald-700",
      titleColor: "text-emerald-700",
      questions: [
        { q: t.sections.contentResponsibilities.q1, a: t.sections.contentResponsibilities.a1 },
        { q: t.sections.contentResponsibilities.q2, a: t.sections.contentResponsibilities.a2 },
        { q: t.sections.contentResponsibilities.q3, a: t.sections.contentResponsibilities.a3 },
      ],
    },
    {
      title: t.sections.dataPrivacy.title,
      icon: Database,
      bgColor: "bg-warning/15",
      iconBg: "bg-warning/25",
      iconColor: "text-warning",
      titleColor: "text-warning",
      questions: [
        { q: t.sections.dataPrivacy.q1, a: t.sections.dataPrivacy.a1 },
        { q: t.sections.dataPrivacy.q2, a: t.sections.dataPrivacy.a2 },
        { q: t.sections.dataPrivacy.q3, a: t.sections.dataPrivacy.a3 },
      ],
    },
    {
      title: t.sections.supportUpdates.title,
      icon: Headphones,
      bgColor: "bg-muted",
      iconBg: "bg-foreground/15",
      iconColor: "text-foreground",
      titleColor: "text-foreground",
      questions: [
        { q: t.sections.supportUpdates.q1, a: t.sections.supportUpdates.a1 },
        { q: t.sections.supportUpdates.q2, a: t.sections.supportUpdates.a2 },
        { q: t.sections.supportUpdates.q3, a: t.sections.supportUpdates.a3 },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header with gradient background */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-creative mb-6 shadow-glow">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-creative bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              return (
                <section
                  key={sectionIndex}
                  className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${sectionIndex * 100}ms` }}
                >
                  {/* Section Header */}
                  <div className={`${section.bgColor} p-5 border-b border-border`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${section.iconColor}`} />
                      </div>
                      <h2 className={`text-lg font-semibold ${section.titleColor}`}>
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Questions Accordion */}
                  <Accordion type="single" collapsible className="px-6 py-2">
                    {section.questions.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`${sectionIndex}-${itemIndex}`}
                        className="border-b border-border/50 last:border-0"
                      >
                        <AccordionTrigger className="text-left py-5 hover:no-underline group">
                          <span className="text-base font-medium group-hover:text-primary transition-colors pr-4">
                            {item.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;