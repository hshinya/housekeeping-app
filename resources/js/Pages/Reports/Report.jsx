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
} from "chart.js";
import LineChart from "../../Components/LineChart";
import axios from "axios";

// Chart.jsのコンポーネントを登録
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Report = ({ initialData }) => {
    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up("md"));
    const [data, setData] = useState(initialData);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchData = async () => {
        try {
            // const response = await axios.post("/reports/search", {
            //     params: {
            //         startDate,
            //         endDate,
            //     },
            // });
            const response = await axios.post("/reports/search", {
                startDate,
                endDate,
            });
            console.log(startDate);
            console.log(endDate);
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(data.monthlyIncome);
    const incomeData = {
        labels: Object.keys(data.monthlyIncome),
        datasets: [
            {
                label: "収入",
                data: Object.values(data.monthlyIncome),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const expenseData = {
        labels: Object.keys(data.monthlyExpense),
        datasets: [
            {
                label: "支出",
                data: Object.values(data.monthlyExpense),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    const incomeByCategoryData = {
        labels: Object.keys(data.incomeByCategory),
        datasets: [
            {
                label: "カテゴリー別収入",
                data: Object.values(data.incomeByCategory),
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                ],
            },
        ],
    };

    const expenseByCategoryData = {
        labels: Object.keys(data.expenseByCategory),
        datasets: [
            {
                label: "カテゴリー別支出",
                data: Object.values(data.expenseByCategory),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
            },
        ],
    };

    const chartData = {
        dailyLabels: data.dailyIncome.map((item) => item.day),
        dailyIncome: data.dailyIncome.map((item) => item.total_amount),
        dailyExpense: data.dailyExpense.map((item) => item.total_amount),
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="開始日"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="終了日"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchData}
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
                    <Typography variant="h6">日別支出</Typography>
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
