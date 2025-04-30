import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
                theme={{
                    cssVar: true,
                    hashed: false,
                    token: {
                        colorPrimary: '#030712', // 使用 Tailwind 的 blue-500
                        borderRadius: 8,
                    },
                    components: {
                        Select: {
                            colorBorder: '#D1D5DB', // Tailwind gray-200
                            colorPrimaryHover: '#9CA3AF', // Tailwind blue-500
                            activeBorderColor: '#030712',
                            optionSelectedBg: '#eff6ff', // Tailwind blue-50
                            optionSelectedColor: '#2563eb', // Tailwind blue-600
                            colorText: '#030712',
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontFamily: 'Outfit, sans-serif',
                            optionFontSize: '14px',
                            optionLineHeight: '20px',
                            optionPadding: '8px 16px',
                            optionSelectedFontWeight: '400',
                            selectorBg: '#FFF', // Tailwind gray-100
                            multipleItemHeight: '20px'
                        },
                        Tag: {
                            defaultBg: '#F3F4F6',
                            defaultColor: '#6B7280',
                            borderRadiusSM: '2px',
                            fontFamily: 'Outfit, sans-serif',
                        },
                        Badge:{
                            colorBorderBg: 'hidden',	
                            colorError	: '#FF2323',
                        }
                    }
                }}
            >
                <App {...props} />
            </ConfigProvider>
    );
    },
    progress: {
        color: '#4B5563',
    },
});
