import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, Edit, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import html2pdf from "html2pdf.js";

export type PdfMode = "edit" | "read";

export interface StepLaunchRef {
  downloadPDF: (onComplete?: () => void) => void;
}

interface WizardData {
  goalSetting: {
    campaignName: string;
    goalStatement: string;
    campaignType: string;
    successMetric: string;
  };
  targetAudience: {
    primaryAudience: string;
    participantCount: string;
    ageGroups: string[];
    geographicFocus: string;
    keyStakeholders: string;
  };
  strategy: {
    mainApproach: string;
    tactics: string[];
    keyMessages: string;
    potentialAllies: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    milestones: { title: string; date: string }[];
  };
  resources: {
    resourceTypes: string[];
    venueType: string;
    materialsNeeded: string;
    toolsAndEquipment: string;
    venueRequirements: string;
  };
  team: {
    teamSize: string;
    roles: { title: string; responsibilities: string }[];
    recruitmentPlan: string;
    communicationChannels: string;
  };
  outreach: {
    channels: string[];
    socialMediaPlan: string;
    pressStrategy: string;
    contentCalendar: string;
  };
  budget: {
    expenseCategories: { category: string; amount: string; notes: string }[];
    totalBudget: string;
    fundingSources: string;
    contingencyPlan: string;
  };
  riskAssessment: {
    risks: { risk: string; likelihood: string; mitigation: string }[];
    legalConsiderations: string;
    safetyPlan: string;
    communicationCrisisPlan: string;
  };
}

interface StepLaunchProps {
  data: WizardData;
  planUrl: string;
  labels: {
    downloadPlan: string;
    campaignPlanTitle: string;
    generatedOn: string;
    planLinkLabel: string;
    poweredBy: string;
    platformName: string;
    platformUrl: string;
      pdfModeDialog: {
        title: string;
        description: string;
        editMode: string;
        editModeDesc: string;
        readMode: string;
        readModeDesc: string;
        download: string;
        cancel: string;
      };
      venueBookingCta: string;
      venueBookingCtaUrl: string;
      sections: {
      overview: string;
      campaignName: string;
      goal: string;
      type: string;
      successMetric: string;
      targetAudience: string;
      primaryAudience: string;
      participantCount: string;
      ageGroups: string;
      geographicFocus: string;
      keyStakeholders: string;
      strategy: string;
      approach: string;
      tactics: string;
      keyMessages: string;
      allies: string;
      timeline: string;
      duration: string;
      milestones: string;
      resources: string;
      resourceTypes: string;
      venueType: string;
      materials: string;
      equipment: string;
      venue: string;
      team: string;
      teamSize: string;
      roles: string;
      recruitment: string;
      communication: string;
      outreach: string;
      channels: string;
      socialMedia: string;
      press: string;
      contentCalendar: string;
      budget: string;
      totalBudget: string;
      expenses: string;
      funding: string;
      contingency: string;
      riskAssessment: string;
      risks: string;
      legal: string;
      safety: string;
      crisisPlan: string;
      nextSteps: string;
      nextStepsContent: readonly string[];
    };
    notProvided: string;
  };
}

