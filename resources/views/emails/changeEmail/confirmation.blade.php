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
    Confirm Your Request to Change Email Address
</div>
<br>

<span style="color: #374151; font-size:14px;">Hi {{ $user->username }},</span>

<span style="color: #374151; font-size:14px;">We received a request to change the email address associated with your Motion Capture account. To confirm this change, please verify that it was you who made this request.</span>

<span style="color: #374151; font-size:14px;font-weight:600; margin: 20px 0 5px;">
    Current Email:<span style="color: #374151; font-weight:400; font-size:14px;"> {{ $user->email }}</span>
</span>
<br>
<span style="color: #374151; font-size:14px; font-weight:600; margin: 20px 0 5px;">
    New Email:<span style="color: #374151; font-weight:400; font-size:14px;"> {{ $newEmail }}</span>
</span>
<br>
<br>

<span style="color: #374151; font-size:14px;">If you made this request, please confirm by clicking the link below:</span>
<br>
<br>
<a href="{{ $url }}" style="background-color:#030712; color:#FFF; border:1px solid #030712; border-radius:2px; padding:8px 16px; font-size:14px; font-weight:400; cursor:pointer; ">
    Confirm Email Change
</a>

<span style="color: #374151; font-size:14px;">
    For security reasons, if you did not request this change, please ignore this email or contact our support team immediately at <a href="mailto:motion.capture@currenttech.pro" >motion.capture@currenttech.pro</a>.
</span>
<br>
<br>

<span style="color: #374151; font-size:14px;">
    Thank you for helping us keep your account secure!
</span>
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
