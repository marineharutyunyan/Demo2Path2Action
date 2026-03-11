import { useState } from "react";
import { Sparkles, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { improveText } from "@/services/aiService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [improvedText, setImprovedText] = useState("");

  const handleImprove = async () => {
    if (!currentValue.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    setIsLoading(true);
    try {
      const result = await improveText(currentValue, fieldContext, campaignContext);
      setImprovedText(result);
      setIsDialogOpen(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to improve text");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    onAccept(improvedText);
    setIsDialogOpen(false);
    setImprovedText("");
    toast.success("Text updated with AI suggestion");
  };

  const handleDiscard = () => {
    setIsDialogOpen(false);
    setImprovedText("");
  };

  return (
      <>
        <Button
            type="button"
            variant="ghost"
            size={size === "sm" ? "icon" : "default"}
            onClick={handleImprove}
            disabled={isLoading || !currentValue.trim()}
            className={cn(
                "text-primary hover:text-primary hover:bg-primary/10 transition-all",
                size === "sm" ? "h-8 w-8" : "h-9 px-3",
                className
            )}
            title="Improve with AI"
        >
          {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {size === "default" && <span className="ml-1">AI</span>}
              </>
          )}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Suggestion
              </DialogTitle>
              <DialogDescription>
                Compare the original text with the AI-improved version
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Original</h4>
                <div className="p-3 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">
                  {currentValue}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-primary flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Improved
                </h4>
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm whitespace-pre-wrap">
                  {improvedText}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                  variant="outline"
                  onClick={handleDiscard}
                  className="gap-2"
              >
                <X className="h-4 w-4" />
                Discard
              </Button>
              <Button
                  variant="hero"
                  onClick={handleAccept}
                  className="gap-2"
              >
                <Check className="h-4 w-4" />
                Accept Suggestion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
  );
}
