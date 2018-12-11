<?php

use Illuminate\Database\Seeder;
use App\Note;
class NoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Note::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 50; $i++) {
            Note::create([
                'title' => $faker->sentence,
                'Context' => $faker->paragraph,
                'Image' => '..\Assets\img\happy.svg'
            ]);
        }
    }
}
