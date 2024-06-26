import React from 'react';
import { Grid, Typography } from '@mui/material';
import LineChart from '../Components/LineChart';

const Report = ({ monthlyIncome, monthlyExpense, dailyIncome, dailyExpense, incomeByCategory, expenseByCategory }) => {
    const chartData = {
        labels: monthlyIncome.map(item => item.month),
        monthlyIncome: monthlyIncome.map(item => item.total_amount),
        monthlyExpense: monthlyExpense.map(item => item.total_amount),
        dailyLabels: dailyIncome.map(item => item.day), // 日付ラベルを追加
        dailyIncome: dailyIncome.map(item => item.total_amount),
        dailyExpense: dailyExpense.map(item => item.total_amount),
    };

    return (
        <Grid container spacing={3}>
            {/* 1行1列目: 月別収入 */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">月別収入</Typography>
                <LineChart data={{ labels: chartData.labels, monthlyIncome: chartData.monthlyIncome }} />
            </Grid>

            {/* 1行2列目: 月別支出 */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">月別支出</Typography>
                <LineChart data={{ labels: chartData.labels, monthlyExpense: chartData.monthlyExpense }} />
            </Grid>

            {/* 2行1列目: 日別収入 */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">日別収入</Typography>
                <LineChart data={{ labels: chartData.dailyLabels, monthlyIncome: chartData.dailyIncome }} />
            </Grid>

            {/* 2行2列目: 日別支出 */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">日別支出</Typography>
                <LineChart data={{ labels: chartData.dailyLabels, monthlyExpense: chartData.dailyExpense }} />
            </Grid>

            {/* 3行1列目: カテゴリー別収入 */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">カテゴリー別収入</Typography>
                {/* ここにカテゴリー別収入の円グラフを表示 */}
            </Grid>

            {/* 3行2列目: カテゴリー別支出 */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">カテゴリー別支出</Typography>
                {/* ここにカテゴリー別支出の円グラフを表示 */}
            </Grid>
        </Grid>
    );
};

export default Report;
