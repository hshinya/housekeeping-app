import React from "react";
import Layout from "../../Components/Layout";
import { Typography, Box } from "@mui/material";
import { BarChart, DoughnutChart } from "../../Components/Chart";

const Report = ({
    monthlyIncome,
    monthlyExpense,
    incomeByCategory,
    expenseByCategory,
}) => {
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
                data: Object.values(expenseByCategory),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
            },
        ],
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 4,
                    }}
                >
                    <Box sx={{ width: "50%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別収入
                        </Typography>
                        <BarChart data={incomeData} />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant="h6" gutterBottom>
                            月別支出
                        </Typography>
                        <BarChart data={expenseData} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 4,
                    }}
                >
                    <Box sx={{ width: "50%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別収入
                        </Typography>
                        <DoughnutChart data={incomeByCategoryData} />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant="h6" gutterBottom>
                            カテゴリー別支出
                        </Typography>
                        <DoughnutChart data={expenseByCategoryData} />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default Report;
