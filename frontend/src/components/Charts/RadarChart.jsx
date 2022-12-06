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

function RadarChart({ userData, matchData, enableLabels, userQuadra, matchedQuadra }) {
    const data = {
        labels: ['Logic', 'Structure', ['Extra-', 'version'], 'Execution', 'Emotion', 'Openness', ['Intro-', 'Version'], 'Strategy'],
        datasets: [
            {
                label: 'EII',
                data: [userData.LOGIC, userData.STRUCTURE, userData.EXTRAVERSION, userData.EXECUTION,
                userData.EMOTION, userData.OPENNESS, userData.INTROVERSION, userData.STRATEGY],
                backgroundColor: userQuadra ? userQuadra + '20' : 'rgba(255,192,203, 0.1)',
                borderColor: userQuadra ? userQuadra : 'white',
                borderWidth: 3
            },
            {
                label: 'random label',
                data: matchData && [matchData.LOGIC, matchData.STRUCTURE, matchData.EXTRAVERSION, matchData.EXECUTION,
                matchData.EMOTION, matchData.OPENNESS, matchData.INTROVERSION, matchData.STRATEGY],
                backgroundColor: matchedQuadra ? matchedQuadra + '20' : 'rgba(105,199,191, 0.3)',
                borderColor: matchedQuadra ? matchedQuadra : '#69C7BF',
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
        maintainAspectRatio: false,
        scales: {
            r: {
                min: -0.3, // Make radar points away from zero point.
                ticks: {
                    display: false,
                },
                pointLabels: {
                    display: enableLabels,
                    color: matchData ? '#49304D':'white',
                    font: {
                        size: 11,
                        weight: '600',
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