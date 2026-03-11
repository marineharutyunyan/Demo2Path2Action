import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIImproveButton } from "./AIImproveButton";

interface StepResourcesProps {
  data: {
    resourceTypes: string[];
    venueType: string;
    materialsNeeded: string;
    toolsAndEquipment: string;
    venueRequirements: string;
  };
  onChange: (data: StepResourcesProps["data"]) => void;
  labels: {
    resourceTypes: string;
    resourceTypeOptions: {
      printing: string;
      digital: string;
      venue: string;
      transportation: string;
      food: string;
      equipment: string;
    };
    venueType: string;
    venueTypeOptions: {
      indoor: string;
      outdoor: string;
      both: string;
      online: string;
      custom: string;
    };
    venueTypePlaceholder: string;
    materialsNeeded: string;
    materialsNeededPlaceholder: string;
    toolsAndEquipment: string;
    toolsAndEquipmentPlaceholder: string;
    venueRequirements: string;
    venueRequirementsPlaceholder: string;
  };
}

const venueTypeKeys = ["indoor", "outdoor", "both", "online", "custom"] as const;

export const StepResources = ({ data, onChange, labels }: StepResourcesProps) => {
  const isPresetType = venueTypeKeys.slice(0, -1).some(k => k === data.venueType);
  const [showCustomVenue, setShowCustomVenue] = useState(!isPresetType && data.venueType !== "" && data.venueType !== undefined);

  const handleChange = (field: keyof typeof data, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const handleVenueTypeSelect = (value: string) => {
    if (value === "custom") {
      setShowCustomVenue(true);
      handleChange("venueType", "");
    } else {
      setShowCustomVenue(false);
      handleChange("venueType", value);
    }
  };

  const toggleResourceType = (type: string) => {
    const current = data.resourceTypes;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    handleChange("resourceTypes", updated);
  };

  const resourceTypeKeys = ["printing", "digital", "venue", "transportation", "food", "equipment"] as const;

  const currentVenueValue = showCustomVenue ? "custom" : (data.venueType || undefined);

  return (
    <div className="space-y-6">
      {/* Resource Types */}
      <div className="space-y-3">
        <Label className="text-base font-medium">{labels.resourceTypes}</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {resourceTypeKeys.map((key) => (
            <div
              key={key}
              className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-base cursor-pointer"
              onClick={() => toggleResourceType(key)}
            >
              <Checkbox
                id={key}
                checked={data.resourceTypes.includes(key)}
                onCheckedChange={() => toggleResourceType(key)}
              />
              <Label htmlFor={key} className="cursor-pointer font-normal">
                {labels.resourceTypeOptions[key]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Type */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{labels.venueType}</Label>
        <Select value={currentVenueValue} onValueChange={handleVenueTypeSelect}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={labels.venueType} />
          </SelectTrigger>
          <SelectContent>
            {venueTypeKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {labels.venueTypeOptions[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showCustomVenue && (
          <Input
            value={data.venueType}
            onChange={(e) => handleChange("venueType", e.target.value)}
            placeholder={labels.venueTypePlaceholder}
            className="h-12 mt-2"
          />
        )}
      </div>

      {/* Materials Needed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="materialsNeeded" className="text-base font-medium">
            {labels.materialsNeeded}
          </Label>
          <AIImproveButton
            currentValue={data.materialsNeeded}
            fieldContext="Materials needed - physical materials required for the campaign"
            onAccept={(value) => handleChange("materialsNeeded", value)}
          />
        </div>
        <Textarea
          id="materialsNeeded"
          value={data.materialsNeeded}
          onChange={(e) => handleChange("materialsNeeded", e.target.value)}
          placeholder={labels.materialsNeededPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Tools and Equipment */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="toolsAndEquipment" className="text-base font-medium">
            {labels.toolsAndEquipment}
          </Label>
          <AIImproveButton
            currentValue={data.toolsAndEquipment}
            fieldContext="Tools and equipment - technical tools and equipment needed"
            onAccept={(value) => handleChange("toolsAndEquipment", value)}
          />
        </div>
        <Textarea
          id="toolsAndEquipment"
          value={data.toolsAndEquipment}
          onChange={(e) => handleChange("toolsAndEquipment", e.target.value)}
          placeholder={labels.toolsAndEquipmentPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Venue Requirements */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="venueRequirements" className="text-base font-medium">
            {labels.venueRequirements}
          </Label>
          <AIImproveButton
            currentValue={data.venueRequirements}
            fieldContext="Venue requirements - space and location needs for events"
            onAccept={(value) => handleChange("venueRequirements", value)}
          />
        </div>
        <Textarea
          id="venueRequirements"
          value={data.venueRequirements}
          onChange={(e) => handleChange("venueRequirements", e.target.value)}
          placeholder={labels.venueRequirementsPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
};