export const StepLaunch = forwardRef<StepLaunchRef, StepLaunchProps>(({ data, planUrl, labels }, ref) => {
  const planRef = useRef<HTMLDivElement>(null);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [pdfMode, setPdfMode] = useState<PdfMode>("edit");
  const onCompleteRef = useRef<(() => void) | undefined>();

  const handleDownloadPDF = (mode?: PdfMode, onComplete?: () => void) => {
    const selectedMode = mode || pdfMode;
    if (!planRef.current) return;

    // Temporarily toggle link/footer visibility based on mode
    const linkEl = planRef.current.querySelector("[data-pdf-edit-link]") as HTMLElement | null;
    if (linkEl) {
      linkEl.style.display = selectedMode === "edit" ? "block" : "none";
    }

    const campaignName = data.goalSetting.campaignName || "Campaign";
    const suffix = selectedMode === "read" ? "_ReadOnly" : "";
    const filename = `${campaignName.replace(/\s+/g, "_")}_Plan${suffix}.pdf`;

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
    };

    html2pdf().set(opt).from(planRef.current).save().then(() => {
      // Restore visibility
      if (linkEl) {
        linkEl.style.display = "block";
      }
      onComplete?.();
    });
  };

  const handleDownloadClick = (onComplete?: () => void) => {
    onCompleteRef.current = onComplete;
    setShowModeDialog(true);
  };

  const handleModeConfirm = (mode: PdfMode) => {
    setPdfMode(mode);
    setShowModeDialog(false);
    handleDownloadPDF(mode, onCompleteRef.current);
    onCompleteRef.current = undefined;
  };

  useImperativeHandle(ref, () => ({
    downloadPDF: (onComplete?: () => void) => handleDownloadClick(onComplete),
  }));

  const formatDate = (dateStr: string) => {
    if (!dateStr) return labels.notProvided;
    return new Date(dateStr).toLocaleDateString();
  };

  const renderValue = (value: string | string[] | undefined) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return <span className="text-muted-foreground italic">{labels.notProvided}</span>;
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  const buildVenueUrl = () => {
    const baseUrl = `${window.location.origin}/venues`;
    const params = new URLSearchParams();
    const venueType = data.resources.venueType;
    if (venueType === "indoor" || venueType === "outdoor") {
      params.set("type", venueType);
    } else if (venueType === "both") {
      params.set("type", "indoor,outdoor");
    }
    const count = data.targetAudience.participantCount;
    if (count) {
      const match = count.match(/(\d+)$/);
      if (match) {
        params.set("capacity", match[1]);
      }
    }
    const qs = params.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary border-b border-border pb-2 mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <span className="font-medium text-muted-foreground">{label}:</span>
      <span className="md:col-span-2">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Download Button */}
      <div className="flex justify-center">
        <Button onClick={() => handleDownloadClick()} variant="hero" size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          {labels.downloadPlan}
        </Button>
      </div>

      {/* PDF Mode Selection Dialog */}
      <Dialog open={showModeDialog} onOpenChange={setShowModeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{labels.pdfModeDialog.title}</DialogTitle>
            <DialogDescription>{labels.pdfModeDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <button
              onClick={() => handleModeConfirm("edit")}
              className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors text-left"
            >
              <Edit className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{labels.pdfModeDialog.editMode}</p>
                <p className="text-sm text-muted-foreground">{labels.pdfModeDialog.editModeDesc}</p>
              </div>
            </button>
            <button
              onClick={() => handleModeConfirm("read")}
              className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors text-left"
            >
              <Eye className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{labels.pdfModeDialog.readMode}</p>
                <p className="text-sm text-muted-foreground">{labels.pdfModeDialog.readModeDesc}</p>
              </div>
            </button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowModeDialog(false)}>
              {labels.pdfModeDialog.cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Plan Document */}
      <div
        ref={planRef}
        className="bg-background border-2 border-border rounded-lg p-6 md:p-8 space-y-6"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-primary pb-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {data.goalSetting.campaignName || labels.campaignPlanTitle}
          </h1>
          <p className="text-lg text-foreground">{labels.campaignPlanTitle}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {labels.generatedOn}: {new Date().toLocaleDateString()}
          </p>
          <p className="text-xs text-muted-foreground mt-3" data-pdf-edit-link>
            {labels.planLinkLabel}:{" "}
            <a 
              href={planUrl} 
              className="text-primary underline break-all"
              style={{ color: "hsl(var(--primary))" }}
            >
              {planUrl}
            </a>
          </p>
        </div>

        {/* 1. Campaign Overview */}
        <Section title={`1. ${labels.sections.overview}`}>
          <Field label={labels.sections.campaignName} value={renderValue(data.goalSetting.campaignName)} />
          <Field label={labels.sections.goal} value={renderValue(data.goalSetting.goalStatement)} />
          <Field label={labels.sections.type} value={renderValue(data.goalSetting.campaignType)} />
          <Field label={labels.sections.successMetric} value={renderValue(data.goalSetting.successMetric)} />
        </Section>

        {/* 2. Target Audience */}
        <Section title={`2. ${labels.sections.targetAudience}`}>
          <Field label={labels.sections.primaryAudience} value={renderValue(data.targetAudience.primaryAudience)} />
          <Field label={labels.sections.participantCount} value={renderValue(data.targetAudience.participantCount)} />
          <Field label={labels.sections.ageGroups} value={renderValue(data.targetAudience.ageGroups)} />
          <Field label={labels.sections.geographicFocus} value={renderValue(data.targetAudience.geographicFocus)} />
          <Field label={labels.sections.keyStakeholders} value={renderValue(data.targetAudience.keyStakeholders)} />
        </Section>

        {/* 3. Strategy */}
        <Section title={`3. ${labels.sections.strategy}`}>
          <Field label={labels.sections.approach} value={renderValue(data.strategy.mainApproach)} />
          <Field label={labels.sections.tactics} value={renderValue(data.strategy.tactics)} />
          <Field label={labels.sections.keyMessages} value={renderValue(data.strategy.keyMessages)} />
          <Field label={labels.sections.allies} value={renderValue(data.strategy.potentialAllies)} />
        </Section>

        {/* 4. Timeline */}
        <Section title={`4. ${labels.sections.timeline}`}>
          <Field
            label={labels.sections.duration}
            value={
              data.timeline.startDate && data.timeline.endDate
                ? `${formatDate(data.timeline.startDate)} - ${formatDate(data.timeline.endDate)}`
                : labels.notProvided
            }
          />
          {data.timeline.milestones.length > 0 && (
            <div className="mt-3">
              <p className="font-medium text-muted-foreground mb-2">{labels.sections.milestones}:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                {data.timeline.milestones.map((m, i) => (
                  <li key={i}>
                    <span className="font-medium">{m.title}</span> - {formatDate(m.date)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* 5. Resources */}
        <Section title={`5. ${labels.sections.resources}`}>
          <Field label={labels.sections.resourceTypes} value={renderValue(data.resources.resourceTypes)} />
          <Field label={labels.sections.venueType} value={renderValue(data.resources.venueType)} />
          <Field label={labels.sections.materials} value={renderValue(data.resources.materialsNeeded)} />
          <Field label={labels.sections.equipment} value={renderValue(data.resources.toolsAndEquipment)} />
          <Field label={labels.sections.venue} value={renderValue(data.resources.venueRequirements)} />
          
          {/* Venue Booking CTA */}
          {(() => {
            const venueUrl = buildVenueUrl();
            return (
              <div className="mt-4">
                <a
                  href={venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-primary to-creative text-primary-foreground rounded-lg p-4 text-center font-semibold hover:opacity-90 transition-opacity no-underline"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--creative)))",
                    color: "white",
                    padding: "16px",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {labels.venueBookingCta}
                </a>
              </div>
            );
          })()}
        </Section>

        {/* 6. Team */}
        <Section title={`6. ${labels.sections.team}`}>
          <Field label={labels.sections.teamSize} value={renderValue(data.team.teamSize)} />
          {data.team.roles.length > 0 && (
            <div className="mt-3">
              <p className="font-medium text-muted-foreground mb-2">{labels.sections.roles}:</p>
              <ul className="space-y-2 ml-2">
                {data.team.roles.map((role, i) => (
                  <li key={i} className="border-l-2 border-primary/30 pl-3">
                    <span className="font-medium">{role.title}</span>
                    <p className="text-sm text-muted-foreground">{role.responsibilities}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Field label={labels.sections.recruitment} value={renderValue(data.team.recruitmentPlan)} />
          <Field label={labels.sections.communication} value={renderValue(data.team.communicationChannels)} />
        </Section>

        {/* 7. Outreach */}
        <Section title={`7. ${labels.sections.outreach}`}>
          <Field label={labels.sections.channels} value={renderValue(data.outreach.channels)} />
          <Field label={labels.sections.socialMedia} value={renderValue(data.outreach.socialMediaPlan)} />
          <Field label={labels.sections.press} value={renderValue(data.outreach.pressStrategy)} />
          <Field label={labels.sections.contentCalendar} value={renderValue(data.outreach.contentCalendar)} />
        </Section>

        {/* 8. Budget */}
        <Section title={`8. ${labels.sections.budget}`}>
          <Field label={labels.sections.totalBudget} value={renderValue(data.budget.totalBudget)} />
          {data.budget.expenseCategories.length > 0 && (
            <div className="mt-3">
              <p className="font-medium text-muted-foreground mb-2">{labels.sections.expenses}:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2 border-b">Category</th>
                      <th className="text-left p-2 border-b">Amount</th>
                      <th className="text-left p-2 border-b">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.budget.expenseCategories.map((exp, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="p-2">{exp.category}</td>
                        <td className="p-2">{exp.amount}</td>
                        <td className="p-2 text-muted-foreground">{exp.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <Field label={labels.sections.funding} value={renderValue(data.budget.fundingSources)} />
          <Field label={labels.sections.contingency} value={renderValue(data.budget.contingencyPlan)} />
        </Section>

        {/* 9. Risk Assessment */}
        <Section title={`9. ${labels.sections.riskAssessment}`}>
          {data.riskAssessment.risks.length > 0 && (
            <div className="mb-3">
              <p className="font-medium text-muted-foreground mb-2">{labels.sections.risks}:</p>
              <div className="space-y-2">
                {data.riskAssessment.risks.map((risk, i) => (
                  <div key={i} className="border border-border rounded p-3 bg-muted/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{risk.risk}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          risk.likelihood === "high"
                            ? "bg-destructive/20 text-destructive"
                            : risk.likelihood === "medium"
                            ? "bg-yellow-500/20 text-yellow-700"
                            : "bg-green-500/20 text-green-700"
                        }`}
                      >
                        {risk.likelihood}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Field label={labels.sections.legal} value={renderValue(data.riskAssessment.legalConsiderations)} />
          <Field label={labels.sections.safety} value={renderValue(data.riskAssessment.safetyPlan)} />
          <Field label={labels.sections.crisisPlan} value={renderValue(data.riskAssessment.communicationCrisisPlan)} />
        </Section>

        {/* 10. Next Steps */}
        <Section title={`10. ${labels.sections.nextSteps}`}>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <ul className="space-y-2">
              {labels.sections.nextStepsContent.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Path2Action Footer */}
        <div className="border-t-2 border-border pt-6 mt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <img 
              src="/favicon.png" 
              alt="Path2Action logo" 
              className="h-6 w-6"
              style={{ height: "24px", width: "24px" }}
            />
            <p className="text-sm text-muted-foreground">
              {labels.poweredBy}{" "}
              <a 
                href={labels.platformUrl} 
                className="font-semibold text-primary hover:underline"
                style={{ color: "hsl(var(--primary))" }}
              >
                {labels.platformName}
              </a>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
});
