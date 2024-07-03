import React, { useState } from "react";
import Layout from "../../Components/Layout";
import {
    Typography,
    Box,
    useMediaQuery,
    useTheme,
    Grid,
    TextField,
    Button,
} from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";
// import { useForm } from "@inertiajs/inertia-react";
// import { useForm } from '@inertiajs/react';
import { useForm } from "@inertiajs/react";
import LineChart from "../../Components/LineChart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Report = ({
    monthlyIncome,
    monthlyExpense,
    incomeByCategory,
    expenseByCategory,
    dailyIncome,
    dailyExpense,
}) => {
    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up("md"));

    const incomeData = {
        labels: Object.keys(monthlyIncome),
        datasets: [
            {
                label: "収入",
                data: Object.values(monthlyIncome),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const expenseData = {
        labels: Object.keys(monthlyExpense),
        datasets: [
            {
                label: "支出",
                data: Object.values(monthlyExpense),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    const incomeByCategoryData = {
        labels: Object.keys(incomeByCategory),
        datasets: [
            {
                label: "カテゴリー別収入",
                data: Object.values(incomeByCategory),
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                ],
            },
        ],
    };

    const expenseByCategoryData = {
        labels: Object.keys(expenseByCategory),
        datasets: [
            {
                label: "カテゴリー別支出",
                data: Object.values(expenseByCategory),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
            },
        ],
    };

    const chartData = {
        dailyLabels: dailyIncome.map((item) => item.day),
        dailyIncome: dailyIncome.map((item) => item.total_amount),
        dailyExpense: dailyExpense.map((item) => item.total_amount),
    };

    const { data, setData, get } = useForm({
        startDate: "",
        endDate: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("reports.search"), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="開始日"
                            type="date"
                            value={data.startDate}
                            onChange={(e) =>
                                setData("startDate", e.target.value)
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="終了日"
                            type="date"
                            value={data.endDate}
                            onChange={(e) => setData("endDate", e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            検索
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別収入
                        </Typography>
                        <Bar data={incomeData} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別支出
                        </Typography>
                        <Bar data={expenseData} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別収入
                        </Typography>
                        <Doughnut data={incomeByCategoryData} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別支出
                        </Typography>
                        <Doughnut data={expenseByCategoryData} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">日別収入</Typography>
                    <LineChart
                        data={{
                            labels: chartData.dailyLabels,
                            datasets: [
                                {
                                    label: "日別収入",
                                    data: chartData.dailyIncome,
                                    borderColor: "rgba(75, 192, 192, 1)",
                                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                                    fill: true,
                                },
                            ],
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">日別支出</Typography>
                    <LineChart
                        data={{
                            labels: chartData.dailyLabels,
                            datasets: [
                                {
                                    label: "日別支出",
                                    data: chartData.dailyExpense,
                                    borderColor: "rgba(255, 99, 132, 1)",
                                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                                    fill: true,
                                },
                            ],
                        }}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Report;
