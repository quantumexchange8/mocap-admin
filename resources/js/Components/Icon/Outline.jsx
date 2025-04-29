import React from 'react';

const Dashboard = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1.73828" y="2.26172" width="4.66667" height="4.66667" stroke="currentColor" strokeLinecap="square"/>
            <rect x="9.75781" y="1.73828" width="4.66667" height="4.66667" transform="rotate(15 9.75781 1.73828)" stroke="currentColor" strokeLinecap="square"/>
            <rect x="1.73828" y="9.59375" width="4.66667" height="4.66667" stroke="currentColor" strokeLinecap="square"/>
            <rect x="9.07031" y="9.59375" width="4.66667" height="4.66667" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    ); 
}

const Request = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.3641 12.3506C11.1274 13.5874 9.49953 14.1863 7.88185 14.1513C5.68503 14.1038 1.83203 14.1383 1.83203 14.1383L3.18225 11.9858C3.18225 11.9858 1.86416 10.028 1.86416 8.00518C1.86299 6.43016 2.46267 4.85548 3.66644 3.65197C6.066 1.25153 9.96451 1.25153 12.3641 3.65135C14.768 6.0555 14.7636 9.95074 12.3641 12.3506Z" stroke="currentColor" strokeLinecap="round"/>
            <path d="M5.54238 8.25298H5.47656" stroke="currentColor" strokeLinecap="square"/>
            <path d="M8.03457 8.25298H7.96874" stroke="currentColor" strokeLinecap="square"/>
            <path d="M10.5229 8.25298H10.457" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Calendar = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.50781 6.40094H13.4993" stroke="currentColor" strokeLinecap="square"/>
            <path d="M10.7398 8.80719H10.7455" stroke="currentColor" strokeLinecap="square"/>
            <path d="M8.00154 8.80719H8.00725" stroke="currentColor" strokeLinecap="square"/>
            <path d="M5.25935 8.80719H5.26506" stroke="currentColor" strokeLinecap="square"/>
            <path d="M10.7398 11.2056H10.7455" stroke="currentColor" strokeLinecap="square"/>
            <path d="M8.00154 11.2056H8.00725" stroke="currentColor" strokeLinecap="square"/>
            <path d="M5.25935 11.2056H5.26506" stroke="currentColor" strokeLinecap="square"/>
            <path d="M10.4927 1.83203V3.86136" stroke="currentColor" strokeLinecap="square"/>
            <path d="M5.5122 1.83203V3.86136" stroke="currentColor" strokeLinecap="square"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5492 2.80859H2.44922V14.1681H13.5492V2.80859Z" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Report = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.73039 10.8594H6.10156" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"/>
            <path d="M8.35294 8.33594H6.09766" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.0473 1.83203H3.21875V14.1654H13.4516V5.37754L10.0473 1.83203Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.72656 2.20312V5.76674H13.1313" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Announcement = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_2013_612)">
                <path d="M7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654Z" stroke="currentColor"/>
                <path d="M5.66667 8.63411C6.03487 8.63411 6.33333 8.33565 6.33333 7.96745C6.33333 7.59925 6.03487 7.30078 5.66667 7.30078C5.29847 7.30078 5 7.59925 5 7.96745C5 8.33565 5.29847 8.63411 5.66667 8.63411Z" fill="#030712"/>
                <path d="M7.31641 9.61624C7.73867 9.19401 7.99984 8.61067 7.99984 7.96634C7.99984 7.32201 7.73867 6.73867 7.31641 6.31641" stroke="currentColor" strokeLinecap="square"/>
                <path d="M8.96484 11.2676C9.80934 10.4231 10.3317 9.25647 10.3317 7.9678C10.3317 6.67914 9.80934 5.51247 8.96484 4.66797" stroke="currentColor" strokeLinecap="square"/>
            </g>
            <defs>
                <clipPath id="clip0_2013_612">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

