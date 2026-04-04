interface ReservationEmailProps {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  booking_date: string;
  booking_time: string;
  guest_count: string;
  special_requests?: string;
}

export function ReservationConfirmationEmail({
  name,
  booking_date,
  booking_time,
  guest_count,
  occasion,
  special_requests,
}: ReservationEmailProps) {
  const formattedDate = new Date(booking_date + "T00:00:00").toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reservation Confirmed – L'Atelier</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- Gold top border -->
          <tr>
            <td style="height:1px;background:linear-gradient(to right,transparent,#D4AF37,transparent);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color:#0a0a0a;padding:48px 48px 36px;text-align:center;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <p style="margin:0 0 8px;font-size:9px;letter-spacing:0.5em;color:#D4AF37;text-transform:uppercase;opacity:0.7;">
                Private Invitation
              </p>
              <h1 style="margin:0;font-size:36px;font-weight:200;color:#f4f4f5;font-style:italic;letter-spacing:-0.02em;">
                L'Atelier
              </h1>
              <p style="margin:16px 0 0;font-size:9px;letter-spacing:0.4em;color:#52525b;text-transform:uppercase;">
                Reservation Confirmed
              </p>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="background-color:#0a0a0a;padding:0 48px;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#D4AF37 30%,#D4AF37 70%,transparent);"></div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="background-color:#0a0a0a;padding:36px 48px 24px;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <p style="margin:0;font-size:13px;color:#a1a1aa;font-weight:300;line-height:1.8;letter-spacing:0.02em;">
                Dear <span style="color:#e4e4e7;">${name}</span>,
              </p>
              <p style="margin:12px 0 0;font-size:13px;color:#71717a;font-weight:300;line-height:1.8;letter-spacing:0.02em;">
                We are pleased to confirm your reservation at L'Atelier. We look forward to welcoming you and curating an exceptional experience for your visit.
              </p>
            </td>
          </tr>

          <!-- Reservation Details Card -->
          <tr>
            <td style="background-color:#0a0a0a;padding:8px 48px 36px;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #1f1f1f;">
                <tr>
                  <td style="padding:24px 28px 16px;">
                    <p style="margin:0 0 20px;font-size:8px;letter-spacing:0.4em;color:#D4AF37;text-transform:uppercase;opacity:0.8;">
                      Booking Details
                    </p>

                    <!-- Date -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td style="font-size:9px;letter-spacing:0.2em;color:#52525b;text-transform:uppercase;width:40%;">Date</td>
                        <td style="font-size:12px;color:#e4e4e7;font-weight:300;text-align:right;">${formattedDate}</td>
                      </tr>
                    </table>
                    <div style="height:1px;background-color:#1f1f1f;margin-bottom:14px;"></div>

                    <!-- Time -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td style="font-size:9px;letter-spacing:0.2em;color:#52525b;text-transform:uppercase;width:40%;">Time</td>
                        <td style="font-size:12px;color:#e4e4e7;font-weight:300;text-align:right;">${booking_time}</td>
                      </tr>
                    </table>
                    <div style="height:1px;background-color:#1f1f1f;margin-bottom:14px;"></div>

                    <!-- Guests -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td style="font-size:9px;letter-spacing:0.2em;color:#52525b;text-transform:uppercase;width:40%;">Guests</td>
                        <td style="font-size:12px;color:#e4e4e7;font-weight:300;text-align:right;">${guest_count} ${parseInt(guest_count) === 1 ? "Person" : "People"}</td>
                      </tr>
                    </table>

                    ${
                      occasion && occasion !== "None"
                        ? `
                    <div style="height:1px;background-color:#1f1f1f;margin-bottom:14px;"></div>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td style="font-size:9px;letter-spacing:0.2em;color:#52525b;text-transform:uppercase;width:40%;">Occasion</td>
                        <td style="font-size:12px;color:#e4e4e7;font-weight:300;text-align:right;">${occasion}</td>
                      </tr>
                    </table>`
                        : ""
                    }

                    ${
                      special_requests
                        ? `
                    <div style="height:1px;background-color:#1f1f1f;margin-bottom:14px;"></div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:9px;letter-spacing:0.2em;color:#52525b;text-transform:uppercase;width:40%;vertical-align:top;">Requests</td>
                        <td style="font-size:12px;color:#71717a;font-weight:300;text-align:right;font-style:italic;">${special_requests}</td>
                      </tr>
                    </table>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Note -->
          <tr>
            <td style="background-color:#0a0a0a;padding:0 48px 36px;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <p style="margin:0;font-size:11px;color:#52525b;font-weight:300;line-height:1.8;letter-spacing:0.02em;font-style:italic;">
                Should you need to modify or cancel your reservation, please contact us at least 24 hours in advance. We are committed to ensuring your visit is nothing short of extraordinary.
              </p>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="background-color:#0a0a0a;padding:0 48px;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#D4AF37 30%,#D4AF37 70%,transparent);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0a0a0a;padding:28px 48px 40px;text-align:center;border-left:1px solid #1f1f1f;border-right:1px solid #1f1f1f;">
              <p style="margin:0 0 8px;font-size:8px;letter-spacing:0.4em;color:#3f3f46;text-transform:uppercase;">
                Paris &nbsp;·&nbsp; London &nbsp;·&nbsp; New York
              </p>
              <p style="margin:0;font-size:8px;letter-spacing:0.2em;color:#27272a;text-transform:uppercase;">
                © L'Atelier. All rights reserved.
              </p>
            </td>
          </tr>

          <!-- Gold bottom border -->
          <tr>
            <td style="height:1px;background:linear-gradient(to right,transparent,#D4AF37,transparent);"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
