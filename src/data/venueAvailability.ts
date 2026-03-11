import { addDays, format } from "date-fns";

export interface TimeSlot {
  start: string; // "09:00"
  end: string; // "10:00"
  booked: boolean;
}

export interface DayAvailability {
  date: string; // "2026-01-04"
  slots: TimeSlot[];
}

export interface VenueAvailability {
  venueId: number;
  availability: DayAvailability[];
}

// Generate time slots for a day (9 AM to 9 PM)
const generateTimeSlots = (bookedSlots: string[] = []): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour < 21; hour++) {
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push({
      start,
      end,
      booked: bookedSlots.includes(start),
    });
  }
  return slots;
};

// Generate availability data dynamically based on current date
export const getVenueAvailability = (): VenueAvailability[] => {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const tomorrowStr = format(addDays(today, 1), "yyyy-MM-dd");
  const day3Str = format(addDays(today, 2), "yyyy-MM-dd");
  const day4Str = format(addDays(today, 3), "yyyy-MM-dd");
  const day5Str = format(addDays(today, 4), "yyyy-MM-dd");
  const day6Str = format(addDays(today, 5), "yyyy-MM-dd");
  const day7Str = format(addDays(today, 6), "yyyy-MM-dd");

  return [
    {
      venueId: 1, // Opera Garden
      availability: [
        {
          date: todayStr,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        {
          date: tomorrowStr,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        {
          date: day3Str,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        { date: day4Str, slots: generateTimeSlots(["12:00", "13:00", "14:00"]) },
        { date: day5Str, slots: generateTimeSlots([]) },
        { date: day6Str, slots: generateTimeSlots([]) },
        { date: day7Str, slots: generateTimeSlots(["15:00", "16:00", "17:00"]) },
      ],
    },
    {
      venueId: 2, // Erebuni Events Center
      availability: [
        {
          date: todayStr,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        {
          date: tomorrowStr,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        {
          date: day3Str,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        {
          date: day4Str,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        { date: day5Str, slots: generateTimeSlots([]) },
        { date: day6Str, slots: generateTimeSlots([]) },
        { date: day7Str, slots: generateTimeSlots([]) },
      ],
    },
    {
      venueId: 3, // Hrazdan Cultural Hub
      availability: [
        {
          date: todayStr,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        {
          date: tomorrowStr,
          slots: generateTimeSlots([
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ]),
        },
        { date: day3Str, slots: generateTimeSlots([]) },
        { date: day4Str, slots: generateTimeSlots(["11:00", "12:00"]) },
        { date: day5Str, slots: generateTimeSlots([]) },
        { date: day6Str, slots: generateTimeSlots(["18:00", "19:00", "20:00"]) },
        { date: day7Str, slots: generateTimeSlots([]) },
      ],
    },
  ];
};

// Helper to check if a day has any available slots
export const isDayFullyBooked = (dayAvailability: DayAvailability): boolean => {
  return dayAvailability.slots.every((slot) => slot.booked);
};

// Helper to get available slots for a day
export const getAvailableSlots = (dayAvailability: DayAvailability): TimeSlot[] => {
  return dayAvailability.slots.filter((slot) => !slot.booked);
};