const Employee = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.0026 6.66536C9.47536 6.66536 10.6693 5.47146 10.6693 3.9987C10.6693 2.52594 9.47536 1.33203 8.0026 1.33203C6.52984 1.33203 5.33594 2.52594 5.33594 3.9987C5.33594 5.47146 6.52984 6.66536 8.0026 6.66536Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M14 14.668C14 11.3543 11.3137 8.66797 8 8.66797C4.6863 8.66797 2 11.3543 2 14.668" stroke="currentColor" strokeLinecap="square"/>
            <path d="M7.9974 14.668L9.33073 13.0013L7.9974 8.66797L6.66406 13.0013L7.9974 14.668Z" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Attendance = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.9974 5.9987C9.28606 5.9987 10.3307 4.95403 10.3307 3.66536C10.3307 2.3767 9.28606 1.33203 7.9974 1.33203C6.70873 1.33203 5.66406 2.3767 5.66406 3.66536C5.66406 4.95403 6.70873 5.9987 7.9974 5.9987Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M1.33594 13.6654C1.33594 10.7198 4.02224 8.33203 7.33594 8.33203" stroke="currentColor" strokeLinecap="square"/>
            <path d="M11.3359 14.332C12.9928 14.332 14.3359 12.9889 14.3359 11.332C14.3359 9.67518 12.9928 8.33203 11.3359 8.33203C9.67908 8.33203 8.33594 9.67518 8.33594 11.332C8.33594 12.9889 9.67908 14.332 11.3359 14.332Z" stroke="currentColor"/>
            <path d="M11 10.332V11.6654H12.3333" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const SalaryProfile= ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1.83203" y="3.3125" width="12.3333" height="9.37335" stroke="currentColor" strokeLinecap="square"/>
            <path d="M1.83203 6.52344H14.1654" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.90234 10.2266H12.2192" stroke="currentColor" strokeLinecap="square"/>
            <path d="M7.08203 10.2266H7.5806" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const PerformanceData= ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.77513 6.95312V10.973" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"/>
            <path d="M8.00169 5.02734V10.9708" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"/>
            <path d="M11.2243 9.07812V10.9738" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.1654 14.168L14.1654 1.83463L1.83203 1.83464L1.83203 14.168L14.1654 14.168Z" stroke="currentColor" strokeLinecap="round"/>
        </svg>
    );
}

const Department = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.3307 2H5.66406V5H10.3307V2Z" stroke="currentColor"/>
            <path d="M6.66667 11H2V14H6.66667V11Z" stroke="currentColor"/>
            <path d="M14.0026 11H9.33594V14H14.0026V11Z" stroke="currentColor"/>
            <path d="M8 5.33203V7.9987" stroke="currentColor" strokeLinecap="square"/>
            <path d="M4.33594 11V8H11.6693V11" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const ProjectFolder = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.375 11.2175V9.65625" stroke="currentColor" strokeLinecap="square"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.0582 4.23438V8.23439C11.5443 9.12054 9.5443 9.65593 7.36584 9.65593C5.18738 9.65593 3.19353 9.12054 1.67969 8.23439V4.23438H13.0582Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.52643 4.07081L8.91111 2.64844H5.8342L5.21875 4.07081" stroke="currentColor" strokeLinecap="square"/>
            <path d="M1.69531 9.96484L1.81162 13.3538H12.9273L13.0436 9.96484" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Tickets = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.30859 3.22266V4.71499" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.30859 11.5508V12.7989" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.30859 9.43387V6.46094" stroke="currentColor" strokeLinecap="square"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.3333 12.9331V9.32595C13.5899 9.32595 12.9911 8.73462 12.9911 8.00035C12.9911 7.26615 13.5899 6.67415 14.3333 6.67415V3.06641H2V6.72622C2.7435 6.72622 3.34229 7.26615 3.34229 8.00035C3.34229 8.73462 2.7435 9.32595 2 9.32595V12.9331H14.3333Z" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const SalaryIncrement = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1.83203 14H13.8332" stroke="currentColor" strokeLinecap="square"/>
            <path d="M1.83203 8.60156L4.23227 9.20162V12.2019H1.83203V8.60156Z" stroke="currentColor"/>
            <path d="M6.63281 7.99699L9.03305 6.79688V12.1974H6.63281V7.99699Z" stroke="currentColor"/>
            <path d="M11.4336 5.59855L13.8338 4.39844V12.1992H11.4336V5.59855Z" stroke="currentColor"/>
            <path d="M1.83203 6.20041L4.23227 6.80047L13.8332 2H10.8329" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Bonus = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.84116 5.15757C6.58504 5.15757 7.99873 4.45072 7.99873 3.57879C7.99873 2.70685 6.58504 2 4.84116 2C3.09729 2 1.68359 2.70685 1.68359 3.57879C1.68359 4.45072 3.09729 5.15757 4.84116 5.15757Z" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M1.68359 3.57812C1.68359 3.57812 1.68359 4.91649 1.68359 5.78842C1.68359 6.66036 3.09729 7.36721 4.84116 7.36721C6.58503 7.36721 7.99873 6.66036 7.99873 5.78842C7.99873 5.27197 7.99873 3.57812 7.99873 3.57812" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M1.68359 5.78906C1.68359 5.78906 1.68359 7.12743 1.68359 7.99936C1.68359 8.87129 3.09729 9.57815 4.84116 9.57815C6.58503 9.57815 7.99873 8.87129 7.99873 7.99936C7.99873 7.48291 7.99873 5.78906 7.99873 5.78906" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M1.68359 8C1.68359 8 1.68359 9.33837 1.68359 10.2103C1.68359 11.0822 3.09729 11.7891 4.84116 11.7891C6.58503 11.7891 7.99873 11.0822 7.99873 10.2103C7.99873 9.69385 7.99873 8 7.99873 8" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M1.68359 10.2109C1.68359 10.2109 1.68359 11.5493 1.68359 12.4212C1.68359 13.2932 3.09729 14 4.84116 14C6.58503 14 7.99873 13.2932 7.99873 12.4212C7.99873 11.9048 7.99873 10.2109 7.99873 10.2109" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M11.1576 9.57945C12.9014 9.57945 14.3151 8.8726 14.3151 8.00066C14.3151 7.12872 12.9014 6.42188 11.1576 6.42188C9.41369 6.42188 8 7.12872 8 8.00066C8 8.8726 9.41369 9.57945 11.1576 9.57945Z" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M8 8C8 8 8 9.33837 8 10.2103C8 11.0822 9.41371 11.7891 11.1576 11.7891C12.9014 11.7891 14.3151 11.0822 14.3151 10.2103C14.3151 9.69385 14.3151 8 14.3151 8" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
            <path d="M8 10.2109C8 10.2109 8 11.5493 8 12.4212C8 13.2932 9.41371 14 11.1576 14C12.9014 14 14.3151 13.2932 14.3151 12.4212C14.3151 11.9048 14.3151 10.2109 14.3151 10.2109" stroke="currentColor" strokeWidth="0.947271" strokeLinecap="square"/>
        </svg>
    );
}

