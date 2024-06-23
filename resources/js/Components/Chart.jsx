// src/Components/Chart.jsx
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
);

export const BarChart = ({ data, options }) => (
    <Bar data={data} options={options} />
);

export const DoughnutChart = ({ data, options }) => (
    <Doughnut data={data} options={options} />
);
