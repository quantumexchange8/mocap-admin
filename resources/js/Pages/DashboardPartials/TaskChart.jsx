import React, { useRef } from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

export default function TaskChart() {

    const chartRef = useRef(null);
    
    const total = 0;
    const hasData = total > 0;


    const data = hasData ? [
        { value: 0, name: 'In Progress', itemStyle: { color: '#030712' } },
        { value: 0, name: 'Pending QC', itemStyle: { color: '#4B5563' } },
        { value: 0, name: 'Completed', itemStyle: { color: '#9CA3AF' } },
        { value: 0, name: 'Pending', itemStyle: { color: '#D1D5DB' } },
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
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: 40,
                    fontWeight: 'bold'
                    }
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
        <div className='w-full h-56'>
            <ReactECharts
                ref={chartRef}
                option={donutOption}
                style={{ height: '100%', width: '100%' }}
                // onEvents={onEvents}
            />
        </div>
    )
}