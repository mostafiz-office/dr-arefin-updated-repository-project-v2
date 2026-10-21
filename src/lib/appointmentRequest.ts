// Sends a Contact-page appointment request to the WordPress site's "arefin/v1/contact" receiver
// (part of the "Arefin exact pages" snippet), which saves it and emails the chamber inbox.
import { z } from "zod";
import { wpRestUrl } from "@/lib/wpApi";

export const appointmentSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter your phone number").max(20),
  concern: z.string().trim().min(1, "Please select your medical concern").max(100),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
export type AppointmentRequest = z.infer<typeof appointmentSchema>;

/** "Other" is for patients only — developers/job seekers must use LinkedIn. */
export const isOtherConcern = (concern: string) => concern.trim().toLowerCase() === "other";

export async function sendAppointmentRequest(
  values: AppointmentRequest & { website?: string; source?: string },
) {
  const parsed = appointmentSchema.parse(values);
  const res = await fetch(wpRestUrl("/arefin/v1/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...parsed,
      website: values.website || "",
      // Optional origin label (e.g. "First in Bangladesh page") — the receiver
      // prints it in the saved request + team email so the chamber can tell
      // which page a submission came from. Omitted by the Contact page.
      source: values.source || "",
    }),
  });
  if (!res.ok) throw new Error(`send failed (${res.status})`);
  return true;
}
