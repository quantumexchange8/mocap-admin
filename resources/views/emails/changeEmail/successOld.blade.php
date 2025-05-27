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
    Your Email Address Has Been Updated
</div>
<br>

<span style="color: #374151; font-size:14px;">Hi {{ $user->username }},</span>

<span style="color: #374151; font-size:14px;">We wanted to let you know that your email address has been successfully updated in our system.</span>

<span style="color: #374151; font-size:14px; font-weight:600; margin: 20px 0 5px;">
    New Email Address:<span style="color: #374151; font-weight:400; font-size:14px;"> {{ $newEmail }}</span>
</span>
<br>
<br>

<span style="color: #374151; font-size:14px;">
    If you did not request this change or if you believe this update was made in error, please contact our support team at <a href="mailto:motion.capture@currenttech.pro" >motion.capture@currenttech.pro</a>.
</span>
<br>
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


{{-- {{ config('app.name') }} --}}


@endcomponent
