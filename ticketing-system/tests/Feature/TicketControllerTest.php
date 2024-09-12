<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Ticket;
use App\Models\User;

class TicketControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();
    }

    public function testOpenTickets()
    {
        // Create some tickets
        Ticket::factory()->count(5)->create(['status' => false, 'user_id' => $this->user->id]);

        $response = $this->get('/api/tickets/open');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'subject', 'content', 'user_id', 'status', 'created_at', 'updated_at', 'user' => ['id', 'name', 'email']]
                     ],
                     'current_page',
                     'data',
                     'first_page_url',
                     'from',
                     'last_page',
                     'last_page_url',
                     'links',
                     'next_page_url',
                     'path',
                     'per_page',
                     'prev_page_url',
                     'to',
                     'total'
                 ]);
    }

    public function testClosedTickets()
    {
        // Create some tickets
        Ticket::factory()->count(5)->create(['status' => true, 'user_id' => $this->user->id]);

        $response = $this->get('/api/tickets/closed');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'subject', 'content', 'user_id', 'status', 'created_at', 'updated_at', 'user' => ['id', 'name', 'email']]
                     ],
                     'current_page',
                     'data',
                     'first_page_url',
                     'from',
                     'last_page',
                     'last_page_url',
                     'links',
                     'next_page_url',
                     'path',
                     'per_page',
                     'prev_page_url',
                     'to',
                     'total'
                 ]);
    }

    public function testUserTickets()
    {
        // Create some tickets
        Ticket::factory()->count(5)->create(['user_id' => $this->user->id]);

        $response = $this->get('/api/users/' . $this->user->id . '/tickets');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'subject', 'content', 'user_id', 'status', 'created_at', 'updated_at', 'user' => ['id', 'name', 'email']]
                     ],
                     'current_page',
                     'data',
                     'first_page_url',
                     'from',
                     'last_page',
                     'last_page_url',
                     'links',
                     'next_page_url',
                     'path',
                     'per_page',
                     'prev_page_url',
                     'to',
                     'total'
                 ]);
    }

    public function testStats()
    {
        // Create some tickets
        Ticket::factory()->count(5)->create(['user_id' => $this->user->id]);

        $response = $this->get('/api/stats');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'total_tickets',
                     'unprocessed_tickets',
                     'user_with_most_tickets' => ['id', 'name', 'email', 'tickets_count'],
                     'last_ticket_processed_at'
                 ]);
    }

    public function testShowTicket()
    {
        // Create a ticket
        $ticket = Ticket::factory()->create(['user_id' => $this->user->id]);

        $response = $this->get('/api/tickets/' . $ticket->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $ticket->id,
                     'subject' => $ticket->subject,
                     'content' => $ticket->content,
                     'user_id' => $ticket->user_id,
                     'status' => $ticket->status,
                     'user' => [
                         'id' => $this->user->id,
                         'name' => $this->user->name,
                         'email' => $this->user->email
                     ]
                 ]);
    }
}
