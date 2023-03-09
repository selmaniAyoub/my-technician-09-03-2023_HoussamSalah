import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            align: 'center'
        },
    },
}

export default function UsersPieChart({ d }) {
    const data = {
        labels: ['Médecins', 'Psychologues', 'Vétérinaires', 'Dentistes', 'Pharmacies', 'Kinés'],
        datasets: [
            {
                label: '# of Votes',
                data: d,
                backgroundColor: [
                    'rgb(54 162 235)',
                    'rgb(0 255 4)',
                    'rgb(255 0 0)',
                    'rgb(255,255,0)',
                    'rgb(255,0,255)',
                    'rgb(192,192,192)'
                ],
            },
        ],
    };

    return <Pie options={options} data={data} />;
}
