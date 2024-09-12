<?php

namespace App\Console\Commands;

use App\Events\TicketCreated;
use App\Models\Ticket;
use Illuminate\Console\Command;

class CreateTicketCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ticket:create {subject} {content} {user_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new ticket';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $subject = $this->argument('subject');
        $content = $this->argument('content');
        $userId = $this->argument('user_id');

        $ticket = Ticket::create([
            'subject' => $subject,
            'content' => $content,
            'user_id' => $userId,
            'status' => false, // Initially open
        ]);

        // Fire the event when a new ticket is created
        event(new TicketCreated($ticket));

        $this->info('Ticket created successfully!');
    }
}
