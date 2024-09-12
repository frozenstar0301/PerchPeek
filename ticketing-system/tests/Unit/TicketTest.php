<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_ticket_can_be_created()
    {
        // Create a user first
        $user = User::factory()->create();

        // Create a ticket and associate it with the user
        $ticket = Ticket::create([
            'subject' => 'Test Ticket',
            'content' => 'This is a test ticket.',
            'status' => false,
            'user_id' => $user->id,  // Use the dynamically created user's ID
        ]);

        $this->assertInstanceOf(Ticket::class, $ticket);
        $this->assertEquals('Test Ticket', $ticket->subject);
        $this->assertEquals('This is a test ticket.', $ticket->content);
        $this->assertFalse($ticket->status);
    }

    /** @test */
    public function a_ticket_belongs_to_a_user()
    {
        // Create a user and a ticket associated with the user
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create(['user_id' => $user->id]);

        $this->assertEquals($user->id, $ticket->user->id);
    }

    /** @test */
    public function a_ticket_status_can_be_set_to_closed()
    {
        // Create a ticket with status set to 'open' (false)
        $ticket = Ticket::factory()->create(['status' => false]);

        // Update the status to 'closed' (true)
        $ticket->status = true;
        $ticket->save();

        // Assert that the status is now '1' (equivalent to true)
        $this->assertEquals(1, $ticket->fresh()->status);
    }
}