const Assets = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.32031 7.51406H10.8862V6.59375H8.32031V7.51406Z" fill="#030712"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.16434 2.33291C1.15676 2.35273 1.15399 2.56292 1.15826 2.80003L1.16599 3.23111L2.71303 3.24595L2.72613 3.30825C2.73336 3.34252 2.90988 5.08354 3.11838 7.17721C3.32689 9.27088 3.50276 10.9996 3.50919 11.0187C3.52643 11.07 12.611 11.07 12.6283 11.0187C12.6348 10.9996 12.8356 9.49045 13.0746 7.66521C13.3136 5.83999 13.516 4.31209 13.5243 4.26992L13.5395 4.19323H3.75103L3.73424 4.06076C3.72504 3.98789 3.68602 3.60201 3.64756 3.20322C3.60907 2.80443 3.57094 2.43734 3.56283 2.38751L3.54802 2.29688H2.36309C1.42037 2.29688 1.17536 2.30424 1.16434 2.33291ZM12.4607 5.25993C12.4505 5.34044 12.302 6.46675 12.1309 7.76281L11.8198 10.1193L8.08874 10.1264C5.11796 10.132 4.35529 10.1264 4.34586 10.0985C4.33937 10.0793 4.22672 8.98429 4.09558 7.66521C3.96442 6.34614 3.85118 5.23238 3.84396 5.19021L3.83085 5.11352H12.4793L12.4607 5.25993Z" fill="#030712"/>
            <path d="M4.43502 12.2068C3.85575 12.3687 3.66479 13.0924 4.08935 13.5169C4.20889 13.6364 4.34662 13.7068 4.50774 13.7302C4.55208 13.738 4.59772 13.7421 4.64431 13.7421C4.72196 13.7421 4.79697 13.7308 4.86777 13.7097C4.96713 13.6827 5.05462 13.637 5.13058 13.5724C5.31031 13.4292 5.42553 13.2085 5.42553 12.9609C5.42553 12.5295 5.07576 12.1797 4.64431 12.1797C4.61588 12.1797 4.5878 12.1812 4.56015 12.1842C4.51798 12.1879 4.4761 12.1954 4.43502 12.2068Z" fill="#030712"/>
            <path d="M11.3284 12.1797C11.4837 12.1797 11.6285 12.225 11.7501 12.3032C11.8092 12.3378 11.8606 12.3789 11.8996 12.4252C11.911 12.4388 11.9218 12.4521 11.9321 12.4651C11.9603 12.4994 11.9856 12.5362 12.0077 12.575C12.0157 12.5889 12.0231 12.6028 12.0298 12.6167C12.0809 12.7205 12.1096 12.8374 12.1096 12.9609C12.1096 13.06 12.0911 13.1548 12.0575 13.242C12.0353 13.309 12.0018 13.3687 11.9539 13.4289C11.8195 13.6083 11.6097 13.728 11.3716 13.7409C11.1237 13.7553 10.8717 13.6535 10.7116 13.4418C10.5924 13.284 10.5469 13.1501 10.5469 12.9572C10.5469 12.6884 10.6772 12.4539 10.892 12.3128C11.0167 12.2287 11.1668 12.1797 11.3284 12.1797Z" fill="#030712"/>
        </svg>
    );
}

