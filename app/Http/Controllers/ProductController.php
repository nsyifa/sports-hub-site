<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        // return response()->json($products);
        return response($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        Log::info("Request for update product", ['request_data' => $request->all()]);
        

        $request['price'] = (float) $request['price'];

        Log::info("Parsed request for update product", ['request_data' => $request->all()]);

        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif',
            'status' => 'required|string'
        ]);

        Log::info("Passed validation", $validated);

        if ($request->hasFile('image')) {

            $image = $request->file('image');

            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(public_path('images'), $imageName);

            $validated['image'] = '/images/'.$imageName;

            // Optional: If you want to delete the old image file, you can use something like:
            // if ($product->image) {
            //     Storage::delete($product->image);
            // }
        }
        Product::create($validated);
        return redirect(route('admin.products'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request): RedirectResponse
    {
        Log::info("Request for update product", ['request_data' => $request->all()]);
        

        $request['price'] = (float) $request['price'];
        $request['id'] = (int) $request['id'];

        Log::info("Parsed request for update product", ['request_data' => $request->all()]);

        $validated = $request->validate([
            'id' => 'required|integer',
            'name' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif',
            'status' => 'required|string'
        ]);

        Log::info("Passed validation", $validated);
        $productId = $validated['id'];

        $product = Product::find($productId);

        if ($request->hasFile('image')) {

            $image = $request->file('image');

            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(public_path('images'), $imageName);

            $validated['image'] = '/images/'.$imageName;

            // Optional: If you want to delete the old image file, you can use something like:
            // if ($product->image) {
            //     Storage::delete($product->image);
            // }
        }

        $product->update($validated);
        return redirect(route('admin.products'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
            $product->delete();
    
            return redirect()->route('admin.products')->with('success', 'Product deleted successfully!');
        
    }
}
