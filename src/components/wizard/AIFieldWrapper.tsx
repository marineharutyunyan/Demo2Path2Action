import { ReactNode } from "react";
import { AIImproveButton } from "./AIImproveButton";

interface AIFieldWrapperProps {
  children: ReactNode;
  currentValue: string;
  fieldContext: string;
  campaignContext?: string;
  onImprove: (improvedValue: string) => void;
  showButton?: boolean;
}

export function AIFieldWrapper({
  children,
  currentValue,
  fieldContext,
  campaignContext,
  onImprove,
  showButton = true,
}: AIFieldWrapperProps) {
  return (
    <div className="relative group">
      {children}
      {showButton && (
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <AIImproveButton
            currentValue={currentValue}
            fieldContext={fieldContext}
            campaignContext={campaignContext}
            onAccept={onImprove}
          />
        </div>
      )}
    </div>
  );
}