const Authority = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.25781 7.12964L7.51915 8.39297L10.1178 5.79297" stroke="currentColor" strokeLinecap="square"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.99912 14C7.99912 14 13.2443 12.4118 13.2443 8.0335V2H2.75391V8.0335C2.75391 12.4118 7.99912 14 7.99912 14Z" stroke="currentColor" strokeLinecap="round"/>
        </svg>
    );
}

const SmartData = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_2013_610)">
                <path d="M7.33203 3V6.66667C7.33203 7.40303 5.9889 8 4.33203 8C2.67518 8 1.33203 7.40303 1.33203 6.66667V3" stroke="currentColor" strokeLinecap="square"/>
                <path d="M7.33203 4.66797C7.33203 5.40434 5.9889 6.0013 4.33203 6.0013C2.67518 6.0013 1.33203 5.40434 1.33203 4.66797" stroke="currentColor" strokeLinecap="square"/>
                <path d="M7.33203 2.66536C7.33203 3.40173 5.9889 3.9987 4.33203 3.9987C2.67518 3.9987 1.33203 3.40173 1.33203 2.66536C1.33203 1.92898 2.67518 1.33203 4.33203 1.33203C5.9889 1.33203 7.33203 1.92898 7.33203 2.66536Z" stroke="currentColor" strokeLinecap="square"/>
                <path d="M10.668 2H14.0013V5.33333" stroke="currentColor" strokeMiterlimit="16" strokeLinecap="square"/>
                <path d="M5.33389 14.0013H2L2.00056 10.668" stroke="currentColor" strokeLinecap="square"/>
                <path d="M11.6667 11.3333C12.5871 11.3333 13.3333 10.5871 13.3333 9.66667C13.3333 8.74619 12.5871 8 11.6667 8C10.7462 8 10 8.74619 10 9.66667C10 10.5871 10.7462 11.3333 11.6667 11.3333Z" stroke="currentColor" strokeLinecap="square"/>
                <path d="M14.668 14.668H8.66797C8.66797 13.0111 10.0111 11.668 11.668 11.668C13.3248 11.668 14.668 13.0111 14.668 14.668Z" stroke="currentColor" strokeLinecap="square"/>
            </g>
            <defs>
                <clipPath id="clip0_2013_610">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

const Setting = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.18025 8.26925C6.18025 9.27658 6.99686 10.0932 8.00419 10.0932C9.01152 10.0932 9.82812 9.27658 9.82812 8.26925C9.82812 7.26192 9.01152 6.44531 8.00419 6.44531C6.99686 6.44531 6.18025 7.26192 6.18025 8.26925Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.4016 8.2691L11.2016 13.8117H4.80156L1.60156 8.2691L4.80156 2.72656H11.2016L14.4016 8.2691Z" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Activity = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.01172 9.44147L6.88207 7.01059L9.01553 8.68647L10.8458 6.32422" stroke="currentColor" strokeLinecap="square"/>
            <circle cx="12.9785" cy="2.83005" r="1.20114" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.80882 2.15234H2.21875V13.6261H13.6925V6.01888" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const LogOut = ({color, className, ...rest}) => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9.33333 5.33473V2.66806H2V13.3347H9.33333V10.6681M5.6 8.00156L14 8.00139M14 8.00139L12 6.00139M14 8.00139L12 10.0014" stroke="currentColor" strokeLinecap="square"/>
    </svg>
    );
}

