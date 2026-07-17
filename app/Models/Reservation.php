<?php

namespace App\Models;

use Database\Factories\ReservationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /** @use HasFactory<ReservationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'time',
        'guests',
        'phone',
        'email',
        'notes',
        'processed',
        'accepted_at',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'time' => 'datetime:H:i',
            'processed' => 'boolean',
            'accepted_at' => 'datetime',
        ];
    }

    /**
     * Whether this reservation has already been accepted (and thus the
     * confirmation email already sent).
     */
    public function isAccepted(): bool
    {
        return $this->accepted_at !== null;
    }
}
