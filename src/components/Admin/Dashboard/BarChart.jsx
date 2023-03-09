import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function BarChart({ d }) {
    const data = {
        labels,
        datasets: [
            {
                label: 'Nouveaux clients',
                data: d,
                backgroundColor: 'rgb(25 117 210)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
