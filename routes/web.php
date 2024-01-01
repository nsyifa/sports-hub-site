<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $productsController = app(ProductController::class);
    $products = $productsController->index();

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => $products,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('users',[UserController::class,'index'])->middleware(['auth:admins']);

Route::resource('users', UserController::class)
    ->only(['index'])
    ->middleware(['auth:admins']);

Route::patch('users', [UserController::class, 'update'])->middleware('auth:admins')->name('users.update');

Route::get('products', [ProductController::class, 'index']);

Route::resource('products', ProductController::class)
    ->only(['destroy', 'store'])
    ->middleware(['auth:admins']);

// Route::group(['middleware' => ['auth:admins']], function () {
//     Route::resource('products', ProductController::class)
//         ->only(['destroy']);
// });

Route::post('products/update', [ProductController::class,'update'])->middleware('auth:admins')->name('products.update');

Route::get('/admin/dashboard', function () {
    $productsController = app(ProductController::class);
    $products = $productsController->index();
    $usersController = app(UserController::class);
    $users = $usersController->index();

    return Inertia::render('AdminDashboard', ['products' => $products,'users'=> $users]);
})->middleware(['auth:admins'])->name('admin.dashboard');

Route::get('/admin/users', function () {
    $usersController = app(UserController::class);
    $users = $usersController->index();

    return Inertia::render('AdminUsers', ['users'=> $users]);
})->middleware(['auth:admins'])->name('admin.users');

Route::get('/admin/products', function () {
    $productsController = app(ProductController::class);
    $products = $productsController->index();

    return Inertia::render('AdminProducts', ['products'=> $products]);
})->middleware(['auth:admins'])->name('admin.products');

Route::prefix('/admin')->group(function () {
    Route::get('/login', [AdminLoginController::class, 'create'])->name('admin.login');
    Route::post('/login', [AdminLoginController::class, 'login'])->name('admin.login');
    Route::post('/logout', [AdminLoginController::class, 'destroy'])->name('admin.logout');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
