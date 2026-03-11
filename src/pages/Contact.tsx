import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, MessageSquare, Phone, Handshake, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const partnerSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be less than 100 characters"),
  contactName: z
    .string()
    .trim()
    .min(1, "Contact name is required")
    .max(100, "Contact name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [partnerData, setPartnerData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmittingPartner, setIsSubmittingPartner] = useState(false);
  const [partnerErrors, setPartnerErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPartnerData((prev) => ({ ...prev, [name]: value }));
    if (partnerErrors[name]) {
      setPartnerErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateContactUsId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "m.marine.harutyunyan@gmail.com",
        },
        EMAILJS_CONFIG.publicKey,
      );

      toast({
        title: t.successTitle,
        description: t.successMessage,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerErrors({});

    const result = partnerSchema.safeParse(partnerData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setPartnerErrors(fieldErrors);
      return;
    }

    setIsSubmittingPartner(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: partnerData.contactName,
          from_email: partnerData.email,
          subject: `Partnership Request from ${partnerData.organizationName}`,
          message: `Organization: ${partnerData.organizationName}\nContact: ${partnerData.contactName}\nPhone: ${partnerData.phone || "Not provided"}\n\nMessage:\n${partnerData.message}`,
          to_email: "m.marine.harutyunyan@gmail.com",
        },
        EMAILJS_CONFIG.publicKey,
      );

      toast({
        title: t.partnerSuccessTitle,
        description: t.partnerSuccessMessage,
      });

      setPartnerData({ organizationName: "", contactName: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Failed to send partner request:", error);
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmittingPartner(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Contact Form */}
          <Card className="mb-16">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{t.formTitle}</CardTitle>
                  <CardDescription>{t.formDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.nameLabel}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.emailLabel}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t.subjectLabel}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.subjectPlaceholder}
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.messageLabel}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t.submitButton}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Partner Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{t.partnerTitle}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t.partnerSubtitle}</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{t.partnerFormTitle}</CardTitle>
                  <CardDescription>{t.partnerFormDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">{t.organizationLabel}</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      value={partnerData.organizationName}
                      onChange={handlePartnerChange}
                      placeholder={t.organizationPlaceholder}
                      className={partnerErrors.organizationName ? "border-destructive" : ""}
                    />
                    {partnerErrors.organizationName && (
                      <p className="text-sm text-destructive">{partnerErrors.organizationName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">{t.contactNameLabel}</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={partnerData.contactName}
                      onChange={handlePartnerChange}
                      placeholder={t.contactNamePlaceholder}
                      className={partnerErrors.contactName ? "border-destructive" : ""}
                    />
                    {partnerErrors.contactName && (
                      <p className="text-sm text-destructive">{partnerErrors.contactName}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="partnerEmail">{t.emailLabel}</Label>
                    <Input
                      id="partnerEmail"
                      name="email"
                      type="email"
                      value={partnerData.email}
                      onChange={handlePartnerChange}
                      placeholder={t.emailPlaceholder}
                      className={partnerErrors.email ? "border-destructive" : ""}
                    />
                    {partnerErrors.email && <p className="text-sm text-destructive">{partnerErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t.phoneLabel} <span className="text-muted-foreground font-normal">({t.optional})</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={partnerData.phone}
                      onChange={handlePartnerChange}
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnerMessage">{t.partnerMessageLabel}</Label>
                  <Textarea
                    id="partnerMessage"
                    name="message"
                    value={partnerData.message}
                    onChange={handlePartnerChange}
                    placeholder={t.partnerMessagePlaceholder}
                    rows={4}
                    className={partnerErrors.message ? "border-destructive" : ""}
                  />
                  {partnerErrors.message && <p className="text-sm text-destructive">{partnerErrors.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmittingPartner}>
                  {isSubmittingPartner ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Handshake className="w-4 h-4" />
                      {t.partnerSubmitButton}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
