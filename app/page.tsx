"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LuxuryBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingReservations, setExistingReservations] = useState<any[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchReservations();
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("booking_date, booking_time");

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.log(data);
      setExistingReservations(data || []);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const selectedDate = formData.get("date") as string;
    const selectedTime = formData.get("time") as string;

    const isConflict = existingReservations.some(
      (res) =>
        res.booking_date === selectedDate && res.booking_time === selectedTime,
    );

    if (isConflict) {
      alert(
        "This time slot is already reserved. Please select another time or date.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const reservationData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        occasion: formData.get("occasion"),
        booking_date: formData.get("date"),
        booking_time: formData.get("time"),
        guest_count: formData.get("guests"),
        special_requests: formData.get("requests"),
      };

      const { error } = await supabase
        .from("reservations")
        .insert([reservationData]);

      if (error) {
        console.error("Error:", error.message);
        alert("Selection unavailable. Please try another slot.");
      } else {
        alert("Reservation Request Received.");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${suffix}`;
  });

  const inputClasses =
    "w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF37] transition-all font-light autofill:shadow-[inset_0_0_0px_1000px_#09090b] autofill:text-fill-zinc-200";

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-[#D4AF37]/30">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.07), transparent 40%)`,
        }}
      />

      <div className="relative w-full max-w-[650px]">
        <div className="relative z-10 bg-zinc-900/40 backdrop-blur-2xl border border-[#D4AF37]/20 p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          <header className="text-center mb-12">
            <span className="text-[9px] tracking-[0.5em] text-[#D4AF37] uppercase mb-2 block opacity-70">
              Private Invitation
            </span>
            <h1 className="text-4xl font-extralight tracking-tight text-zinc-100 italic mb-4">
              L'Atelier{" "}
              <span className="text-sm not-italic font-light tracking-[0.2em] ml-2 text-zinc-500 underline underline-offset-8 decoration-[#D4AF37]/40">
                Booking
              </span>
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className={inputClasses}
                />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Row 2: Email & Occasion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClasses}
                />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Occasion Type
                </label>
                <select
                  name="occasion"
                  className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF37] transition-all font-light appearance-none cursor-pointer"
                >
                  <option value="None" className="bg-zinc-950">
                    None
                  </option>
                  <option value="Birthday" className="bg-zinc-950">
                    Birthday
                  </option>
                  <option value="Anniversary" className="bg-zinc-950">
                    Anniversary
                  </option>
                  <option value="Business" className="bg-zinc-950">
                    Business Meeting
                  </option>
                  <option value="Date" className="bg-zinc-950">
                    Date Night
                  </option>
                </select>
              </div>
            </div>

            {/* Row 3: Date, Time, & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF37] transition-all font-light [color-scheme:dark]"
                />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Time Slot
                </label>
                <select
                  name="time"
                  required
                  className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF37] transition-all font-light appearance-none cursor-pointer"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time} className="bg-zinc-950">
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                  Guests
                </label>
                <select
                  name="guests"
                  className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF37] transition-all font-light appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, "6+"].map((num) => (
                    <option key={num} value={num} className="bg-zinc-950">
                      {num} {num === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors">
                Special Requirements
              </label>
              <textarea
                name="requests"
                rows={1}
                placeholder="Allergies, seating, etc."
                className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 placeholder:text-zinc-800 focus:outline-none focus:border-[#D4AF37] transition-all font-light resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full mt-4 group overflow-hidden border border-[#D4AF37]/40 py-4 transition-all duration-700 hover:border-[#D4AF37]"
            >
              <div className="absolute inset-0 translate-y-full group-hover:not-disabled:translate-y-0 bg-[#D4AF37] transition-transform duration-500 ease-in-out"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-t border-r border-[#D4AF37] rounded-full animate-spin"></div>
                    <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37]">
                      Processing
                    </span>
                  </>
                ) : (
                  <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37] group-hover:text-black transition-colors duration-500">
                    Request Reservation
                  </span>
                )}
              </div>
            </button>
          </form>

          <footer className="mt-12 text-center opacity-30 italic">
            <div className="text-[8px] text-zinc-400 tracking-[0.4em] uppercase">
              Paris • London • New York
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
