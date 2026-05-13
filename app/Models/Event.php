<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name',
        'date',
        'time_from',
        'time_to',
        'notes',
        'image',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'time_from' => 'datetime:H:i',
            'time_to' => 'datetime:H:i',
        ];
    }
}
