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
        $reservations = Reservation::orderBy('date')->orderBy('time')->get()->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'name' => $reservation->name,
                'date' => $reservation->date->format('d.m.Y'),
                'date_raw' => $reservation->date->format('Y-m-d'),
                'time' => $reservation->time->format('H:i'),
                'guests' => $reservation->guests,
                'phone' => $reservation->phone,
                'notes' => $reservation->notes,
                'processed' => $reservation->processed,
            ];
        });

        $events = Event::orderBy('date')->orderBy('time_from')->get()->map(function ($event) {
            return [
                'id' => $event->id,
                'name' => $event->name,
                'date' => $event->date->format('d.m.Y'),
                'date_raw' => $event->date->format('Y-m-d'),
                'time_from' => $event->time_from->format('H:i'),
                'time_to' => $event->time_to->format('H:i'),
                'notes' => $event->notes,
                'image' => $event->image,
            ];
        });

        return Inertia::render('verwaltung', [
            'menuItems' => MenuItem::orderBy('category')->orderBy('name')->get(),
            'reservations' => $reservations,
            'events' => $events,
        ]);
    }
}
