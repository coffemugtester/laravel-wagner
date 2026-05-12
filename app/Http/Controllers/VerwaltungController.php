<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\MenuItem;
use App\Models\Reservation;
use Inertia\Inertia;
use Inertia\Response;

class VerwaltungController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('verwaltung', [
            'menuItems' => MenuItem::orderBy('category')->orderBy('name')->get(),
            'reservations' => Reservation::orderBy('date')->orderBy('time')->get(),
            'events' => Event::orderBy('date')->orderBy('time_from')->get(),
        ]);
    }
}
