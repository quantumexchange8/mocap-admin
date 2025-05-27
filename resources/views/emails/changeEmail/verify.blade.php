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
    Confirm Your New Email Address for Motion Capture
</div>
<br>

<span style="color: #374151; font-size:14px;">Hi {{ $user->username }},</span>

<span style="color: #374151; font-size:14px;">We’ve received a request to update your email address for your Motion Capture account.</span>

<span style="color: #374151; font-size:14px;">To complete the process, please verify your new email address by clicking the link below:</span>
<br>
<br>
<a href="{{ $url }}" style="background-color:#030712; color:#FFF; border:1px solid #030712; border-radius:2px; padding:8px 16px; font-size:14px; font-weight:400; cursor:pointer; ">
    Verify Email Change
</a>

<span style="color: #374151; font-size:14px;">This link will expire in 24 hours, so be sure to verify your email before then.</span>

<span style="color: #374151; font-size:14px;">For security reasons, if you did not request this change, please ignore this email or contact our support team immediately at <a href="mailto:motion.capture@currenttech.pro" >motion.capture@currenttech.pro</a>.</span>

<span style="color: #374151; font-size:14px;">Thank you for helping us keep your account secure!</span>
<br>
<br>

<span style="color: #374151; font-size:14px;">
    Best Regards,
</span><br>
<span style="color: #374151; font-size:14px;">
    Motion Capture Support Team
</span>


{{-- {{ config('app.name') }} --}}


@endcomponent
