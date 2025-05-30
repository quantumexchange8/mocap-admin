import React, { useRef } from "react";
import { color, motion } from "framer-motion";
import Button from "@/Components/Button";
import { ArrowRight } from "@/Components/Icon/Outline";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';


const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const containerVariants2 = {
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



export default function Overview() {

    const chartRef = useRef(null);

    const total = 10;
    const hasData = total > 0;


    const data = hasData ? [
        { value: 1, name: 'In Progress', itemStyle: { color: '#030712' } },
        { value: 4, name: 'Completed', itemStyle: { color: '#4B5563' } },
        { value: 5, name: 'Pending', itemStyle: { color: '#D1D5DB' } },
    ] : [
        { value: total, name: 'No Data', itemStyle: { color: '#E5E7EB' } } // light gray background
    ];


    const donutOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '0%',
          left: 'center'
        },
        graphic: [
            {
              type: 'text',
              left: 'center',
              top: '42%',
              style: {
                text: 'Total',
                textAlign: 'center',
                fill: '#6B7280',
                fontSize: 14,
              },
              id: 'main-label',
            },
            {
              type: 'text',
              left: 'center',
              top: '50%',
              style: {
                text: `${total}`,
                textAlign: 'center',
                fill: '#000',
                fontSize: 24,
                fontWeight: 'bold',
              },
              id: 'main-value',
            },
        ],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
                disabled: true
            },
            labelLine: {
              show: false
            },
            data,
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
            },
          }
        ]
    };

    // const onEvents = {
    //     mouseover: (params) => {
    //       const chart = chartRef.current.getEchartsInstance();
    //       chart.setOption({
    //         graphic: [
    //           {
    //             id: 'main-label',
    //             style: {
    //               text: params.name,
    //             },
    //           },
    //           {
    //             id: 'main-value',
    //             style: {
    //               text: `${params.value}`,
    //             },
    //           },
    //         ],
    //       });
    //     },
    //     mouseout: () => {
    //       const chart = chartRef.current.getEchartsInstance();
    //       chart.setOption({
    //         graphic: [
    //           {
    //             id: 'main-label',
    //             style: {
    //               text: 'Total',
    //             },
    //           },
    //           {
    //             id: 'main-value',
    //             style: {
    //               text: `${total}`,
    //             },
    //           },
    //         ],
    //       });
    //     },
    //   };

    return (
        <div className='flex flex-row xl:flex-col gap-5 w-full'>
            {/* Projects Overview */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className='p-6 flex flex-col gap-5 w-full border border-gray-200 bg-white rounded-sm shadow-smShadow'
            >
                <div className="flex items-center justify-between">
                    <div className="text-gray-950 text-base font-semibold">Projects Overview</div>
                    <Button size="sm" variant="text" iconOnly>
                        <ArrowRight className='text-gray-950' />
                    </Button>
                </div>

                {/* Donught chart */}
                <div className='w-full h-72'>
                    <ReactECharts
                        ref={chartRef}
                        option={donutOption}
                        style={{ height: '100%', width: '100%' }}
                        // onEvents={onEvents}
                    />
                </div>
            </motion.div>

             {/* Tasks Overview  */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants2}
                className='p-6 flex flex-col gap-5 w-full border border-gray-200 bg-white rounded-sm shadow-smShadow'
            >
                <div className="flex items-center justify-between">
                    <div className="text-gray-950 text-base font-semibold">Tasks Overview</div>
                    <Button size="sm" variant="text" iconOnly>
                        <ArrowRight className='text-gray-950' />
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}