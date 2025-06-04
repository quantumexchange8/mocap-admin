import React from "react";
import { Badge, Calendar, theme } from 'antd';
import Button from "@/Components/Button";
import { ChevronDown, ChevronLeftIcon, ChevronRIghtIcon } from "@/Components/Icon/Outline";
import { AnimatePresence, motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            duration: 0.7,
            ease: "easeOut"
        }
    }
};

export default function CalendarPartials() {

    const onPanelChange = (value, mode) => {
        
    };

    const { token } = theme.useToken();

    const wrapperStyle = {
        width: '100%',
    };

    const customHeader = ({ value, onChange }) => {
        const monthYear = value.format('MMMM YYYY');
        
        // 上个月
        const goPrevMonth = () => {
            const newValue = value.clone().subtract(1, 'month');
            onChange(newValue);
        };
      
        // 下个月
        const goNextMonth = () => {
            const newValue = value.clone().add(1, 'month');
            onChange(newValue);
        };

        return (
          <div style={{ paddingBottom: 8 }} className='flex items-center justify-between'>
            <Button variant="text" size="sm" iconOnly onClick={goPrevMonth}>
                <ChevronLeftIcon />
            </Button>
            <div className="text-gray-950 text-center text-base font-semibold">
                {monthYear}
            </div>
            <Button variant="text" size="sm" iconOnly onClick={goNextMonth}>
                <ChevronRIghtIcon />
            </Button>
          </div>
        );
    };

    const getEventCount = (date) => {
        // 这里可以根据你的实际数据返回
        if (date.date() % 5 === 0) return 1; // 例如每5天有一个事件
        return 0;
    };

    const dateCellRender = (date) => {
        const count = getEventCount(date);
        return count > 0 ? (
          <div className="absolute left-2 -bottom-1.5 flex items-center gap-0.5" >
            <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: '#1890ff' }}></div>
            {/* <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: '#884DFF' }}></div> */}
          </div>
        ) : null;
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={wrapperStyle}
            className=" col-span-2"
        >
            <Calendar 
                headerRender={customHeader}
                fullscreen={false} 
                onPanelChange={onPanelChange} 
                cellRender={dateCellRender}
            />
        </motion.div>
    )
}