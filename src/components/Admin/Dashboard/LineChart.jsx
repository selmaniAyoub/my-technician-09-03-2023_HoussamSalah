import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Nouveaux rendez-vous',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function LineChart({ d }) {
    const data = {
        labels,
        datasets: [
            {
                label: 'Nombre de rendez-vous',
                data: d,
                borderColor: 'rgb(25 117 210)',
                backgroundColor: 'rgb(10 77 143)',
            },
        ],
    };
    return <Line options={options} data={data} />;
}
