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
import axios from "axios";
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

// Chart.jsのコンポーネントを登録
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
    const [data, setData] = useState(initialData);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up("md"));

    const handleSearch = async () => {
        const response = await axios.post("/reports/search", {
            startDate,
            endDate,
        });

        setData(response.data);
    };

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

    const dailyIncomeData = {
        labels: data.dailyIncome.map((item) => item.day),
        datasets: [
            {
                label: "日別収入",
                data: data.dailyIncome.map((item) => item.total_amount),
                fill: false,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const dailyExpenseData = {
        labels: data.dailyExpense.map((item) => item.day),
        datasets: [
            {
                label: "日別支出",
                data: data.dailyExpense.map((item) => item.total_amount),
                fill: false,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>
            <Grid container spacing={4} mb={2}>
                <Grid item xs={12}>
                    <TextField
                        label="開始日"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="終了日"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        検索
                    </Button>
                </Grid>
            </Grid>
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
                            日別収入
                        </Typography>
                        <Line data={dailyIncomeData} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            日別支出
                        </Typography>
                        <Line data={dailyExpenseData} />
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
            </Grid>
        </Layout>
    );
};

export default Report;
