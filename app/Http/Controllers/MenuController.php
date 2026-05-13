<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class MenuController extends Controller
{
    public function welcome(): Response
    {
        $menuSections = MenuItem::where('available', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get()
            ->groupBy('category')
            ->map(function ($items, $category) {
                return [
                    'title' => $category,
                    'subtitle' => '',
                    'items' => $items->map(function ($item) {
                        return [
                            $item->name,
                            $item->description,
                            '€'.number_format($item->price, 2, ',', '.'),
                        ];
                    })->values()->toArray(),
                ];
            })
            ->values()
            ->toArray();

        $events = Event::orderBy('date')
            ->orderBy('time_from')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'date' => $event->date->format('d.m.Y'),
                    'time_from' => $event->time_from->format('H:i'),
                    'time_to' => $event->time_to->format('H:i'),
                    'notes' => $event->notes,
                    'image' => $event->image,
                ];
            });

        return Inertia::render('welcome', [
            'menuSections' => $menuSections,
            'events' => $events,
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'available' => 'boolean',
        ]);

        MenuItem::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, MenuItem $menuItem): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'available' => 'boolean',
        ]);

        $menuItem->update($validated);

        return redirect()->back();
    }

    public function destroy(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->delete();

        return redirect()->back();
    }

    public function toggleAvailability(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->update(['available' => ! $menuItem->available]);

        return redirect()->back();
    }
}
