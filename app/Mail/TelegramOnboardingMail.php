<?php

namespace App\Mail;

use App\Models\User;
use App\Modules\Payment\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TelegramOnboardingMail extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public ?Payment $payment;

    public function __construct(User $user, ?Payment $payment = null)
    {
        $this->user = $user;
        $this->payment = $payment;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Join the Introductory Class - Docs and Decks Bootcamp',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.telegram_onboarding',
        );
    }

    public function attachments(): array
    {
        return [];
    }
} 