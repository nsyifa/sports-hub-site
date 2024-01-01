<?php

namespace App\Console\Commands;

// app/Console/Commands/ImportProducts.php

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ImportProducts extends Command
{
    protected $signature = 'import:products';
    protected $description = 'Import products from CSV file';

    public function handle()
    {
        $csvFile = Storage::path('csv/Adidas.csv'); // Update with your actual file path
        $csvData = array_map('str_getcsv', file($csvFile));

        foreach ($csvData as $row) {
            Product::create([
                'name' => $row[1], 
                'price' => $row[2], 
                'image' => $row[3],
                'status' => $row[4],
            ]);
        }

        $this->info('Products imported successfully!');
    }
}

