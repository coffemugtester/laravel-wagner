<?php

use App\Models\Event;
use App\Models\MenuItem;
use App\Models\Reservation;
use App\Models\User;

test('an authenticated user can delete a reservation', function () {
    $reservation = Reservation::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('reservations.destroy', $reservation))
        ->assertRedirect();

    $this->assertModelMissing($reservation);
});

test('an authenticated user can delete an event', function () {
    $event = Event::create([
        'name' => 'Sommerfest',
        'date' => now()->addWeek()->format('Y-m-d'),
        'time_from' => '18:00',
        'time_to' => '22:00',
    ]);

    $this->actingAs(User::factory()->create())
        ->delete(route('events.destroy', $event))
        ->assertRedirect();

    $this->assertModelMissing($event);
});

test('an authenticated user can delete a menu item', function () {
    $menuItem = MenuItem::create([
        'name' => 'Käsekuchen',
        'category' => 'Kuchen und Torten',
        'price' => 4.50,
        'description' => 'Hausgemacht',
        'available' => true,
    ]);

    $this->actingAs(User::factory()->create())
        ->delete(route('menu-items.destroy', $menuItem))
        ->assertRedirect();

    $this->assertModelMissing($menuItem);
});
