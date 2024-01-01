<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminLoginController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/AdminLoginForm', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admins')->attempt($credentials)) {
            // Authentication passed, redirect to admin dashboard
            $request->session()->regenerate();
            return redirect()->intended('/admin/dashboard');
        }

        // Authentication failed, redirect back with error message
        return redirect()->route('admin.login')->with('error', 'Invalid credentials');
    }

    public function destroy(Request $request): RedirectResponse
        {
            Auth::guard('admins')->logout();

            $request->session()->invalidate();

            $request->session()->regenerateToken();

            return redirect('admin/login');
        }
}
