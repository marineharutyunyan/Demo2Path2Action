import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OPENAI_CONFIG } from "@/config/openai";

interface AIImproveButtonProps {
  currentValue: string;
  fieldContext: string;
  campaignContext?: string;
  onAccept: (improvedValue: string) => void;
  className?: string;
  size?: "sm" | "default";
}

export function AIImproveButton({
  currentValue,
  fieldContext,
  campaignContext,
  onAccept,
  className,
  size = "sm",
}: AIImproveButtonProps) {

  const handleImprove = () => {
    if (!OPENAI_CONFIG.isConfigured) {
      toast.info("✨ AI helping feature coming soon!", {
        description: "This feature will use AI to improve your text automatically.",
      });
      return;
    }

    // Future: when API key is configured via VITE_OPENAI_API_KEY, 
    // this will call the AI service and show the comparison dialog.
    toast.info("✨ AI helping feature coming soon!");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={size === "sm" ? "icon" : "default"}
      onClick={handleImprove}
      className={cn(
        "text-primary hover:text-primary hover:bg-primary/10 transition-all",
        size === "sm" ? "h-8 w-8" : "h-9 px-3",
        className
      )}
      title="Improve with AI"
    >
      <Sparkles className="h-4 w-4" />
      {size === "default" && <span className="ml-1">AI</span>}
    </Button>
  );
}
