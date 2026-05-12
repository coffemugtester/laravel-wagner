<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'time_from' => 'required',
            'time_to' => 'required',
            'notes' => 'nullable|string',
        ]);

        Event::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'time_from' => 'required',
            'time_to' => 'required',
            'notes' => 'nullable|string',
        ]);

        $event->update($validated);

        return redirect()->back();
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return redirect()->back();
    }
}
