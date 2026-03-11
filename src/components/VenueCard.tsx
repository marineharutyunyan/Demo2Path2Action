import { useState } from "react";
import { MapPin, Users, TreePine, Building2 } from "lucide-react";
import { Venue } from "@/data/venues";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { VenueBookingDialog } from "./VenueBookingDialog";
import { translations } from "@/lib/translations";

interface VenueCardProps {
  venue: Venue;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  language: "en" | "arm";
}

export const VenueCard = ({ venue, isHovered, onHover, language }: VenueCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = translations[language].venues;

  return (
    <>
      <div
        className={cn(
          "p-4 rounded-xl border transition-all duration-300 cursor-pointer",
          isHovered
            ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
            : "border-border bg-card hover:border-primary/50"
        )}
        onMouseEnter={() => onHover(venue.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors",
            isHovered ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
          )}>
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-lg text-foreground">
                {language === "en" ? venue.name : venue.nameArm}
              </h3>
              <Badge variant={venue.pricing === "free" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                {venue.pricing === "free" ? t.free : t.paid}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {language === "en" ? venue.description : venue.descriptionArm}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                {language === "en" ? venue.address : venue.addressArm}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1 text-primary">
                <Users className="w-4 h-4" />
                <span>{language === "en" ? venue.capacity : venue.capacityArm}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {venue.locationType === "outdoor" ? <TreePine className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                <span>{venue.locationType === "outdoor" ? t.outdoor : t.indoor}</span>
              </div>
              <span className="text-muted-foreground">
                {language === "en" ? venue.region : venue.regionArm}
              </span>
            </div>
          </div>
        </div>
      </div>

      <VenueBookingDialog
        venue={venue}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        language={language}
      />
    </>
  );
};
