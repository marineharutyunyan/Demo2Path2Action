import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { AIImproveButton } from "./AIImproveButton";

interface StepTeamProps {
  data: {
    teamSize: string;
    roles: { title: string; responsibilities: string }[];
    recruitmentPlan: string;
    communicationChannels: string;
  };
  onChange: (data: StepTeamProps["data"]) => void;
  labels: {
    teamSize: string;
    teamSizePlaceholder: string;
    roles: string;
    rolesDescription: string;
    roleTitle: string;
    roleTitlePlaceholder: string;
    roleResponsibilities: string;
    roleResponsibilitiesPlaceholder: string;
    addRole: string;
    removeRole: string;
    recruitmentPlan: string;
    recruitmentPlanPlaceholder: string;
    communicationChannels: string;
    communicationChannelsPlaceholder: string;
  };
}

export const StepTeam = ({ data, onChange, labels }: StepTeamProps) => {
  const handleChange = (field: "teamSize" | "recruitmentPlan" | "communicationChannels", value: string) => {
    onChange({ ...data, [field]: value });
  };

  const addRole = () => {
    onChange({
      ...data,
      roles: [...data.roles, { title: "", responsibilities: "" }],
    });
  };

  const removeRole = (index: number) => {
    const updated = data.roles.filter((_, i) => i !== index);
    onChange({ ...data, roles: updated });
  };

  const updateRole = (index: number, field: "title" | "responsibilities", value: string) => {
    const updated = data.roles.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    );
    onChange({ ...data, roles: updated });
  };

  return (
    <div className="space-y-6">
      {/* Team Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="teamSize" className="text-base font-medium">
            {labels.teamSize}
          </Label>
          <AIImproveButton
            currentValue={data.teamSize}
            fieldContext="Team size - the number of people needed for the campaign"
            onAccept={(value) => handleChange("teamSize", value)}
          />
        </div>
        <Input
          id="teamSize"
          value={data.teamSize}
          onChange={(e) => handleChange("teamSize", e.target.value)}
          placeholder={labels.teamSizePlaceholder}
          className="h-12"
        />
      </div>

      {/* Roles */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">{labels.roles}</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {labels.rolesDescription}
          </p>
        </div>

        <div className="space-y-3">
          {data.roles.map((role, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg bg-muted/30 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">{labels.roleTitle}</Label>
                      <AIImproveButton
                        currentValue={role.title}
                        fieldContext="Role title - the name/title of the team position"
                        onAccept={(value) => updateRole(index, "title", value)}
                      />
                    </div>
                    <Input
                      value={role.title}
                      onChange={(e) => updateRole(index, "title", e.target.value)}
                      placeholder={labels.roleTitlePlaceholder}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">{labels.roleResponsibilities}</Label>
                      <AIImproveButton
                        currentValue={role.responsibilities}
                        fieldContext="Role responsibilities - tasks and duties for this team position"
                        onAccept={(value) => updateRole(index, "responsibilities", value)}
                      />
                    </div>
                    <Textarea
                      value={role.responsibilities}
                      onChange={(e) => updateRole(index, "responsibilities", e.target.value)}
                      placeholder={labels.roleResponsibilitiesPlaceholder}
                      className="min-h-[60px] resize-none"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRole(index)}
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  aria-label={labels.removeRole}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addRole}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {labels.addRole}
        </Button>
      </div>

      {/* Recruitment Plan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="recruitmentPlan" className="text-base font-medium">
            {labels.recruitmentPlan}
          </Label>
          <AIImproveButton
            currentValue={data.recruitmentPlan}
            fieldContext="Recruitment plan - how to find and recruit team members"
            onAccept={(value) => handleChange("recruitmentPlan", value)}
          />
        </div>
        <Textarea
          id="recruitmentPlan"
          value={data.recruitmentPlan}
          onChange={(e) => handleChange("recruitmentPlan", e.target.value)}
          placeholder={labels.recruitmentPlanPlaceholder}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Communication Channels */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="communicationChannels" className="text-base font-medium">
            {labels.communicationChannels}
          </Label>
          <AIImproveButton
            currentValue={data.communicationChannels}
            fieldContext="Communication channels - tools for team communication"
            onAccept={(value) => handleChange("communicationChannels", value)}
          />
        </div>
        <Input
          id="communicationChannels"
          value={data.communicationChannels}
          onChange={(e) => handleChange("communicationChannels", e.target.value)}
          placeholder={labels.communicationChannelsPlaceholder}
          className="h-12"
        />
      </div>
    </div>
  );
};
