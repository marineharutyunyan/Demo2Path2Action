import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AIImproveButton } from "./AIImproveButton";

interface StepOutreachProps {
  data: {
    channels: string[];
    socialMediaPlan: string;
    pressStrategy: string;
    contentCalendar: string;
  };
  onChange: (data: StepOutreachProps["data"]) => void;
  labels: {
    channels: string;
    channelOptions: {
      facebook: string;
      instagram: string;
      twitter: string;
      telegram: string;
      email: string;
      press: string;
      flyers: string;
      wordOfMouth: string;
    };
    socialMediaPlan: string;
    socialMediaPlanPlaceholder: string;
    pressStrategy: string;
    pressStrategyPlaceholder: string;
    contentCalendar: string;
    contentCalendarPlaceholder: string;
  };
}

export const StepOutreach = ({ data, onChange, labels }: StepOutreachProps) => {
  const handleChange = (field: keyof typeof data, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const toggleChannel = (channel: string) => {
    const current = data.channels;
    const updated = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    handleChange("channels", updated);
  };

  const channelKeys = ["facebook", "instagram", "twitter", "telegram", "email", "press", "flyers", "wordOfMouth"] as const;

  return (
    <div className="space-y-6">
      {/* Communication Channels */}
      <div className="space-y-3">
        <Label className="text-base font-medium">{labels.channels}</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {channelKeys.map((key) => (
            <div
              key={key}
              className="flex items-center space-x-3 border border-border rounded-lg p-3 hover:bg-muted/50 transition-base cursor-pointer"
              onClick={() => toggleChannel(key)}
            >
              <Checkbox
                id={key}
                checked={data.channels.includes(key)}
                onCheckedChange={() => toggleChannel(key)}
              />
              <Label htmlFor={key} className="cursor-pointer font-normal text-sm">
                {labels.channelOptions[key]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Plan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="socialMediaPlan" className="text-base font-medium">
            {labels.socialMediaPlan}
          </Label>
          <AIImproveButton
            currentValue={data.socialMediaPlan}
            fieldContext="Social media plan - strategy for social media engagement"
            onAccept={(value) => handleChange("socialMediaPlan", value)}
          />
        </div>
        <Textarea
          id="socialMediaPlan"
          value={data.socialMediaPlan}
          onChange={(e) => handleChange("socialMediaPlan", e.target.value)}
          placeholder={labels.socialMediaPlanPlaceholder}
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Press Strategy */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="pressStrategy" className="text-base font-medium">
            {labels.pressStrategy}
          </Label>
          <AIImproveButton
            currentValue={data.pressStrategy}
            fieldContext="Press strategy - plan for media and press outreach"
            onAccept={(value) => handleChange("pressStrategy", value)}
          />
        </div>
        <Textarea
          id="pressStrategy"
          value={data.pressStrategy}
          onChange={(e) => handleChange("pressStrategy", e.target.value)}
          placeholder={labels.pressStrategyPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Content Calendar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="contentCalendar" className="text-base font-medium">
            {labels.contentCalendar}
          </Label>
          <AIImproveButton
            currentValue={data.contentCalendar}
            fieldContext="Content calendar - schedule for content publication"
            onAccept={(value) => handleChange("contentCalendar", value)}
          />
        </div>
        <Textarea
          id="contentCalendar"
          value={data.contentCalendar}
          onChange={(e) => handleChange("contentCalendar", e.target.value)}
          placeholder={labels.contentCalendarPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
};
