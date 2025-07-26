<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to DataDecode!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Reset styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; }
        body { margin:0; padding:0; font-family: 'Segoe UI', sans-serif; background-color: #f4f6f9; -webkit-font-smoothing: antialiased; }
        table { border-collapse: collapse !important; }

        /* Responsive styles */
        @media only screen and (max-width: 640px) {
            .container { width: 96% !important; max-width: 96% !important; }
            .inner-padding { padding: 24px 12px 24px 12px !important; }
            .header-padding { padding: 28px 12px 0px 12px !important; }
            .whatsapp-btn { padding: 14px 16px !important; font-size: 16px !important; }
            h1 { font-size: 22px !important; }
            .footer-padding { padding: 18px 12px !important; font-size: 13px !important; }
        }

        /* Button hover effects */
        .whatsapp-btn:hover {
            background: linear-gradient(90deg, #0f766e 0%, #10b981 100%) !important;
            transform: translateY(-2px) scale(1.02);
            transition: all 0.2s ease-in-out;
        }
    </style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding: 36px 20px;">
            <table class="container" width="100%" style="max-width: 640px; background-color: #ffffff; border-radius: 20px; box-shadow: 0 12px 28px rgba(0,0,0,0.08); border: 1px solid #e0f2fe; overflow: hidden;">
                <!-- Header Image -->
                <img src="{{ asset('/datadecode-logo.png') }}"
                     srcset="{{ asset('/datadecode-logo.png') }} 1x, {{ asset('/datadecode-logo.png') }} 2x"
                     alt="DataDecode"

                <!-- Title -->
                <tr>
                    <td class="header-padding" style="padding: 32px 40px 0px 40px; text-align: center; background-color: #ffffff;">
                        <h1 style="font-size: 26px; color: #2563eb; margin: 0 0 14px; line-height: 1.3;">Welcome to DataDecode!</h1>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td class="inner-padding" style="padding: 40px 36px 36px; background: #ffffff;">
                        <p style="font-size: 17px; color: #0f172a; margin-bottom: 16px; line-height: 1.6;">
                            Dear <strong>{{ $user->firstname }}</strong>,
                        </p>
                        <p style="font-size: 16px; color: #475569; margin-bottom: 24px; line-height: 1.6;">
                            Congratulations on taking the first step toward equipping yourself with essential knowledge in data analysis. We at DataDecode are excited to have you on board!
                        </p>

                        <!-- WhatsApp CTA -->
                        <p style="font-size: 16px; color: #475569; margin-bottom: 18px; line-height: 1.6;">
                            <strong>Join the WhatsApp Group:</strong>
                        </p>
                        <p style="font-size: 16px; color: #475569; margin-bottom: 18px; line-height: 1.6;">
                            If you haven't already, please join our class WhatsApp group via the link below. It will serve as the central hub for updates, resources, class reminders, and peer interaction.
                        </p>
                        <div style="text-align: center; margin-bottom: 28px;">
                            <a href="{{ $whatsappGroupLink }}" class="whatsapp-btn" style="display: inline-block; padding: 12px 28px; background: linear-gradient(90deg, #10b981 0%, #22d3ee 100%); color: #fff; font-weight: 600; border-radius: 10px; text-decoration: none; font-size: 16px;">
                                💬 Join WhatsApp Group
                            </a>
                        </div>

                        <!-- Closing -->
                        <p style="font-size: 16px; color: #475569; margin-top: 32px; line-height: 1.6;">
                            We look forward to an engaging and impactful learning experience with you.
                        </p>

                        <!-- Signature -->
                        <p style="font-size: 18px; color: #0f172a; font-weight: 600; margin-top: 36px; line-height: 1.6;">
                            Kind regards,<br>
                            The DataDecode Team
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td class="footer-padding" style="background-color: #f9fafb; padding: 28px 20px; text-align: center; font-size: 14px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                        &copy; {{ date('Y') }} <strong><a style="color: #3b82f6; text-decoration: underline;" href="https://www.docsanddecks.com">DataDecode</a></strong>. All rights reserved.<br>
                        Need help? <a href="mailto:info@docsanddecks.com" style="color: #3b82f6; text-decoration: underline;">Contact Support</a>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
</body>
</html>
