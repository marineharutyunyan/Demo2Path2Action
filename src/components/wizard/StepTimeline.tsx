import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { AIImproveButton } from "./AIImproveButton";

interface StepTimelineProps {
  data: {
    startDate: string;
    endDate: string;
    milestones: { title: string; date: string }[];
  };
  onChange: (data: StepTimelineProps["data"]) => void;
  labels: {
    startDate: string;
    endDate: string;
    milestones: string;
    milestonesDescription: string;
    milestoneTitle: string;
    milestoneTitlePlaceholder: string;
    milestoneDate: string;
    addMilestone: string;
    removeMilestone: string;
  };
}

export const StepTimeline = ({ data, onChange, labels }: StepTimelineProps) => {
  const handleChange = (field: "startDate" | "endDate", value: string) => {
    onChange({ ...data, [field]: value });
  };

  const addMilestone = () => {
    onChange({
      ...data,
      milestones: [...data.milestones, { title: "", date: "" }],
    });
  };

  const removeMilestone = (index: number) => {
    const updated = data.milestones.filter((_, i) => i !== index);
    onChange({ ...data, milestones: updated });
  };

  const updateMilestone = (index: number, field: "title" | "date", value: string) => {
    const updated = data.milestones.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    onChange({ ...data, milestones: updated });
  };

  return (
    <div className="space-y-6">
      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-base font-medium">
            {labels.startDate}
          </Label>
          <Input
            id="startDate"
            type="date"
            value={data.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-base font-medium">
            {labels.endDate}
          </Label>
          <Input
            id="endDate"
            type="date"
            value={data.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">{labels.milestones}</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {labels.milestonesDescription}
          </p>
        </div>

        <div className="space-y-3">
          {data.milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex gap-3 items-start p-4 border border-border rounded-lg bg-muted/30"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{labels.milestoneTitle}</Label>
                    <AIImproveButton
                      currentValue={milestone.title}
                      fieldContext="Milestone title - a key checkpoint in the campaign timeline"
                      onAccept={(value) => updateMilestone(index, "title", value)}
                    />
                  </div>
                  <Input
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, "title", e.target.value)}
                    placeholder={labels.milestoneTitlePlaceholder}
                    className="h-10"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">{labels.milestoneDate}</Label>
                  <Input
                    type="date"
                    value={milestone.date}
                    onChange={(e) => updateMilestone(index, "date", e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeMilestone(index)}
                className="mt-6 text-muted-foreground hover:text-destructive"
                aria-label={labels.removeMilestone}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addMilestone}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {labels.addMilestone}
        </Button>
      </div>
    </div>
  );
};
