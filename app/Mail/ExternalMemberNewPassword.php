<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ExternalMemberNewPassword extends Mailable
{
    use Queueable, SerializesModels;
        public $user;
        public $plainPassword;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $plainPassword)
    {
        $this->user = $user;
        $this->plainPassword = $plainPassword;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Motion Capture',
        );
    }

    /**
     * Get the message content definition.
     */
     public function build()
    {
        return $this->subject('Your Login Password Has Been Changed')
                    ->markdown('emails.externalMember.resetPassword')
                    ->with([
                        'user' => $this->user,
                        'plainPassword' => $this->plainPassword,
                    ]);
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
