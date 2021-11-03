<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$9O2Baad6CrI9NqG7xIQsOOE4wkC/AYX3qTNkpUl62ooSfIOC4WIgy',
                'role_id' => 1,
                'remember_token' => NULL,
            ),
        ));
        
        
    }
}