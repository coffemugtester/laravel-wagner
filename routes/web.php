<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\VerwaltungController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MenuController::class, 'welcome'])->name('home');

// Public reservation requests
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/verwaltung', [VerwaltungController::class, 'index'])->name('verwaltung');
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::post('/menu-items', [MenuController::class, 'store'])->name('menu-items.store');
    Route::put('/menu-items/{menuItem}', [MenuController::class, 'update'])->name('menu-items.update');
    Route::delete('/menu-items/{menuItem}', [MenuController::class, 'destroy'])->name('menu-items.destroy');
    Route::patch('/menu-items/{menuItem}/toggle', [MenuController::class, 'toggleAvailability'])->name('menu-items.toggle');

    Route::put('/reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy'])->name('reservations.destroy');
    Route::patch('/reservations/{reservation}/toggle', [ReservationController::class, 'toggleProcessed'])->name('reservations.toggle');

    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');
});

require __DIR__.'/settings.php';
