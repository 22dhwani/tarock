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
        labels: ['Logic', 'Structure', ['Extra-', 'version'], 'Execution', 'Emotion', 'Openness', ['Intro-', 'Version'], 'Strategy'],
        datasets: [
            {
                label: 'EII',
                data: [userData.LOGIC, userData.STRUCTURE, userData.EXTRAVERSION, userData.EXECUTION,
                    userData.EMOTION, userData.OPENNESS, userData.INTROVERSION, userData.STRATEGY],
                backgroundColor: 'rgba(255,192,203, 0.1)',
                borderColor: 'white',
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
        maintainAspectRatio :false,
        scales: {
            r: {
                min: -0.3, // Make radar points away from zero point.
                ticks: {
                    display: false,
                },
                pointLabels: {
                    display: enableLabels,
                    color: 'white',
                    font: {
                      size: 11,
                      weight: '600',
                      style:'Montserrat',
                    }
                },
                grid: {
                    circular: true
                }
            },
        },
    };

    return (
        <div className="chart-container" >
            <Radar  width={"250%"} height={"250%"}data={data} options={options} />
        </div>
        
    )
}

export default RadarChart;