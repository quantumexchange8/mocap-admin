@component('mail::message')

{{-- <head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
        .outfit-font {
            font-family: 'Outfit', sans-serif;
        }
    </style>
</head> --}}

<div style="text-align: center; margin-bottom: 20px; display: flex;">
    <img src="{{ config('app.url') }}/asset/logo.svg" alt="Company Logo" style="max-height: 80px;">
    <img src="{{ config('app.url') }}/asset/logo2.svg" alt="Company Logo2" style="max-height: 80px;">
</div>

<div style="color: #030712; font-size: 20px; font-weight:600;">
    Your Login Password Has Been Changed
</div>
<br>

<span style="color: #374151; font-size:14px;">Dear {{ $user->username }},</span>

<span style="color: #374151; font-size:14px;">This is to inform you that your login password has been changed by the administrator. Below are the details of your new login credentials:</span>

<span style="color: #374151; font-size:14px;">New Login Password: {{ $plainPassword }}</span>

<span style="color: #374151; font-size:14px;">For security purpose, we strongly recommend that you log in and change your password immediately. To update your password, follow these steps:</span>

<div style="color: #374151; font-size:14px;">
    <span>1. Log in to your account using the new password provided above.</span><br>
    <span>2. Navigate to the “Account Settings” section.</span><br>
    <span>3. Select “Change Password” and follow the instructions to create a new password of your choice.</span><br>
</div>
<br>

<span style="color: #374151; font-size:14px;">
    If you did not request this change or have any concerns about your account’s security, please contact our support team at <a href="mailto:motion.capture@currenttech.pro" >motion.capture@currenttech.pro</a>.
</span>

<br>
<span style="color: #374151; font-size:14px;">
   Thank you for your attention.
</span>
<br>
<br>

<span style="color: #374151; font-size:14px;">
    Best Regards,
</span><br>
<span style="color: #374151; font-size:14px;">
    Motion Capture Support Team
</span>

@endcomponent
