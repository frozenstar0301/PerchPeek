<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\StreamedResponse;

Route::get('/', function () {
    return view('welcome');
});


Route::get('api/tickets/open', [TicketController::class, 'openTickets']);
Route::get('api/tickets/closed', [TicketController::class, 'closedTickets']);
Route::get('api/users/{userId}/tickets', [TicketController::class, 'userTickets']);
Route::get('api/stats', [TicketController::class, 'stats']);
Route::get('api/tickets/{id}', [TicketController::class, 'show']);
Route::get('api/users', [UserController::class, 'index']);