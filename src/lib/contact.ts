// -----------------------------------------------------------------------------
// Contact / enquiry destination for the "Book a Free Demo" + "Enroll Now" CTAs.
//
// ⚠️ PLACEHOLDERS — replace before launch.
//   • whatsappNumber : digits only, with country code, no "+" / spaces / dashes.
//   • email          : where enquiry mailto: links are sent.
// The lead form never touches a database — it opens a prefilled WhatsApp chat
// and/or a mailto: draft, so it works even while Supabase is offline.
// -----------------------------------------------------------------------------

export const CONTACT = {
  // Random placeholder number for now — swap for the real WhatsApp Business line.
  whatsappNumber: "919876543210",
  whatsappDisplay: "+91 98765 43210",
  email: "hello@motionaitech.in",
  brand: "Motion AI & Tech",
} as const;

/** Build a wa.me deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Build a mailto: link with a prefilled subject + body. */
export function mailtoLink(subject: string, body: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
