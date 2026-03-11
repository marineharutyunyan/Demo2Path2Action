import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { AIImproveButton } from "./AIImproveButton";

interface RiskAssessmentData {
  risks: { risk: string; likelihood: string; mitigation: string }[];
  legalConsiderations: string;
  safetyPlan: string;
  communicationCrisisPlan: string;
}

interface StepRiskAssessmentProps {
  data: RiskAssessmentData;
  onChange: (data: RiskAssessmentData) => void;
  labels: {
    risks: string;
    risksDescription: string;
    riskName: string;
    riskNamePlaceholder: string;
    likelihood: string;
    likelihoodOptions: {
      low: string;
      medium: string;
      high: string;
    };
    mitigation: string;
    mitigationPlaceholder: string;
    addRisk: string;
    removeRisk: string;
    legalConsiderations: string;
    legalConsiderationsPlaceholder: string;
    safetyPlan: string;
    safetyPlanPlaceholder: string;
    communicationCrisisPlan: string;
    communicationCrisisPlanPlaceholder: string;
  };
}

export function StepRiskAssessment({ data, onChange, labels }: StepRiskAssessmentProps) {
  const addRisk = () => {
    onChange({
      ...data,
      risks: [...data.risks, { risk: "", likelihood: "medium", mitigation: "" }],
    });
  };

  const removeRisk = (index: number) => {
    const updated = data.risks.filter((_, i) => i !== index);
    onChange({ ...data, risks: updated });
  };

  const updateRisk = (
    index: number,
    field: "risk" | "likelihood" | "mitigation",
    value: string
  ) => {
    const updated = data.risks.map((risk, i) =>
      i === index ? { ...risk, [field]: value } : risk
    );
    onChange({ ...data, risks: updated });
  };

  return (
    <div className="space-y-6">
      {/* Risks */}
      <div className="space-y-4">
        <div>
          <Label>{labels.risks}</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {labels.risksDescription}
          </p>
        </div>

        {data.risks.map((riskItem, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 bg-muted/30"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`risk-${index}`}>{labels.riskName}</Label>
                <AIImproveButton
                  currentValue={riskItem.risk}
                  fieldContext="Risk name - a potential risk or challenge for the campaign"
                  onAccept={(value) => updateRisk(index, "risk", value)}
                />
              </div>
              <Input
                id={`risk-${index}`}
                value={riskItem.risk}
                onChange={(e) => updateRisk(index, "risk", e.target.value)}
                placeholder={labels.riskNamePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`likelihood-${index}`}>{labels.likelihood}</Label>
              <select
                id={`likelihood-${index}`}
                value={riskItem.likelihood}
                onChange={(e) => updateRisk(index, "likelihood", e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="low">{labels.likelihoodOptions.low}</option>
                <option value="medium">{labels.likelihoodOptions.medium}</option>
                <option value="high">{labels.likelihoodOptions.high}</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`mitigation-${index}`}>{labels.mitigation}</Label>
                <AIImproveButton
                  currentValue={riskItem.mitigation}
                  fieldContext="Risk mitigation - how to prevent or handle this risk"
                  onAccept={(value) => updateRisk(index, "mitigation", value)}
                />
              </div>
              <Textarea
                id={`mitigation-${index}`}
                value={riskItem.mitigation}
                onChange={(e) => updateRisk(index, "mitigation", e.target.value)}
                placeholder={labels.mitigationPlaceholder}
                rows={2}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeRisk(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {labels.removeRisk}
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRisk}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {labels.addRisk}
        </Button>
      </div>

      {/* Legal Considerations */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="legalConsiderations">{labels.legalConsiderations}</Label>
          <AIImproveButton
            currentValue={data.legalConsiderations}
            fieldContext="Legal considerations - legal aspects to be aware of"
            onAccept={(value) => onChange({ ...data, legalConsiderations: value })}
          />
        </div>
        <Textarea
          id="legalConsiderations"
          value={data.legalConsiderations}
          onChange={(e) => onChange({ ...data, legalConsiderations: e.target.value })}
          placeholder={labels.legalConsiderationsPlaceholder}
          rows={3}
        />
      </div>

      {/* Safety Plan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="safetyPlan">{labels.safetyPlan}</Label>
          <AIImproveButton
            currentValue={data.safetyPlan}
            fieldContext="Safety plan - how to ensure participant safety"
            onAccept={(value) => onChange({ ...data, safetyPlan: value })}
          />
        </div>
        <Textarea
          id="safetyPlan"
          value={data.safetyPlan}
          onChange={(e) => onChange({ ...data, safetyPlan: e.target.value })}
          placeholder={labels.safetyPlanPlaceholder}
          rows={3}
        />
      </div>

      {/* Communication Crisis Plan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="communicationCrisisPlan">{labels.communicationCrisisPlan}</Label>
          <AIImproveButton
            currentValue={data.communicationCrisisPlan}
            fieldContext="Communication crisis plan - how to handle PR issues"
            onAccept={(value) => onChange({ ...data, communicationCrisisPlan: value })}
          />
        </div>
        <Textarea
          id="communicationCrisisPlan"
          value={data.communicationCrisisPlan}
          onChange={(e) => onChange({ ...data, communicationCrisisPlan: e.target.value })}
          placeholder={labels.communicationCrisisPlanPlaceholder}
          rows={3}
        />
      </div>
    </div>
  );
}