const Gift = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12.9354 13.9976V6.79688H2.73438V13.9976H12.9354Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M7.83594 13.9976V6.79688" stroke="currentColor" strokeLinecap="square"/>
            <path d="M12.9354 14H2.73438" stroke="currentColor" strokeLinecap="square"/>
            <path d="M13.8332 4.39844H1.83203V6.79867H13.8332V4.39844Z" stroke="currentColor"/>
            <path d="M5.42969 2L7.82992 4.40023L10.2302 2" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const Time = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_2013_609)">
                <path d="M7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654Z" stroke="currentColor"/>
                <path d="M8.00431 4L8.00391 8.00293L10.8304 10.8294" stroke="currentColor" strokeLinecap="square"/>
            </g>
            <defs>
                <clipPath id="clip0_2013_609">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

const ExternalMember = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.50939 9.80471C8.59432 9.79938 10.3671 10.7567 11.0188 12.8174C9.70532 13.6181 8.15932 13.9265 6.50939 13.9224C4.85947 13.9265 3.31344 13.6181 2 12.8174C2.65237 10.7544 4.42218 9.79938 6.50939 9.80471Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M10.8888 12.156C12.1487 12.1591 13.3292 11.9236 14.3322 11.3122C13.8346 9.7386 12.4809 9.00767 10.8888 9.01174C9.88591 9.00914 8.97905 9.29694 8.32031 9.9032" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.33277 4.9027C9.33277 6.46268 8.06817 7.72728 6.50817 7.72728C4.9482 7.72728 3.68359 6.46268 3.68359 4.9027C3.68359 3.34273 4.9482 2.07812 6.50817 2.07812C8.06817 2.07812 9.33277 3.34273 9.33277 4.9027Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M9.30774 3.78269C9.70127 3.37025 10.2563 3.11328 10.8713 3.11328C12.0647 3.11328 13.0322 4.08073 13.0322 5.27413C13.0322 6.46753 12.0647 7.43497 10.8713 7.43497C10.1418 7.43497 9.49674 7.07344 9.10547 6.51977" stroke="currentColor" strokeLinecap="square"/>
        </svg>
    );
}

const PoolFund = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.04368 14.5576C7.14337 14.7764 8.2833 14.6641 9.31917 14.235C10.3551 13.8059 11.2405 13.0793 11.8634 12.147C12.4864 11.2147 12.8189 10.1186 12.8189 8.99736V8.49736H7.6497V3.32813L7.1497 3.32812C6.02842 3.32812 4.93234 3.66062 4.00004 4.28356C3.06774 4.9065 2.3411 5.79191 1.91202 6.82783C1.48292 7.86376 1.37066 9.00363 1.5894 10.1034C1.80815 11.2031 2.34809 12.2132 3.14094 13.0061C3.9338 13.7989 4.94396 14.3389 6.04368 14.5576ZM8.9365 13.3111C8.0833 13.6645 7.1445 13.757 6.23876 13.5768C5.33302 13.3967 4.50105 12.952 3.84805 12.299C3.19505 11.646 2.75035 10.814 2.57019 9.90823C2.39003 9.0025 2.4825 8.0637 2.8359 7.2105C3.1893 6.35732 3.78776 5.62809 4.55561 5.11503C5.18412 4.69507 5.90302 4.43539 6.64968 4.35497V9.49736H11.792C11.7116 10.244 11.452 10.9629 11.032 11.5914C10.5189 12.3592 9.7897 12.9577 8.9365 13.3111Z" fill="#030712"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.69141 7.50124H14.8606V7.00124C14.8606 5.49767 14.2633 4.05568 13.2001 2.9925C12.137 1.92932 10.695 1.33202 9.19141 1.33203H8.69141V7.50124ZM9.69141 6.50124V2.35886C10.7459 2.4724 11.7361 2.94262 12.4931 3.6996C13.25 4.45659 13.7203 5.44673 13.8338 6.50124H9.69141Z" fill="#030712"/>
        </svg>
    );
}

const VersionHistory = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_3073_34854)">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.16604 0.390625L8.63497 1.65788C9.6415 4.37798 11.7861 6.52261 14.5062 7.52911L15.7735 7.99805L14.5062 8.46698C11.7861 9.47351 9.6415 11.6182 8.63497 14.3382L8.16604 15.6055L7.6971 14.3382C6.69057 11.6182 4.54595 9.47351 1.82585 8.46698L0.558594 7.99805L1.82585 7.52911C4.54595 6.52261 6.69057 4.37798 7.6971 1.65788L8.16604 0.390625ZM3.25663 7.99805C5.38235 9.05751 7.10657 10.7818 8.16604 12.9074C9.2255 10.7818 10.9497 9.05751 13.0754 7.99805C10.9497 6.93858 9.2255 5.21438 8.16604 3.08866C7.10657 5.21438 5.38235 6.93858 3.25663 7.99805Z" fill="#030712"/>
            </g>
            <defs>
                <clipPath id="clip0_3073_34854">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

