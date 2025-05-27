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
    Motion Capture Account Has Been Deleted
</div>
<br>

<span style="color: #374151; font-size:14px;">Hi {{ $user->username }},</span>

<span style="color: #374151; font-size:14px;">We’re writing to confirm that your account associated with {{ $user->email }} has been successfully deleted from the Motion Capture system.</span>
<br>

<span style="color: #374151; font-size:14px;">If you believe this action was taken in error, or if you have any questions, please contact our support team immediately at <a href="mailto:motion.capture@currenttech.pro" >motion.capture@currenttech.pro</a>.</span>
<br>

<span style="color: #374151; font-size:14px;">We thank you for your time with us, and we wish you all the best in your future endeavours.</span>
<br>

<span style="color: #374151; font-size:14px;">
    Best Regards,
</span><br>
<span style="color: #374151; font-size:14px;">
    Motion Capture Support Team
</span>


{{-- {{ config('app.name') }} --}}


@endcomponent
