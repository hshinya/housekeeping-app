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
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
import { useForm } from "@inertiajs/react";
// import { useForm } from "@inertiajs/inertia-react";
// import { useForm } from '@inertiajs/react';
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

const Report = ({ initialData }) => {
    const [data, setData] = useState(
        initialData || {
            monthlyIncome: [],
            monthlyExpense: [],
            incomeByCategory: [],
            expenseByCategory: [],
            dailyIncome: [],
            dailyExpense: [],
        }
    );
    const {
        data: formData,
        setData: setFormData,
        post,
    } = useForm({
        startDate: "",
        endDate: "",
    });

    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("report.search"), {
            onSuccess: (page) => {
                setData(
                    page.props.data || {
                        monthlyIncome: [],
                        monthlyExpense: [],
                        incomeByCategory: [],
                        expenseByCategory: [],
                        dailyIncome: [],
                        dailyExpense: [],
                    }
                );
            },
        });
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Chart.js Line Chart",
            },
        },
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="開始日"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) =>
                                setFormData("startDate", e.target.value)
                            }
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="終了日"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) =>
                                setFormData("endDate", e.target.value)
                            }
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        <Bar data={data.monthlyIncome} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別支出
                        </Typography>
                        <Bar data={data.monthlyExpense} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別収入
                        </Typography>
                        <Doughnut data={data.incomeByCategory} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別支出
                        </Typography>
                        <Doughnut data={data.expenseByCategory} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">日別収入</Typography>
                    <LineChart
                        data={{
                            labels: "data.dailyLabels",
                            datasets: [
                                {
                                    label: "日別収入",
                                    data: data.dailyIncome,
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
                            labels: "data.dailyExpense",
                            datasets: [
                                {
                                    label: "日別支出",
                                    data: data.dailyExpense,
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