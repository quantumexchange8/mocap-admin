<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    
    public function updateProfilePic(Request $request)
    {
        // dd($request->all(), $request->file('profile_image'));

        $request->validate([
            'profile_image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);
        $user = Auth::user();

        // Store new image
        if ($request->hasFile('profile_image')) {
            $user->addMedia($request->file('profile_image'))->toMediaCollection('profile_image');
        }
        return redirect()->back();
    }

    public function removeProfilePic(Request $request)
    {
        $user = Auth::user();
        $user->clearMediaCollection('profile_image');
        return redirect()->back();
    }

    public function updateName(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
        ]);
        $user->update([
            'username' => $request->username,
        ]);
        return redirect()->back();
    }

    public function updateEmail(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'new_email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'current_password'],

        ]);
        $newEmail = $request->new_email;

        // Generate a signed URL with the new email as a parameter
        $url = URL::temporarySignedRoute(
            'confirm-email', now()->addMinutes(60), [
                'user' => $user->id,
                'new_email' => $newEmail,
            ]
        );

        // Send Confirmation email to current email
        Mail::to($user->email)->send(new \App\Mail\ChangeEmailConfirmation($user, $newEmail, $url));
        return redirect()->back();

    }
    
    public function confirmEmailChange(Request $request)
    {
        // dd($request->all());
        $user = User::findOrFail($request->query('user'));
        $newEmail = $request->query('new_email');

        // Step 2: Send verification to new email
        $url = URL::temporarySignedRoute(
            'verify-new-email', now()->addMinutes(60), [
                'user' => $user->id,
                'new_email' => $newEmail,
            ]
        );
        
        Mail::to($newEmail)->send(new \App\Mail\VerifyNewEmail($user, $url));
        return Inertia::render('AccountSetting/ConfirmationSent');
    }

    public function verifyNewEmail(Request $request)
    {
        $user = User::findOrFail($request->query('user'));
        $newEmail = $request->query('new_email');
        $oldEmail = $user->email;

        // Step 3: Update email and notify both addresses
        $user->email = $newEmail;
        $user->save();

        Mail::to($oldEmail)->send(new \App\Mail\EmailChangedNotification($user, $oldEmail, $newEmail, true));
        Mail::to($newEmail)->send(new \App\Mail\EmailChangedNotification($user, $oldEmail, $newEmail, false));

        return Inertia::render('AccountSetting/VerifyEmail');
    }

    public function updateTitle(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);
        $user->update([
            'title' => $request->title,
        ]);
        return redirect()->back();
    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'password' => ['required', 'current_password'],
            'new_password' => ['required', 'string', 'confirmed'],
            'new_password_confirmation' => ['required', 'string'],
        ],[
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ]);

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);
        return redirect()->back();
    }
}