const Ranking = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 9.9987C10.2091 9.9987 12 8.15516 12 5.88106V1.33203H4V5.88106C4 8.15516 5.79087 9.9987 8 9.9987Z" stroke="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.9987 7.0013V3.66797H1.33203C1.33203 5.8902 2.66536 7.0013 3.9987 7.0013Z" stroke="currentColor" strokeLinecap="square"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 7.0013V3.66797H14.6667C14.6667 5.8902 13.3333 7.0013 12 7.0013Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M8 10.668V12.0013" stroke="currentColor" strokeLinecap="square"/>
            <path d="M5 14L6.23 12H9.68083L11 14H5Z" stroke="currentColor"/>
        </svg>
    );
}

const PointSettings = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 1.33203H4V4.66536L8 6.33203L12 4.66536V1.33203Z" stroke="currentColor" strokeLinecap="square"/>
            <path d="M8.19053 6.98831C8.1168 6.83977 7.90473 6.84031 7.83177 6.98923L6.82381 9.04664L4.12891 9.43742L6.08113 11.346L5.61446 14L8.01021 12.7228L10.4065 14L9.94324 11.346L11.8921 9.43742L9.21209 9.04664L8.19053 6.98831Z" stroke="currentColor" strokeMiterlimit="16"/>
        </svg>
    );
}

const ChevronDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const Sidebar = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.49888 3.33203V16.6654M3.33203 3.33249L16.6655 3.33203V16.6654H3.33221L3.33203 3.33249Z" stroke="#030712" strokeLinecap="square"/>
        </svg>
    );
}

const Earth = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 7.5H17M3 12.5H17M9.58333 2.5C8.17945 4.74968 7.43517 7.34822 7.43517 10C7.43517 12.6518 8.17945 15.2503 9.58333 17.5M10.4167 2.5C11.8205 4.74968 12.5648 7.34822 12.5648 10C12.5648 12.6518 11.8205 15.2503 10.4167 17.5M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5C8.01088 2.5 6.10322 3.29018 4.6967 4.6967C3.29018 6.10322 2.5 8.01088 2.5 10Z" stroke="#030712" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
const Bell = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M5.09386 7.44945C5.09386 4.6016 7.4025 2.29297 10.2503 2.29297C13.0982 2.29297 15.4068 4.6016 15.4068 7.44945V11.2666L16.7507 14.8823H3.75L5.09386 11.2666V7.44945Z" stroke="#030712"/>
            <path d="M12.8911 14.8828V15.0712C12.8911 16.5286 11.7096 17.71 10.2522 17.71C8.79475 17.71 7.61328 16.5286 7.61328 15.0712V14.8828" stroke="#030712"/>
        </svg>
    );
}
const BellBadge = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M5.09386 7.44945C5.09386 4.6016 7.4025 2.29297 10.2503 2.29297C13.0982 2.29297 15.4068 4.6016 15.4068 7.44945V11.2666L16.7507 14.8823H3.75L5.09386 11.2666V7.44945Z" stroke="#030712"/>
            <path d="M12.8911 14.8828V15.0712C12.8911 16.5286 11.7096 17.71 10.2522 17.71C8.79475 17.71 7.61328 16.5286 7.61328 15.0712V14.8828" stroke="#030712"/>
            <circle cx="14" cy="3" r="2.6" fill="#FF2323" stroke="white" strokeWidth="0.8"/>
        </svg>
    );
}

export {
    Dashboard,
    Request,
    Calendar,
    Report,
    Announcement,
    Employee,
    Attendance,
    SalaryProfile,
    PerformanceData,
    Department,
    ProjectFolder,
    Tickets,
    SalaryIncrement,
    Bonus,
    Assets,
    Authority,
    SmartData,
    Setting,
    Activity,
    LogOut,
    Gift,
    Time,
    ExternalMember,
    PoolFund,
    VersionHistory,
    Ranking,
    PointSettings,
    ChevronDown,
    Sidebar,
    Earth,
    Bell,
    BellBadge,
};