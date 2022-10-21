<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class EmailChangeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(AnonymousNotifiable $notifiable)
    {
        return (new MailMessage)->subject("Change Email {$this->user->name}")
            ->action('Change Email', $this->verifyRoute($notifiable))
            ->line('Thank you for using our application!');
    }

    /**
     * Returns the Reset URl to send in the Email
     *
     * @param AnonymousNotifiable $notifiable
     * @return string
     */
    protected function verifyRoute(AnonymousNotifiable $notifiable)
    {
        return URL::temporarySignedRoute('change.email.verification', now()->addMinutes(60), [
            'user' => $this->user,
            'email' => $notifiable->routes['mail']
        ]);
    }
}
