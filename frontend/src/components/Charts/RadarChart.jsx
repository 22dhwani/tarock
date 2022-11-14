import { Radar } from 'react-chartjs-2';

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

function RadarChart({ userData, matchData, enableLabels }) {
    const data = {
        labels: ['LOGIC', 'STRUCTURE', ['EXTRA-', 'VERSION'], 'EXECUTION', 'EMOTION', 'OPENNESS', ['INTRO-', 'VERSION'], 'STRATEGY'],
        datasets: [
            {
                label: 'EII',
                data: [userData.LOGIC, userData.STRUCTURE, userData.EXTRAVERSION, userData.EXECUTION,
                    userData.EMOTION, userData.OPENNESS, userData.INTROVERSION, userData.STRATEGY],
                backgroundColor: 'rgba(255,192,203, 0.3)',
                borderColor: '#EC6348',
                borderWidth: 3
            },
            {
                label: 'random label',
                data: matchData && [matchData.LOGIC, matchData.STRUCTURE, matchData.EXTRAVERSION, matchData.EXECUTION,
                    matchData.EMOTION, matchData.OPENNESS, matchData.INTROVERSION, matchData.STRATEGY],
                backgroundColor: 'rgba(105,199,191, 0.3)',
                borderColor: '#69C7BF',
                borderWidth: 3
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false
            },
        },
        elements: {
            point: {
                pointRadius: 0
            },
            line: {
                tension: 0.2
            }  
        },
        scales: {
            r: {
                min: -0.3, // Make radar points away from zero point.
                ticks: {
                    display: false,
                },
                pointLabels: {
                    display: enableLabels,
                    color: '#49304D',
                    font: {
                      size: 12,
                      weight: '700',
                    }
                },
                grid: {
                    circular: true
                }
            },
        },
    };

    return (
        <Radar data={data} options={options} />
    )
}

export default RadarChart;