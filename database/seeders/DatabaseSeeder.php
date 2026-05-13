<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user if it doesn't exist
        $adminEmail = env('ADMIN_EMAIL', 'admin@cafe-wagner.de');
        $adminName = env('ADMIN_NAME', 'Admin');
        $adminPassword = env('ADMIN_PASSWORD', 'password');

        if (! User::where('email', $adminEmail)->exists()) {
            User::create([
                'name' => $adminName,
                'email' => $adminEmail,
                'password' => bcrypt($adminPassword),
                'email_verified_at' => now(),
            ]);
        }
    }
}
