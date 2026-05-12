<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'name',
        'category',
        'price',
        'description',
        'available',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'available' => 'boolean',
        ];
    }
}
