<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $users = User::all();

        // return response()->json($users);
        return response($users);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //  
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'userIds' => 'required|array',
            'registration_approve' => 'nullable|date',
        ]);

        // Get an array of user IDs from the request
        $userIds = $validatedData['userIds'];

        // Update each user
        foreach ($userIds as $userId) {
            $user_toupdate = User::find($userId);

            if ($user_toupdate) {
                $user_toupdate->update([
                    'registration_approve' => $validatedData['registration_approve'],
                ]);
            }
        }

        return redirect(route('admin.users'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
