import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            backgroundImage: {
                'onboarding': "url('/asset/onboarding.png')",
                'dashboard1': "url('/asset/dashboardbg.jpg')",
                'request-container': 'linear-gradient(90deg, rgba(255, 255, 255, 0.80) 0%, rgba(209, 213, 219, 0.80) 100%)',
            },
            fontFamily: {
                sans: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            ringColor: ({ theme }) => ({
                none: 'transparent', // 添加一个none选项
            }),
            colors: {
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                    950: '#030712',
                },
                success: {
                    50: '#F3FEE7',
                    100: '#E4FBCC',
                    200: '#D0F8AB',
                    300: '#A6EF67',
                    400: '#85E13A',
                    500: '#66C61C',
                    600: '#4CA30D',
                    700: '#3B7C0F',
                    800: '#326212',
                    900: '#2B5314',
                    950: '#15290A',
                },
                warning: {
                    50: '#FEFCE8',
                    100: '#FEF9C3',
                    200: '#FEF08A',
                    300: '#FDE047',
                    400: '#FACC15',
                    500: '#EAB308',
                    600: '#CA8A04',
                    700: '#A16207',
                    800: '#854D0E',
                    900: '#713f12',
                    950: '#422006',
                },
                error: {
                    50: '#FFF0F0',
                    100: '#FFDDDD',
                    200: '#FFC0C0',
                    300: '#FF9494',
                    400: '#FF5757',
                    500: '#FF2323',
                    600: '#FF0000',
                    700: '#D70000',
                    800: '#B10303',
                    900: '#920A0A',
                    950: '#500000',
                },
                info: {
                    50: '#F0F9FF',
                    100: '#E0F2FE',
                    200: '#B9E6FE',
                    300: '#7CD4FD',
                    400: '#36BFFA',
                    500: '#0BA5EC',
                    600: '#0086C9',
                    700: '#026AA2',
                    800: '#065986',
                    900: '#0B4A6F',
                    950: '#062C41',
                },
                accent: {
                    'teal': '#36B3B3',
                    'green': '#00C9A7',
                    'aqua': '#3BF4FB',
                    'yellow': '#FFFC31',
                    'orange': '#F08700',
                    'rose': '#FD3E81',
                    'pink': '#F078C8',
                    'violet': '#C879FF',
                    'purple': '#884DFF',
                    'indigo': '#4D4DFF',
                    'dark-blue': '#25388D',
                }
            },
            boxShadow: {
                'toast': '0px 4px 20px 0px rgba(12, 17, 29, 0.08)',
                'dialog': '0px 12px 24px -4px rgba(12, 17, 29, 0.10)',
                'smShadow': '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
            },
        },
        fontSize: {
            'xxs': ['10px', {
                lineHeight: '12px'
            }],
            'xs': ['12px', {
                lineHeight: '16px'
            }],
            'sm': ['14px', {
                lineHeight: '20px'
            }],
            'base': ['16px', {
                lineHeight: '24px'
            }],
            'lg': ['20px', {
                lineHeight: '28px'
            }],
            'xl': ['24px', {
                lineHeight: '32px'
            }],
            'xxl': ['30px', {
                lineHeight: '42px'
            }],
        },
        screens: {
            'xl': '1280px',
            'lg': '1024px',
            'md': '768px',
        }
    },

    plugins: [forms],
    corePlugins: {
        // preflight: false, // <== disable this!
        ringColor: false, // 禁用 ring color 插件
        ringWidth: false, // 禁用 ring width 插件
        ringOpacity: false, // 禁用 ring opacity 插件
        ringOffsetWidth: false, // 禁用 ring offset 插件
    },
};
