import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AIImproveButton } from "./AIImproveButton";

interface StepStrategyProps {
  data: {
    mainApproach: string;
    tactics: string[];
    keyMessages: string;
    potentialAllies: string;
  };
  onChange: (data: StepStrategyProps["data"]) => void;
  labels: {
    mainApproach: string;
    mainApproachPlaceholder: string;
    tactics: string;
    tacticOptions: {
      socialMedia: string;
      publicEvents: string;
      petitions: string;
      mediaOutreach: string;
      directAction: string;
      education: string;
    };
    keyMessages: string;
    keyMessagesPlaceholder: string;
    potentialAllies: string;
    potentialAlliesPlaceholder: string;
  };
}

export const StepStrategy = ({ data, onChange, labels }: StepStrategyProps) => {
  const handleChange = (field: keyof typeof data, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const toggleTactic = (tactic: string) => {
    const current = data.tactics;
    const updated = current.includes(tactic)
      ? current.filter((t) => t !== tactic)
      : [...current, tactic];
    handleChange("tactics", updated);
  };

  const tacticKeys = ["socialMedia", "publicEvents", "petitions", "mediaOutreach", "directAction", "education"] as const;

  return (
    <div className="space-y-6">
      {/* Main Approach */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="mainApproach" className="text-base font-medium">
            {labels.mainApproach}
          </Label>
          <AIImproveButton
            currentValue={data.mainApproach}
            fieldContext="Main approach - the overall strategy for achieving campaign goals"
            onAccept={(value) => handleChange("mainApproach", value)}
          />
        </div>
        <Textarea
          id="mainApproach"
          value={data.mainApproach}
          onChange={(e) => handleChange("mainApproach", e.target.value)}
          placeholder={labels.mainApproachPlaceholder}
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Tactics */}
      <div className="space-y-3">
        <Label className="text-base font-medium">{labels.tactics}</Label>
        <div className="grid grid-cols-2 gap-3">
          {tacticKeys.map((key) => (
            <div
              key={key}
              className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-base cursor-pointer"
              onClick={() => toggleTactic(key)}
            >
              <Checkbox
                id={key}
                checked={data.tactics.includes(key)}
                onCheckedChange={() => toggleTactic(key)}
              />
              <Label htmlFor={key} className="cursor-pointer font-normal">
                {labels.tacticOptions[key]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Key Messages */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="keyMessages" className="text-base font-medium">
            {labels.keyMessages}
          </Label>
          <AIImproveButton
            currentValue={data.keyMessages}
            fieldContext="Key messages - the main points to communicate to the audience"
            onAccept={(value) => handleChange("keyMessages", value)}
          />
        </div>
        <Textarea
          id="keyMessages"
          value={data.keyMessages}
          onChange={(e) => handleChange("keyMessages", e.target.value)}
          placeholder={labels.keyMessagesPlaceholder}
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Potential Allies */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="potentialAllies" className="text-base font-medium">
            {labels.potentialAllies}
          </Label>
          <AIImproveButton
            currentValue={data.potentialAllies}
            fieldContext="Potential allies - organizations or individuals who might support the campaign"
            onAccept={(value) => handleChange("potentialAllies", value)}
          />
        </div>
        <Textarea
          id="potentialAllies"
          value={data.potentialAllies}
          onChange={(e) => handleChange("potentialAllies", e.target.value)}
          placeholder={labels.potentialAlliesPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
};
