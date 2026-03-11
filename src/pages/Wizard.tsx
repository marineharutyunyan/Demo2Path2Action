import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePlanStorage } from "@/hooks/use-plan-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { ArrowLeft, ArrowRight, Download, RotateCcw, Loader2 } from "lucide-react";
import { cn, generatePlanId } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { StepGoalSetting } from "@/components/wizard/StepGoalSetting";
import { StepTargetAudience } from "@/components/wizard/StepTargetAudience";
import { StepStrategy } from "@/components/wizard/StepStrategy";
import { StepTimeline } from "@/components/wizard/StepTimeline";
import { StepResources } from "@/components/wizard/StepResources";
import { StepTeam } from "@/components/wizard/StepTeam";
import { StepOutreach } from "@/components/wizard/StepOutreach";
import { StepBudget } from "@/components/wizard/StepBudget";
import { StepRiskAssessment } from "@/components/wizard/StepRiskAssessment";
import { StepLaunch, StepLaunchRef } from "@/components/wizard/StepLaunch";

const TOTAL_STEPS = 10;

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

const initialWizardData: WizardData = {
  goalSetting: {
    campaignName: "",
    goalStatement: "",
    campaignType: "",
    successMetric: "",
  },
  targetAudience: {
    primaryAudience: "",
    participantCount: "",
    ageGroups: [],
    geographicFocus: "",
    keyStakeholders: "",
  },
  strategy: {
    mainApproach: "",
    tactics: [],
    keyMessages: "",
    potentialAllies: "",
  },
  timeline: {
    startDate: "",
    endDate: "",
    milestones: [],
  },
  resources: {
    resourceTypes: [],
    venueType: "",
    materialsNeeded: "",
    toolsAndEquipment: "",
    venueRequirements: "",
  },
  team: {
    teamSize: "",
    roles: [],
    recruitmentPlan: "",
    communicationChannels: "",
  },
  outreach: {
    channels: [],
    socialMediaPlan: "",
    pressStrategy: "",
    contentCalendar: "",
  },
  budget: {
    expenseCategories: [],
    totalBudget: "",
    fundingSources: "",
    contingencyPlan: "",
  },
  riskAssessment: {
    risks: [],
    legalConsiderations: "",
    safetyPlan: "",
    communicationCrisisPlan: "",
  },
};

const getStorageKeyData = (planId: string) => `path2action-wizard-data-${planId}`;
const getStorageKeyStep = (planId: string) => `path2action-wizard-step-${planId}`;
const ACTIVE_PLAN_KEY = "path2action-active-plan";

