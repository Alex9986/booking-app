import { Resend } from "resend";
import { NextResponse } from "next/server";
import { ReservationConfirmationEmail } from "@/emails/ReservationConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      occasion,
      booking_date,
      booking_time,
      guest_count,
      special_requests,
    } = body;

    const { error } = await resend.emails.send({
      from: `L'Atelier <${FROM_EMAIL}>`,
      to: "keshang9986@gmail.com", // 写死了，不管用户填什么都发这里 上线以后改成email就好
      subject: `Reservation Confirmed – ${booking_date} at ${booking_time}`,
      html: ReservationConfirmationEmail({
        name,
        email,
        phone,
        occasion,
        booking_date,
        booking_time,
        guest_count,
        special_requests,
      }),
    });

    if (error) {
      console.error("Failed to send confirmation email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email API error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
