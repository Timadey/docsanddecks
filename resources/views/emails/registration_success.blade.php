<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Docs and Decks Bootcamp!</title>
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
            .btn, .whatsapp-btn { padding: 14px 16px !important; font-size: 16px !important; }
            h1 { font-size: 22px !important; }
            .referral { padding: 16px 12px !important; font-size: 15px !important; }
            .footer-padding { padding: 18px 12px !important; font-size: 13px !important; }
        }

        /* Button hover effects */
        .btn:hover {
            background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%) !important;
            transform: translateY(-2px) scale(1.02);
            transition: all 0.2s ease-in-out;
        }
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
                <tr>
                    <td style="padding: 0; border-bottom: 5px solid #3b82f6; text-align: center; background-color: #f4f6f9;">
                        <img src="{{ url('/bridge-the-gap.png') }}" alt="Docs and Decks" style="display: block; width: 100%; max-width: 100%; height: auto;">
                    </td>
                </tr>

                <!-- Title -->
                <tr>
                    <td class="header-padding" style="padding: 32px 40px 0px 40px; text-align: center; background-color: #ffffff;">
                        <h1 style="font-size: 26px; color: #2563eb; margin: 0 0 14px; line-height: 1.3;">🎉 You're In!</h1>
                        <p style="font-size: 16px; color: #475569; margin: 0 0 12px; line-height: 1.5;">
                            Welcome to the Docs and Decks Digital Literacy Bootcamp!
                        </p>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td class="inner-padding" style="padding: 40px 36px 36px; background: #ffffff;">
                        <p style="font-size: 17px; color: #0f172a; margin-bottom: 16px; line-height: 1.6;">
                            Hello <strong>{{ $user->firstname }}</strong>,
                        </p>
                        <p style="font-size: 16px; color: #475569; margin-bottom: 18px; line-height: 1.6;">
                            First of all, <strong>huge congratulations</strong> 🎊 on taking this bold step! You've made a choice that many shy away from, choosing to invest in yourself and become more confident with digital tools like Microsoft Word, Excel, PowerPoint, and more.
                        </p>
                        <p style="font-size: 16px; color: #475569; margin-bottom: 24px; line-height: 1.6;">
                            I’m super excited to welcome you aboard. To officially lock in your seat for this cohort, simply confirm your spot by completing your payment below:
                        </p>

                        <!-- Confirm Spot Button -->
                        <div style="text-align: center; margin-bottom: 36px;">
                            <a href="{{ $paymentLink }}" class="btn" style="display: inline-block; padding: 18px 40px; background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%); color: #fff; font-weight: 700; border-radius: 14px; text-decoration: none; font-size: 18px; letter-spacing: 0.5px; transition: all 0.2s ease;">
                                ✅ Confirm My Spot Now
                            </a>
                        </div>

                        <!-- WhatsApp CTA -->
                        <p style="font-size: 16px; color: #475569; text-align: center; margin-bottom: 12px;  line-height: 1.6;">
                            You can also navigate to the payment section on the site and enter your registered email to proceed.
                            Once confirmed, join our official WhatsApp group to stay updated with all announcements:
                        </p>
                        <div style="text-align: center; margin-bottom: 28px;">
                            <a href="{{ $whatsappGroupLink }}" class="whatsapp-btn" style="display: inline-block; padding: 12px 28px; background: linear-gradient(90deg, #10b981 0%, #22d3ee 100%); color: #fff; font-weight: 600; border-radius: 10px; text-decoration: none; font-size: 16px;">
                                💬 Join WhatsApp Group
                            </a>
                        </div>

                        <!-- Referral Section -->
                        <div class="referral" style="background: #fef3c7; border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 36px; border: 1px solid #fde68a;">
                            <p style="margin: 0; font-size: 16px; color: #78350f; line-height: 1.5;">
                                💸 Want to earn with Docs and Decks? Stay tuned, soon you'll be able to join our <strong style="color: #3b82f6;">DnD Squad</strong> and enjoy <strong>25% commission</strong> for every friend you refer!
                            </p>
                        </div>

                        <!-- Closing -->
                        <p style="font-size: 16px; color: #475569; margin-top: 32px; line-height: 1.6;">
                            Once again, I’m really happy you’re here, <strong>{{ $user->firstname }}</strong>. I can’t wait to see you in class and watch you grow your digital skills 🚀!
                        </p>
                        <p style="font-size: 16px; color: #475569; margin-bottom: 0; line-height: 1.6;">
                            If you have any questions, simply reply to this email, I’ll personally get back to you.
                        </p>

                        <!-- Signature -->
                        <p style="font-size: 18px; color: #0f172a; font-weight: 600; margin-top: 36px; line-height: 1.6;">
                            Warm regards,<br>
                            Timothy Adeleke<br>
                            Program Lead, Docs and Decks
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td class="footer-padding" style="background-color: #f9fafb; padding: 28px 20px; text-align: center; font-size: 14px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                        &copy; {{ date('Y') }} <strong><a style="color: #3b82f6; text-decoration: underline;" href="https://www.docsanddecks.com">Docs and Decks</a></strong>. All rights reserved.<br>
                        Need help? <a href="mailto:info@docsanddecks.com" style="color: #3b82f6; text-decoration: underline;">Contact Support</a>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
</body>
</html>
