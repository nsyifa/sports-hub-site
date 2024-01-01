<?php

namespace App\Console\Commands;

// app/Console/Commands/ImportProducts.php

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ImportUsers extends Command
{
    protected $signature = 'import:users';
    protected $description = 'Import users from CSV file';

    public function handle()
    {
        $csvFile = Storage::path('csv/Users.csv'); // Update with your actual file path
        $csvData = array_map('str_getcsv', file($csvFile));

        foreach ($csvData as $row) {
            $registrationApprove = empty($row[4]) ? null : $row[4];
            User::create([
                'name' => $row[1], 
                'phone_number' => $row[2], 
                'email' => $row[3],
                'registration_approve' => $registrationApprove,
                'password' => $row[5],
            ]);
        }

        $this->info('Users imported successfully!');
    }
}

