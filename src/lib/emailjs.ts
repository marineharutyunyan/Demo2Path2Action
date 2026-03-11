import emailjs from "@emailjs/browser";

// EmailJS Configuration
// You need to replace these with your actual EmailJS credentials
// Get them from: https://dashboard.emailjs.com/
export const EMAILJS_CONFIG = {
  publicKey: "JETvsnwoEELnExda4", // Replace with your EmailJS public key
  serviceId: "service_95du3v2", // Replace with your EmailJS service ID
  templateId: "template_vlnwkba", // Replace with your EmailJS template ID
  templateContactUsId: "template_rqgb8m9", // Replace with your EmailJS template ID
};

export interface BookingEmailData {
  venueName: string;
  bookingDate: string;
  bookingTime: string;
  bookingHours: string;
  userEmail: string;
  venueOwnerEmail: string;
}

export const sendBookingEmail = async (data: BookingEmailData): Promise<boolean> => {
  try {
    const templateParams = {
      venue_name: data.venueName,
      booking_date: data.bookingDate,
      booking_time: data.bookingTime,
      booking_hours: data.bookingHours,
      user_email: data.userEmail,
      to_email: data.venueOwnerEmail,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey,
    );

    return response.status === 200;
  } catch (error) {
    console.error("Failed to send booking email:", error);
    return false;
  }
};
