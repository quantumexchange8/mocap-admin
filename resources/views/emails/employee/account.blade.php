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

<div style="color: #030712; font-size: 30px; font-weight:700;">
    Welcome to Motion Capture
</div>

<span style="color: #374151; font-size:14px;">Dear {{ $user->username }},</span>

<span style="color: #374151; font-size:14px;">
    Welcome to Motion Capture! We are excited to have you on board. To get started, you can log in to the Motion Capture Mobile App with the credentials provided below.
</span>

<p style="color: #374151; font-size:14px;font-weight:600; margin: 20px 0 5px;">
    Login Credentials:
</p>
<ul style="color: #374151; font-size:14px; padding-left: 20px; margin-top: 0;">
    <li>[iOS App Store Link]</li>
    <li>[Android Play Store Link]</li>
</ul>

<span style="color: #374151; font-size:14px;font-weight:600">
    Next Steps
</span>
<div style="color: #374151; font-size:14px;">
    <span>1. Download the Motion Capture Mobile App:</span>
    <ul>
        <li>CTID: {{ $user->employee_id }}</li>
        <li>Temporary Password: {{ $plainPassword }}</li>
    </ul>
    <span>2. Log in with your credentials above.</span><br>
    <span>3. Change your password:</span>
    <ul>
        <li> {{-- list decimal none --}}
            Once logged in, we highly recommend changing your temporary password to something more secure. You can do this by navigating to the profile or account settings within the app.
        </li>
    </ul>
</div>

<span style="color: #374151; font-size:14px;">
    If you have any issues logging in or need assistance, feel free to contact our support team at <a href="mailto:motion.capture@currenttech.pro" ></a> or the HR team  at <a href="mailto:hr.admin@currenttech.pro"></a>.
</span>
<br>
<br>

<span style="color: #374151; font-size:14px;">
    We look forward to working with you!
</span>
<br>
<br>

{{-- @component('mail::button', ['url' => url('/')])
Login Here
@endcomponent --}}

<span style="color: #374151; font-size:14px;">
    Best Regards,
</span><br>
<span style="color: #374151; font-size:14px;">
    Motion Capture Support Team
</span>


{{-- {{ config('app.name') }} --}}


@endcomponent
