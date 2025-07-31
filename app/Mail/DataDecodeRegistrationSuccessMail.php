<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DataDecodeRegistrationSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public mixed $user;
    public string $paymentLink;
    public mixed $whatsappGroupLink;

    public function __construct($user)
    {
        $this->user = $user;
        $this->paymentLink = route('payment', ['email' => $user->email]);
        $this->whatsappGroupLink = config('services.dnd.datadecode_group');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.mailers.datadecode.username'), config('mail.mailers.datadecode.mail_from_name') ),
            subject: 'Welcome to DataDecode!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.datadecode_registration_success',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