export default function Wizard() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [activePlanId, setActivePlanId] = useState<string | null>(planId || null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Firebase storage hook
  const { savePlan, loadPlan, deletePlan, isLoading: isCloudLoading, isSaving, error: cloudError } = usePlanStorage();
  
  // Restore or generate plan ID
  useEffect(() => {
    if (!planId) {
      // Check if there's an active plan saved in localStorage
      const savedPlanId = localStorage.getItem(ACTIVE_PLAN_KEY);
      if (savedPlanId) {
        // Restore the saved plan
        navigate(`/wizard/${savedPlanId}`, { replace: true });
      } else {
        // Generate new plan ID
        const newPlanId = generatePlanId();
        localStorage.setItem(ACTIVE_PLAN_KEY, newPlanId);
        navigate(`/wizard/${newPlanId}`, { replace: true });
      }
    } else {
      // Save the current plan ID as active
      localStorage.setItem(ACTIVE_PLAN_KEY, planId);
      setActivePlanId(planId);
    }
  }, [planId, navigate]);

  const storageKeyData = activePlanId ? getStorageKeyData(activePlanId) : "";
  const storageKeyStep = activePlanId ? getStorageKeyStep(activePlanId) : "";

  const [currentStep, setCurrentStep] = useLocalStorage<number>(storageKeyStep || "temp-step", 1);
  const [wizardData, setWizardData] = useLocalStorage<WizardData>(storageKeyData || "temp-data", initialWizardData);
  const { language } = useLanguage();
  const t = translations[language].wizard;
  const launchRef = useRef<StepLaunchRef>(null);
  
  // Load plan from Firebase on mount
  useEffect(() => {
    const loadFromCloud = async () => {
      if (!activePlanId) return;
      
      try {
        const cloudData = await loadPlan(activePlanId);
        if (cloudData) {
          // Cloud data exists - use it
          setWizardData(cloudData.wizardData as unknown as WizardData);
          setCurrentStep(cloudData.currentStep);
        }
      } catch (err) {
        console.error("Failed to load from cloud:", err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    loadFromCloud();
  }, [activePlanId, loadPlan, setWizardData, setCurrentStep]);
  
  // Save to Firebase when wizard data changes (after initial load)
  useEffect(() => {
    if (isInitialLoading || !activePlanId) return;
    
    savePlan(activePlanId, wizardData as unknown as Record<string, unknown>, currentStep);
  }, [wizardData, currentStep, activePlanId, savePlan, isInitialLoading]);
  
  // Show cloud error as toast
  useEffect(() => {
    if (cloudError) {
      toast.error(cloudError);
    }
  }, [cloudError]);

  const handleFinish = () => {
    if (launchRef.current) {
      launchRef.current.downloadPDF();
    }
  };

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleStartNewPlan = () => {
    setShowConfirmDialog(true);
  };

  const confirmStartNewPlan = async () => {
    setShowConfirmDialog(false);
    // Generate new plan ID and save as active (old plan remains in database)
    const newPlanId = generatePlanId();
    localStorage.setItem(ACTIVE_PLAN_KEY, newPlanId);
    setIsInitialLoading(false); // Prevent loading for new plan
    navigate(`/wizard/${newPlanId}`);
  };

  const handleDownloadAndClose = () => {
    setShowConfirmDialog(false);
    if (launchRef.current) {
      launchRef.current.downloadPDF(() => {
        // Navigate to new plan after PDF download completes
        const newPlanId = generatePlanId();
        localStorage.setItem(ACTIVE_PLAN_KEY, newPlanId);
        setIsInitialLoading(false);
        navigate(`/wizard/${newPlanId}`);
      });
    }
  };

  // Don't render until we have a valid plan ID
  if (!activePlanId) {
    return null;
  }
  
  // Show loading state while fetching from cloud
  if (isInitialLoading && isCloudLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      scrollToTop();
    }
  };

  const progressPercent = (currentStep / TOTAL_STEPS) * 100;
  const currentStepData = t.steps[currentStep - 1];
  const stepOfText = t.stepOf.replace("{current}", String(currentStep)).replace("{total}", String(TOTAL_STEPS));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepGoalSetting
            data={wizardData.goalSetting}
            onChange={(data) => setWizardData({ ...wizardData, goalSetting: data })}
            labels={t.stepForms.goalSetting}
          />
        );
      case 2:
        return (
          <StepTargetAudience
            data={wizardData.targetAudience}
            onChange={(data) => setWizardData({ ...wizardData, targetAudience: data })}
            labels={t.stepForms.targetAudience}
          />
        );
      case 3:
        return (
          <StepStrategy
            data={wizardData.strategy}
            onChange={(data) => setWizardData({ ...wizardData, strategy: data })}
            labels={t.stepForms.strategy}
          />
        );
      case 4:
        return (
          <StepTimeline
            data={wizardData.timeline}
            onChange={(data) => setWizardData({ ...wizardData, timeline: data })}
            labels={t.stepForms.timeline}
          />
        );
      case 5:
        return (
          <StepResources
            data={wizardData.resources}
            onChange={(data) => setWizardData({ ...wizardData, resources: data })}
            labels={t.stepForms.resources}
          />
        );
      case 6:
        return (
          <StepTeam
            data={wizardData.team}
            onChange={(data) => setWizardData({ ...wizardData, team: data })}
            labels={t.stepForms.team}
          />
        );
      case 7:
        return (
          <StepOutreach
            data={wizardData.outreach}
            onChange={(data) => setWizardData({ ...wizardData, outreach: data })}
            labels={t.stepForms.outreach}
          />
        );
      case 8:
        return (
          <StepBudget
            data={wizardData.budget}
            onChange={(data) => setWizardData({ ...wizardData, budget: data })}
            labels={t.stepForms.budget}
          />
        );
      case 9:
        return (
          <StepRiskAssessment
            data={wizardData.riskAssessment}
            onChange={(data) => setWizardData({ ...wizardData, riskAssessment: data })}
            labels={t.stepForms.riskAssessment}
          />
        );
      case 10:
        return (
          <StepLaunch
            ref={launchRef}
            data={wizardData}
            planUrl={window.location.href}
            labels={t.stepForms.launch}
          />
        );
      default:
        return (
          <div className="bg-muted/50 rounded-lg p-8 text-center text-muted-foreground">
            <p className="mb-4">{currentStepData?.description}</p>
            <p className="text-sm">Form content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-base"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToHome}
        </NavLink>
      </div>

      {/* Wizard Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Step Indicators */}
          <div className="mb-10 px-2">
            <div className="relative flex justify-between items-center">
              {/* Connecting Line Background */}
              <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-muted rounded-full" />
              {/* Progress Line */}
              <div 
                className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r from-primary to-creative rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
              />
              
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
                <button
                  key={step}
                  onClick={() => goToStep(step)}
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    step === currentStep
                      ? "bg-gradient-to-br from-primary to-creative text-primary-foreground shadow-glow scale-110"
                      : step < currentStep
                      ? "bg-primary text-primary-foreground shadow-soft hover:scale-105"
                      : "bg-card text-muted-foreground border-2 border-muted hover:border-primary/50 hover:text-primary hover:scale-105"
                  )}
                  aria-label={`Go to step ${step}`}
                  aria-current={step === currentStep ? "step" : undefined}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Text */}
          <div className="mb-8 flex justify-between items-center text-sm">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">{stepOfText}</span>
              {/* Cloud sync indicator */}
              {isSaving ? (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving...
                </span>
              ) : cloudError ? (
                <span className="text-xs text-destructive">
                  Offline
                </span>
              ) : (
                <span className="text-xs text-primary">
                  Saved
                </span>
              )}
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {Math.round(progressPercent)}%
            </span>
          </div>

          {/* Step Card */}
          <Card className="shadow-glow border-2">
            <CardHeader>
              <CardTitle className="text-3xl">
                {currentStepData?.title}
              </CardTitle>
              <CardDescription className="text-base">
                {currentStepData?.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 pt-4">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.previous}
                </Button>
                {currentStep === TOTAL_STEPS ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleStartNewPlan}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {t.stepForms.launch.startNewPlan}
                    </Button>
                    <Button
                      onClick={handleFinish}
                      variant="hero"
                      size="lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t.stepForms.launch.downloadPlan}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={nextStep}
                    variant="hero"
                    size="lg"
                  >
                    {t.next}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="w-[96vw] max-w-2xl p-8 sm:p-10">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.stepForms.launch.confirmDialog.title}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <span className="block">{t.stepForms.launch.confirmDialog.description}</span>
              <span className="block text-sm text-primary font-medium">
                💡 {t.stepForms.launch.confirmDialog.hint}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <AlertDialogCancel className="min-w-[120px]">{t.stepForms.launch.confirmDialog.cancel}</AlertDialogCancel>
            <Button variant="outline" onClick={handleDownloadAndClose} className="min-w-[220px] whitespace-nowrap">
              <Download className="mr-2 h-4 w-4" />
              {t.stepForms.launch.confirmDialog.download}
            </Button>
            <AlertDialogAction onClick={confirmStartNewPlan} className="min-w-[150px] whitespace-nowrap bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.stepForms.launch.confirmDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
