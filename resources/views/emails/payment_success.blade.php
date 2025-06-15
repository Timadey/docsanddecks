<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment Confirmation</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', sans-serif; background-color: #f4f6f9;">
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding: 30px 20px;">
            <table width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); border: 1px solid #e0f2fe; overflow: hidden;">

                <!-- Header (just image) -->
                <tr>
                    <td style="padding: 0; border-bottom: 4px solid #3b82f6; text-align: center; background-color: #f4f6f9;">
                        <img src="{{ url('/bridge-the-gap.png') }}" alt="Docs and Decks" style="display: block; width: 100%; height: auto; border-radius: 0; box-shadow: none;">
                    </td>
                </tr>

                <!-- Section Title -->
                <tr>
                    <td style="padding: 20px 40px 0px 40px; text-align: center; background-color: #ffffff;">
                        <h1 style="font-size: 24px; color: #2563eb; margin: 0 0 12px;">✅ Payment Confirmed</h1>
                        <p style="font-size: 15px; color: #475569; margin: 0;">
                            You're now officially registered for Docs and Deck's Digital Literacy Bootcamp!
                        </p>
                    </td>
                </tr>


                <!-- Body -->
                <tr>
                    <td style="padding: 48px 36px 36px; background: #ffffff;">
                        <p style="font-size: 16px; color: #0f172a; margin-bottom: 12px;">
                            Hello <strong>{{ $user->name }}</strong>,
                        </p>
                        <p style="font-size: 15px; color: #475569; margin-bottom: 24px;">
                            Your payment has been successfully received. Welcome to the <strong style="color: #3b82f6;">Docs and Decks</strong> community! Join the WhatsApp group below.
                        </p>

                        <table width="100%" style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #f9fafb; margin-bottom: 32px;">
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 16px; color: #64748b;">Reference</td>
                                <td style="padding: 16px; color: #0f172a; font-weight: 600; text-align: right;">{{ $payment->reference }}</td>
                            </tr>
                            <tr style="background-color: #f0fdfa; border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 16px; color: #64748b;">Amount Paid</td>
                                <td style="padding: 16px; color: #0f766e; font-weight: 600; text-align: right;">₦{{ number_format($payment->amount_paid / 100, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 16px; color: #64748b;">Payment Method</td>
                                <td style="padding: 16px; color: #3b82f6; text-align: right;">{{ ucfirst($payment->payment_method) }}</td>
                            </tr>
                            <tr style="background-color: #f0fdfa;">
                                <td style="padding: 16px; color: #64748b;">Date</td>
                                <td style="padding: 16px; color: #334155; text-align: right;">{{ \Carbon\Carbon::parse($payment->paid_at)->toDayDateTimeString() }}</td>
                            </tr>
                        </table>

                        <!-- Referral CTA -->
                        <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 32px; text-align: center;">
                            <p style="margin: 0; font-size: 15px; color: #78350f;">
                                <strong>💸 Want to earn with Docs and Decks?</strong><br>
                                Join the <strong style="color: #3b82f6;">DnD Squad</strong> and get <strong>25%</strong> commission per referral.<br>
                                Your invitee also gets <strong style="color: #ea580c;">5% off</strong> their training!
                            </p>
                            <a href="https://chat.whatsapp.com/LMUwvp2pNMXHAOmwHXSDcn" style="margin-top: 12px; display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; font-weight: 600; border-radius: 8px; text-decoration: none; margin-top: 16px;">
                                Join WhatsApp Group →
                            </a>
                        </div>

                        <p style="font-size: 14px; color: #64748b; text-align: center; margin-bottom: 0;">
                            We’ll be in touch soon with next steps.<br>In the meantime, feel free to reach out with any questions.
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background-color: #f9fafb; padding: 24px 20px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                        &copy; {{ date('Y') }} <strong style="color: #3b82f6;">Docs and Decks</strong>. All rights reserved.<br>
                        Need help? <a href="mailto:support@docsanddecks.com" style="color: #3b82f6; text-decoration: underline;">Contact Support</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
