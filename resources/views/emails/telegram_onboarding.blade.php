<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>How to Join the Introductory Class - Docs and Decks Bootcamp</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .container {
        width: 98% !important;
        padding: 0 !important;
      }
      .inner, .main, .footer {
        padding: 16px 12px !important;
      }
      .feature-box {
        padding: 16px 12px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      h2 {
        font-size: 16px !important;
      }
      .steps-list {
        font-size: 14px !important;
      }
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f6f9;
    }

    .container {
      max-width: 620px;
      margin: auto;
      background: #fff;
      border-radius: 18px;
      border: 1px solid #e0f2fe;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .header img {
      width: 100%;
      display: block;
    }

    .inner {
      padding: 24px 40px 8px;
      text-align: center;
      background-color: #fff;
    }

    .main {
      padding: 36px 40px;
      background-color: #fff;
    }

    h1 {
      color: #2563eb;
      font-size: 24px;
      margin-bottom: 10px;
    }

    h2 {
      color: #2563eb;
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      color: #475569;
      font-size: 15px;
      line-height: 1.6;
    }

    .feature-box {
      background: #e0f2fe;
      border: 1px solid #38bdf8;
      border-radius: 12px;
      padding: 24px;
      margin-top: 24px;
      text-align: center;
    }

    .steps-list {
      text-align: left;
      max-width: 400px;
      margin: 0 auto 16px;
      padding-left: 20px;
      color: #0f172a;
      font-size: 15px;
    }

    .steps-list li {
      margin-bottom: 10px;
    }

    .footer {
      background: #f9fafb;
      border-top: 1px solid #e2e8f0;
      padding: 24px 20px;
      font-size: 13px;
      color: #94a3b8;
      text-align: center;
    }

    .btn {
      display: inline-block;
      margin-top: 12px;
      padding: 10px 16px;
      background-color: #2563eb;
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
    }

    a {
      color: #3b82f6;
      text-decoration: underline;
      word-break: break-word;
    }

    .code-block {
      display: inline-block;
      background: #f1f5f9;
      color: #2563eb;
      padding: 4px 8px;
      border-radius: 6px;
      font-family: monospace;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 10px;">
        <table class="container" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td class="header" style="border-bottom: 4px solid #3b82f6;">
              <img src="{{ url('/bridge-the-gap.png') }}" alt="Docs and Decks">
            </td>
          </tr>

          <!-- Welcome Section -->
          <tr>
            <td class="inner">
              <h1>🚀 How to Join the Introductory Class!</h1>
              <p>We are finally starting!</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="main">
              <p>Hello <strong>{{ $user->firstname }}</strong>,</p>

              <p>All our trainings, attendance, assignments, session recordings, and score checks will happen in our exclusive Telegram classroom supported by the Docs and Decks bot.</p>

              <!-- Feature Box -->
              <div class="feature-box">
                <h2>How to Join</h2>
                <ol class="steps-list">
                  <li>Message our Telegram bot: <a href="https://t.me/DocsandDecksBot">@DocsandDecksBot</a></li>
                  <li>Send this command:<br>
                    <span class="code-block">/validate_me @if($payment){{ $payment->reference }}@else"&lt;payment_reference&gt;"@endif</span>
                  </li>
                  <li>The bot will send you a private group link. <strong>Do not share it</strong>—for paid participants only.</li>
                  <li><strong>You need a payment reference to join.</strong></li>
                  <li>Haven’t paid yet? <a href="https://www.docsanddecks.com/payment">Pay here</a> to get your reference.</li>
                  <li>The bot automatically removes unpaid users.</li>
                </ol>

                <p><strong>Bot Features:</strong><br>
                  ✔️ Mark attendance<br>
                  📚 Receive assignments<br>
                  🎥 Get session recordings<br>
                  📊 Check your scores<br>
                  ...all via the Telegram bot!
                </p>

                <p>
                  <strong>
                    ✅ Attendance will be taken during the introductory class at <span style="color:#16a34a;">4pm WAT</span> today.<br>
                    Everyone who attends earns <span style="color:#16a34a;">10 marks</span> automatically!<br>
                    We’ll guide you on how to use the bot and classroom too.
                  </strong>
                </p>
              </div>

              <p style="margin-top: 24px; text-align: center;">
                We’ll be in touch soon with next steps.<br>Got questions? Feel free to reach out!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              &copy; {{ date('Y') }} <strong style="color:#3b82f6;">Docs and Decks</strong>. All rights reserved.<br>
              Need help? <a href="https://api.whatsapp.com/send/?phone=2347085755411&text=Hello%2C+I+have+a+few+questions...">Contact Support</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
