<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ChangeEmailConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $url;
    public $newEmail;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $newEmail, $url)
    {
        $this->user = $user;
        $this->url = $url;
        $this->newEmail = $newEmail;
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
        return $this->subject('Confirm Your Request to Change Email Address')
                    ->markdown('emails.changeEmail.confirmation')
                    ->with([
                        'user' => $this->user,
                        'url' => $this->url,
                        'newEmail' => $this->newEmail, 

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
