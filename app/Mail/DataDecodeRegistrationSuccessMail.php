<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
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

    public function __construct($user, $whatsappGroupLink="https://chat.whatsapp.com/LMUwvp2pNMXHAOmwHXSDcn")
    {
        $this->user = $user;
        $this->paymentLink = route('payment', ['email' => $user->email]);
        $this->whatsappGroupLink = $whatsappGroupLink;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
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
