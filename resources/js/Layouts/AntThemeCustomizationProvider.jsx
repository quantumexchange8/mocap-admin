import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

function AntThemeCustomizationProvider({ children }) {
    return (
        <ConfigProvider
            theme={{
                cssVar: true,
                hashed: false,
                token: {
                    colorPrimary: '#030712', // primary color gray-950
                    borderRadius: 2,
                    fontFamily: 'Outfit'
                },
                components: {
                    Select: {
                        controlHeight: '46px',
                        padding: '8px 16px',
                        controlPaddingHorizontal: 16, // 水平内边距
                        paddingContentHorizontal: 16, // 内容水平内边距
                        colorBorder: '#D1D5DB', // Tailwind gray-200
                        colorPrimaryHover: '#9CA3AF', // Tailwind blue-500
                        colorTextPlaceholder: '#6B7280',
                        activeBorderColor: '#030712',
                        optionSelectedBg: '#030712', // Tailwind blue-50
                        optionSelectedColor: '#FFF', // Tailwind blue-600
                        colorText: '#030712',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Outfit, sans-serif',
                        optionFontSize: '14px',
                        optionLineHeight: '20px',
                        optionPadding: '8px 16px',
                        optionSelectedFontWeight: '400',
                        selectorBg: '#FFF', // Tailwind gray-100
                        multipleItemHeight: '20px',
                        activeOutlineColor: 'rgb(0 0 0 / 0%)',
                    },
                    Tag: {
                        defaultBg: '#F3F4F6',
                        defaultColor: '#6B7280',
                        borderRadiusSM: '2px',
                        fontFamily: 'Outfit, sans-serif',
                    },
                    Badge:{
                        colorBorderBg: 'none',	
                        colorError	: '#FF2323',
                    },
                    Table:{
                        headerBg: '#F3F4F6',
                        headerColor: '#030712',
                        // headerSplitColor: 'none',
                        // borderColor: 'none',
                        // cellPaddingBlock: 0,
                        // cellPaddingInline: 0,
                        headerSortHoverBg: '#E5E7EB',
                        headerSortActiveBg: '#030712'
                    },
                    Radio:{
                        radioSize: 20,
                    },
                    Popconfirm:{
                        colorText: '#374151',
                    },
                    Steps:{
                        padding: '8px',
                    },
                    Tabs: {
                        cardBg: '#F3F4F6'
                    }
                }
            }}
        >
            <StyleProvider hashPriority='high'>{children}</StyleProvider>
        </ConfigProvider>
    )
}

export default AntThemeCustomizationProvider;