import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIImproveButton } from "./AIImproveButton";

interface StepTargetAudienceProps {
  data: {
    primaryAudience: string;
    participantCount: string;
    ageGroups: string[];
    geographicFocus: string;
    keyStakeholders: string;
  };
  onChange: (data: StepTargetAudienceProps["data"]) => void;
  labels: {
    primaryAudience: string;
    primaryAudiencePlaceholder: string;
    participantCount: string;
    participantCountOptions: {
      "1-20": string;
      "21-50": string;
      "51-100": string;
      "101-200": string;
      "201-500": string;
      "500+": string;
      custom: string;
    };
    participantCountPlaceholder: string;
    ageGroups: string;
    ageGroupOptions: {
      youth: string;
      youngAdults: string;
      adults: string;
      seniors: string;
      allAges: string;
    };
    geographicFocus: string;
    geographicFocusPlaceholder: string;
    keyStakeholders: string;
    keyStakeholdersPlaceholder: string;
  };
}

const participantRangeKeys = ["1-20", "21-50", "51-100", "101-200", "201-500", "500+", "custom"] as const;

export const StepTargetAudience = ({ data, onChange, labels }: StepTargetAudienceProps) => {
  const isPresetRange = participantRangeKeys.slice(0, -1).some(k => k === data.participantCount);
  const [showCustomInput, setShowCustomInput] = useState(!isPresetRange && data.participantCount !== "");

  const handleChange = (field: keyof typeof data, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const handleParticipantSelect = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      handleChange("participantCount", "");
    } else {
      setShowCustomInput(false);
      handleChange("participantCount", value);
    }
  };

  const toggleAgeGroup = (group: string) => {
    const current = data.ageGroups;
    const updated = current.includes(group)
      ? current.filter((g) => g !== group)
      : [...current, group];
    handleChange("ageGroups", updated);
  };

  const ageGroupKeys = ["youth", "youngAdults", "adults", "seniors", "allAges"] as const;

  const currentSelectValue = showCustomInput ? "custom" : (data.participantCount || undefined);

  return (
    <div className="space-y-6">
      {/* Primary Audience */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="primaryAudience" className="text-base font-medium">
            {labels.primaryAudience}
          </Label>
          <AIImproveButton
            currentValue={data.primaryAudience}
            fieldContext="Primary audience - the main group of people the campaign targets"
            onAccept={(value) => handleChange("primaryAudience", value)}
          />
        </div>
        <Input
          id="primaryAudience"
          value={data.primaryAudience}
          onChange={(e) => handleChange("primaryAudience", e.target.value)}
          placeholder={labels.primaryAudiencePlaceholder}
          className="h-12"
        />
      </div>

      {/* Participant Count */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{labels.participantCount}</Label>
        <Select value={currentSelectValue} onValueChange={handleParticipantSelect}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={labels.participantCount} />
          </SelectTrigger>
          <SelectContent>
            {participantRangeKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {labels.participantCountOptions[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showCustomInput && (
          <Input
            type="number"
            min={1}
            value={data.participantCount}
            onChange={(e) => handleChange("participantCount", e.target.value)}
            placeholder={labels.participantCountPlaceholder}
            className="h-12 mt-2"
          />
        )}
      </div>

      {/* Age Groups */}
      <div className="space-y-3">
        <Label className="text-base font-medium">{labels.ageGroups}</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ageGroupKeys.map((key) => (
            <div
              key={key}
              className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-base cursor-pointer"
              onClick={() => toggleAgeGroup(key)}
            >
              <Checkbox
                id={key}
                checked={data.ageGroups.includes(key)}
                onCheckedChange={() => toggleAgeGroup(key)}
              />
              <Label htmlFor={key} className="cursor-pointer font-normal">
                {labels.ageGroupOptions[key]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Focus */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="geographicFocus" className="text-base font-medium">
            {labels.geographicFocus}
          </Label>
          <AIImproveButton
            currentValue={data.geographicFocus}
            fieldContext="Geographic focus - the location or region the campaign targets"
            onAccept={(value) => handleChange("geographicFocus", value)}
          />
        </div>
        <Input
          id="geographicFocus"
          value={data.geographicFocus}
          onChange={(e) => handleChange("geographicFocus", e.target.value)}
          placeholder={labels.geographicFocusPlaceholder}
          className="h-12"
        />
      </div>

      {/* Key Stakeholders */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="keyStakeholders" className="text-base font-medium">
            {labels.keyStakeholders}
          </Label>
          <AIImproveButton
            currentValue={data.keyStakeholders}
            fieldContext="Key stakeholders - important individuals, organizations, or groups to engage"
            onAccept={(value) => handleChange("keyStakeholders", value)}
          />
        </div>
        <Textarea
          id="keyStakeholders"
          value={data.keyStakeholders}
          onChange={(e) => handleChange("keyStakeholders", e.target.value)}
          placeholder={labels.keyStakeholdersPlaceholder}
          className="min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
};
