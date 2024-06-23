import React from "react";
import { usePage } from "@inertiajs/react";
import { Box, Typography, Paper } from "@mui/material";
import Layout from "../../Components/Layout";

const Report = () => {
    const { monthlyIncome, categoryExpense, categories } = usePage().props;

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                レポート
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h6">月別収支</Typography>
                    <ul>
                        {Object.entries(monthlyIncome).map(
                            ([month, income]) => (
                                <li key={month}>
                                    {month}: ¥{income.toLocaleString()}
                                </li>
                            )
                        )}
                    </ul>
                </Paper>
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h6">カテゴリー別支出</Typography>
                    <ul>
                        {Object.entries(categoryExpense).map(
                            ([categoryId, expense]) => (
                                <li key={categoryId}>
                                    {categories[categoryId]}: ¥
                                    {expense.toLocaleString()}
                                </li>
                            )
                        )}
                    </ul>
                </Paper>
            </Box>
        </Layout>
    );
};

export default Report;
