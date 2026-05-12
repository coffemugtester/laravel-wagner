<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'guests' => 'required|integer|min:1',
            'phone' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        Reservation::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Reservation $reservation): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'guests' => 'required|integer|min:1',
            'phone' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $reservation->update($validated);

        return redirect()->back();
    }

    public function destroy(Reservation $reservation): RedirectResponse
    {
        $reservation->delete();

        return redirect()->back();
    }

    public function toggleProcessed(Reservation $reservation): RedirectResponse
    {
        $reservation->update(['processed' => ! $reservation->processed]);

        return redirect()->back();
    }
}
