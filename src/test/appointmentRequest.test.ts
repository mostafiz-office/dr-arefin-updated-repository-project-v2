import { describe, it, expect } from "vitest";
import { appointmentSchema, isOtherConcern } from "@/lib/appointmentRequest";

const ok = { name: "Rahim", email: "r@example.com", phone: "+8801711000000", concern: "Liver Disease Consultation", message: "" };

describe("appointment request rules", () => {
  it("shows the developer warning only for Other", () => {
    expect(isOtherConcern("Other")).toBe(true);
    expect(isOtherConcern("Follow-up Appointment")).toBe(false);
  });
  it("requires a medical concern", () => {
    expect(appointmentSchema.safeParse({ ...ok, concern: "" }).success).toBe(false);
  });
  it("requires a phone number", () => {
    expect(appointmentSchema.safeParse({ ...ok, phone: "" }).success).toBe(false);
  });
  it("accepts a complete request", () => {
    expect(appointmentSchema.safeParse(ok).success).toBe(true);
  });
});
