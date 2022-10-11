import { Radar } from 'react-chartjs-2';
import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function RadarChart(props) {
    const apiResponse = props.data
    const data = {
        labels: ['LOGIC', 'STRUCTURE', 'EXTRAVERSION', 'EXECUTION', 'EMOTION', 'OPENNESS', 'INTROVERSION', 'STRATEGY'],
        
        datasets: [
            {
                label: 'EII',
                data: [apiResponse.LOGIC, apiResponse.STRUCTURE, apiResponse.EXTRAVERSION, apiResponse.EXECUTION,
                    apiResponse.EMOTION, apiResponse.OPENNESS, apiResponse.INTROVERSION, apiResponse.STRATEGY],
                backgroundColor: 'rgba(255,192,203, 0.2)',
                borderColor: '#EC6348',
                borderWidth: 3,
                color:'red'
            },
        ],
    };
    const options = {
        scales: {
            r: {
                ticks: {
                    display: false,
                },
                pointLabels: {
                    color: '#49304D',
                    font: {
                      size: 12,
                      weight: '700',
                    }
                }
            },
        },
    };

    return (
        <Radar data={data} options={options} />
    )
}

export default RadarChart;