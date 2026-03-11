import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, MessageCircleQuestion } from "lucide-react";

export const FAQSection = () => {
  const { language } = useLanguage();
  const t = translations[language].faqSection;

  const previewQuestions = [
    { q: t.preview.q1, a: t.preview.a1 },
    { q: t.preview.q2, a: t.preview.a2 },
    { q: t.preview.q3, a: t.preview.a3 },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-creative mb-4 shadow-glow">
            <MessageCircleQuestion className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion FAQ */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <Accordion type="single" collapsible className="px-6">
              {previewQuestions.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border/50 last:border-0"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <span className="text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-base font-medium group-hover:text-primary transition-colors">
                        {item.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-11">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <NavLink
              to="/faq"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2"
            >
              {t.viewAll}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};