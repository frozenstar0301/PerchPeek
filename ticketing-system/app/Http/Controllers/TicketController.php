<?php

namespace App\Http\Controllers;

use App\Events\TicketCreated;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function openTickets()
    {
        $tickets = Ticket::where('status', false)->with('user:id,name,email')->orderBy('created_at', 'desc')->paginate(3);
        return response()->json($tickets);
    }

    public function closedTickets()
    {
        $tickets = Ticket::where('status', true)->with('user:id,name,email')->orderBy('created_at', 'desc')->paginate(3);
        return response()->json($tickets);
    }

    public function userTickets($userId)
    {
        $tickets = Ticket::where('user_id', $userId)->with('user:id,name,email')->orderBy('created_at', 'desc')->paginate(3);
        return response()->json($tickets);
    }

    public function stats()
    {
        return [
            'total_tickets' => Ticket::count(),
            'unprocessed_tickets' => Ticket::where('status', false)->count(),
            'user_with_most_tickets' => User::withCount('tickets')->orderBy('tickets_count', 'desc')->first(),
            'last_ticket_processed_at' => Ticket::where('status', true)->latest('updated_at')->first()->updated_at ?? null,
        ];
    }

    public function show($id)
    {
        $ticket = Ticket::with('user')->findOrFail($id);
        return response()->json($ticket);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // Create a new ticket
        $ticket = Ticket::create([
            'subject' => $request->input('subject'),
            'content' => $request->input('content'),
            'user_id' => $request->input('user_id'),
            'status' => false, // Initially the ticket is open (unprocessed)
        ]);

        // Fire the event when the ticket is created
        event(new TicketCreated($ticket));

        return response()->json([
            'message' => 'Ticket created successfully',
            'ticket' => $ticket,
        ]);
    }
}