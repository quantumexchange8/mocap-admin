<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailChangedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $oldEmail;
    public $newEmail;
    public $forOldEmail;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $oldEmail, $newEmail, $forOldEmail = false)
    {
        $this->user = $user;
        $this->oldEmail = $oldEmail;
        $this->newEmail = $newEmail;
        $this->forOldEmail = $forOldEmail;

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
        $view = $this->forOldEmail
            ? 'emails.changeEmail.successOld'
            : 'emails.changeEmail.successNew';

        return $this->subject('Your Email Address Has Been Changed')
            ->markdown($view)
            ->with([
                'user' => $this->user,
                'oldEmail' => $this->oldEmail,
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
