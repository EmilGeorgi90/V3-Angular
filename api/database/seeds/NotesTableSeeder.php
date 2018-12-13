<?php

use Illuminate\Database\Seeder;
use App\Notes;
class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.

        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 50; $i++) {
            Notes::create([
                'user_id' => 1,
                'title' => $faker->sentence,
                'context' => $faker->sentence,
                'image' => $faker->sentence
            ]);
        }
    }
}
