import { useState, useMemo } from "react";
import { format, addDays, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { sendBookingEmail } from "@/lib/emailjs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Venue } from "@/data/venues";
import { 
  getVenueAvailability, 
  isDayFullyBooked, 
  getAvailableSlots,
} from "@/data/venueAvailability";
import { cn } from "@/lib/utils";
import {useLanguage} from "@/contexts/LanguageContext.tsx";
import { translations } from "@/lib/translations";


interface VenueBookingDialogProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

export const VenueBookingDialog = ({ 
  venue, 
  isOpen, 
  onClose, 
}: VenueBookingDialogProps) => {
  const { language } = useLanguage();
  const t = translations[language]['venues']['venueBookingDialog'];

  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedHours, setSelectedHours] = useState<string>("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const showEmailError = emailTouched && email && !isEmailValid;
  const venueAvailability = useMemo(() => {
    const allAvailability = getVenueAvailability();
    return allAvailability.find(v => v.venueId === venue.id);
  }, [venue.id]);

  const selectedDayAvailability = useMemo(() => {
    if (!selectedDate || !venueAvailability) return null;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return venueAvailability.availability.find(d => d.date === dateStr);
  }, [selectedDate, venueAvailability]);

  const availableSlots = useMemo(() => {
    if (!selectedDayAvailability) return [];
    return getAvailableSlots(selectedDayAvailability);
  }, [selectedDayAvailability]);

  // Calculate max consecutive hours from selected time
  const maxConsecutiveHours = useMemo(() => {
    if (!selectedTime || !selectedDayAvailability) return 0;
    
    const slots = selectedDayAvailability.slots;
    const startIndex = slots.findIndex(s => s.start === selectedTime);
    if (startIndex === -1) return 0;

    let count = 0;
    for (let i = startIndex; i < slots.length; i++) {
      if (!slots[i].booked) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [selectedTime, selectedDayAvailability]);

  const isFormValid = selectedDate && selectedTime && selectedHours && email && isEmailValid;

  const handleSubmit = async () => {
    if (!isFormValid || !selectedDate) return;
    
    setIsLoading(true);
    
    const success = await sendBookingEmail({
      venueName: language === "en" ? venue.name : venue.nameArm,
      bookingDate: format(selectedDate, "MMMM d, yyyy"),
      bookingTime: selectedTime,
      bookingHours: selectedHours,
      userEmail: email,
      venueOwnerEmail: venue.ownerEmail,
    });
    
    setIsLoading(false);
    
    if (success) {
      toast({
        title: t.emailSent,
        variant: "default",
      });
      setIsSubmitted(true);
    } else {
      toast({
        title: t.emailFailed,
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedHours("");
    setEmail("");
    setEmailTouched(false);
    setIsSubmitted(false);
    onClose();
  };

  // Determine which days should be disabled
  const disabledDays = useMemo(() => {
    if (!venueAvailability) return [];
    
    const today = startOfDay(new Date());
    const disabledDates: Date[] = [];
    
    // Disable past dates
    for (let i = -30; i < 0; i++) {
      disabledDates.push(addDays(today, i));
    }
    
    // Disable fully booked days
    venueAvailability.availability.forEach(day => {
      if (isDayFullyBooked(day)) {
        disabledDates.push(new Date(day.date));
      }
    });
    
    return disabledDates;
  }, [venueAvailability]);

  // Custom day styling
  const modifiers = useMemo(() => {
    if (!venueAvailability) return {};
    
    const fullyBooked: Date[] = [];
    const partiallyAvailable: Date[] = [];
    
    venueAvailability.availability.forEach(day => {
      const date = new Date(day.date);
      if (isDayFullyBooked(day)) {
        fullyBooked.push(date);
      } else {
        partiallyAvailable.push(date);
      }
    });
    
    return { fullyBooked, partiallyAvailable };
  }, [venueAvailability]);

  const modifiersStyles = {
    fullyBooked: {
      backgroundColor: "hsl(var(--destructive) / 0.2)",
      color: "hsl(var(--destructive))",
      textDecoration: "line-through"
    },
    partiallyAvailable: {
      backgroundColor: "hsl(var(--primary) / 0.2)",
      color: "hsl(var(--primary))"
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-xl mb-2">{t.success}</DialogTitle>
            <DialogDescription className="mb-6">
              {t.successMessage}
            </DialogDescription>
            <Button onClick={handleClose}>{t.close}</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            {t.title}: {language === "en" ? venue.name : venue.nameArm}
          </DialogTitle>
          <DialogDescription>
            {language === "en" ? venue.address : venue.addressArm}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Calendar */}
          <div>
            <Label className="text-sm font-medium mb-2 block">{t.selectDate}</Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTime("");
                  setSelectedHours("");
                }}
                disabled={disabledDays}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                fromDate={new Date()}
                toDate={addDays(new Date(), 30)}
                className="rounded-md border pointer-events-auto"
              />
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-destructive/20" />
                <span className="text-muted-foreground">{t.fullyBooked}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-primary/20" />
                <span className="text-muted-foreground">{t.available}</span>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <Label className="text-sm font-medium mb-2 block">{t.selectTime}</Label>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {selectedDayAvailability?.slots.map((slot) => (
                    <button
                      key={slot.start}
                      onClick={() => {
                        if (!slot.booked) {
                          setSelectedTime(slot.start);
                          setSelectedHours("");
                        }
                      }}
                      disabled={slot.booked}
                      className={cn(
                        "p-2 text-sm rounded-md border transition-colors",
                        slot.booked 
                          ? "bg-destructive/10 text-destructive/50 cursor-not-allowed line-through" 
                          : selectedTime === slot.start
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card hover:bg-primary/10 hover:border-primary/50"
                      )}
                    >
                      {slot.start}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t.noAvailability}</p>
              )}
            </div>
          )}

          {/* Hours Selection */}
          {selectedTime && maxConsecutiveHours > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">{t.selectHours}</Label>
              <Select value={selectedHours} onValueChange={setSelectedHours}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectHours} />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {Array.from({ length: maxConsecutiveHours }, (_, i) => i + 1).map((hours) => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} {t.hours}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Email Input */}
          {selectedHours && (
            <div>
              <Label htmlFor="booking-email" className="text-sm font-medium mb-2 block">
                {t.email}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder={t.emailPlaceholder}
                  className={cn("pl-10", showEmailError && "border-destructive focus-visible:ring-destructive")}
                />
              </div>
              {showEmailError && (
                <p className="text-sm text-destructive mt-1">{t.emailError}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {isLoading ? t.submitting : t.submit}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
