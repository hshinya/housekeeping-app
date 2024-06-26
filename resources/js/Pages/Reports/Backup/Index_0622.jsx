import React from 'react';
import { usePage } from '@inertiajs/react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const Reports = () => {
    const { monthlyIncome, categoryExpense, categories } = usePage().props;

    // 月別収支データをグラフ用にフォーマット
    const lineData = {
        labels: Object.keys(monthlyIncome),
        datasets: [
            {
                label: 'Monthly Income',
                data: Object.values(monthlyIncome),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    // カテゴリー別支出データをグラフ用にフォーマット
    const doughnutData = {
        labels: Object.keys(categoryExpense).map(key => categories[key]),
        datasets: [
            {
                label: 'Category Expense',
                data: Object.values(categoryExpense),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FFCD56',
                ],
            },
        ],
    };

    return (
        <div>
            <h1>Monthly Income Report</h1>
            <Line data={lineData} />
            <h2>Category Expense Report</h2>
            <Doughnut data={doughnutData} />
        </div>
    );
};

export default Reports;
