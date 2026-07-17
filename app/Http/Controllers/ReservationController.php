<?php

namespace App\Http\Controllers;

use App\Mail\ReservationConfirmation;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
            'email' => 'nullable|email|max:255',
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
            'email' => 'nullable|email|max:255',
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

    /**
     * Accept a reservation request and send the guest a confirmation email.
     *
     * The confirmation is only ever sent once: an already-accepted
     * reservation is left untouched so re-triggering never re-sends.
     */
    public function accept(Reservation $reservation): RedirectResponse
    {
        if ($reservation->isAccepted()) {
            return redirect()->back();
        }

        $reservation->update(['accepted_at' => now()]);

        if ($reservation->email) {
            Mail::to($reservation->email)->send(new ReservationConfirmation($reservation));
        }

        return redirect()->back();
    }
}
