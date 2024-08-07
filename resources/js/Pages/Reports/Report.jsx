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
            monthlyIncome: {},
            monthlyExpense: {},
            incomeByCategory: {},
            expenseByCategory: {},
            dailyIncome: {},
            dailyExpense: {},
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
        post(route("reports.search"), {
            onSuccess: (page) => {
                setData(
                    page.props.data || {
                        monthlyIncome: {},
                        monthlyExpense: {},
                        incomeByCategory: {},
                        expenseByCategory: {},
                        dailyIncome: {},
                        dailyExpense: {},
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

    const incomeColorPalette = [
        "#36A2EB",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#FF6384",
        "#FFCE56",
    ];

    const expenseColorPalette = [
        "#FF6384",
        "#FFCE56",
        "#FF9F40",
        "#4BC0C0",
        "#36A2EB",
        "#9966FF",
    ];

    const formatChartData = (data, isIncome) => {
        const colorPalette = isIncome
            ? incomeColorPalette
            : expenseColorPalette;
        return {
            labels: Object.keys(data),
            datasets: [
                {
                    label: isIncome ? "Income" : "Expense",
                    data: Object.values(data),
                    backgroundColor: colorPalette,
                    borderColor: colorPalette,
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>

            <form onSubmit={handleSubmit} method="POST">
                <input type="hidden" name="_method" value="POST" />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
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
                    <Grid item xs={12} md={5}>
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
                    <Grid item xs={12} md={2}>
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
            </form>

            <Grid container spacing={4} style={{ marginTop: "20px" }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別収入
                        </Typography>
                        <Bar
                            data={formatChartData(data.monthlyIncome, true)}
                            options={chartOptions}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別支出
                        </Typography>
                        <Bar
                            data={formatChartData(data.monthlyExpense, false)}
                            options={chartOptions}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別収入
                        </Typography>
                        <Doughnut
                            data={formatChartData(data.incomeByCategory, true)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別支出
                        </Typography>
                        <Doughnut
                            data={formatChartData(
                                data.expenseByCategory,
                                false
                            )}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            日別収入
                        </Typography>
                        <Line
                            data={formatChartData(data.dailyIncome, true)}
                            options={chartOptions}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            日別支出
                        </Typography>
                        <Line
                            data={formatChartData(data.dailyExpense, false)}
                            options={chartOptions}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Report;
