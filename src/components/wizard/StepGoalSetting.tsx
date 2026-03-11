import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AIImproveButton } from "./AIImproveButton";

interface StepGoalSettingProps {
  data: {
    campaignName: string;
    goalStatement: string;
    campaignType: string;
    successMetric: string;
  };
  onChange: (data: StepGoalSettingProps["data"]) => void;
  labels: {
    campaignName: string;
    campaignNamePlaceholder: string;
    goalStatement: string;
    goalStatementPlaceholder: string;
    campaignType: string;
    campaignTypes: {
      awareness: string;
      petition: string;
      event: string;
      advocacy: string;
    };
    successMetric: string;
    successMetricPlaceholder: string;
  };
}

export const StepGoalSetting = ({ data, onChange, labels }: StepGoalSettingProps) => {
  const handleChange = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const campaignContext = data.campaignName ? `Campaign: ${data.campaignName}` : undefined;

  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="campaignName" className="text-base font-medium">
            {labels.campaignName}
          </Label>
          <AIImproveButton
            currentValue={data.campaignName}
            fieldContext="Campaign name - a short, memorable title for the civic initiative"
            onAccept={(value) => handleChange("campaignName", value)}
          />
        </div>
        <Input
          id="campaignName"
          value={data.campaignName}
          onChange={(e) => handleChange("campaignName", e.target.value)}
          placeholder={labels.campaignNamePlaceholder}
          className="h-12"
        />
      </div>

      {/* Goal Statement */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="goalStatement" className="text-base font-medium">
            {labels.goalStatement}
          </Label>
          <AIImproveButton
            currentValue={data.goalStatement}
            fieldContext="Goal statement - the main objective and desired outcome of the campaign"
            campaignContext={campaignContext}
            onAccept={(value) => handleChange("goalStatement", value)}
          />
        </div>
        <Textarea
          id="goalStatement"
          value={data.goalStatement}
          onChange={(e) => handleChange("goalStatement", e.target.value)}
          placeholder={labels.goalStatementPlaceholder}
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Campaign Type */}
      <div className="space-y-3">
        <Label className="text-base font-medium">{labels.campaignType}</Label>
        <RadioGroup
          value={data.campaignType}
          onValueChange={(value) => handleChange("campaignType", value)}
          className="grid grid-cols-2 gap-3"
        >
          {Object.entries(labels.campaignTypes).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-base cursor-pointer">
              <RadioGroupItem value={key} id={key} />
              <Label htmlFor={key} className="cursor-pointer font-normal">
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Success Metric */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="successMetric" className="text-base font-medium">
            {labels.successMetric}
          </Label>
          <AIImproveButton
            currentValue={data.successMetric}
            fieldContext="Success metric - how to measure if the campaign achieved its goals"
            campaignContext={campaignContext}
            onAccept={(value) => handleChange("successMetric", value)}
          />
        </div>
        <Input
          id="successMetric"
          value={data.successMetric}
          onChange={(e) => handleChange("successMetric", e.target.value)}
          placeholder={labels.successMetricPlaceholder}
          className="h-12"
        />
      </div>
    </div>
  );
};
