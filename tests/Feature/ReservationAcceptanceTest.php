<?php

use App\Mail\ReservationConfirmation;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('accepting a reservation queues a confirmation email to the guest', function () {
    Mail::fake();

    $reservation = Reservation::factory()->create(['email' => 'gast@example.com']);

    $this->actingAs(User::factory()->create())
        ->post(route('reservations.accept', $reservation))
        ->assertRedirect();

    expect($reservation->fresh()->accepted_at)->not->toBeNull();

    Mail::assertQueued(ReservationConfirmation::class, function (ReservationConfirmation $mail) use ($reservation) {
        return $mail->reservation->is($reservation)
            && $mail->hasTo('gast@example.com');
    });
});

test('an already accepted reservation is not confirmed again', function () {
    Mail::fake();

    $reservation = Reservation::factory()->accepted()->create();
    $originalAcceptedAt = $reservation->accepted_at;

    $this->actingAs(User::factory()->create())
        ->post(route('reservations.accept', $reservation))
        ->assertRedirect();

    Mail::assertNothingQueued();
    expect($reservation->fresh()->accepted_at->equalTo($originalAcceptedAt))->toBeTrue();
});

test('accepting a reservation without an email still marks it accepted but sends nothing', function () {
    Mail::fake();

    $reservation = Reservation::factory()->withoutEmail()->create();

    $this->actingAs(User::factory()->create())
        ->post(route('reservations.accept', $reservation))
        ->assertRedirect();

    expect($reservation->fresh()->accepted_at)->not->toBeNull();
    Mail::assertNothingQueued();
});

test('guests cannot accept reservations', function () {
    Mail::fake();

    $reservation = Reservation::factory()->create();

    $this->post(route('reservations.accept', $reservation))
        ->assertRedirect(route('login'));

    expect($reservation->fresh()->accepted_at)->toBeNull();
    Mail::assertNothingQueued();
});

test('the public reservation form stores the email in its own column', function () {
    $this->post(route('reservations.store'), [
        'name' => 'Erika Mustermann',
        'date' => now()->addWeek()->format('Y-m-d'),
        'time' => '19:30',
        'guests' => 4,
        'phone' => '+49 30 1234567',
        'email' => 'erika@example.com',
    ])->assertRedirect();

    $this->assertDatabaseHas('reservations', [
        'name' => 'Erika Mustermann',
        'email' => 'erika@example.com',
    ]);
});
