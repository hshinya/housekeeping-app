// resources/js/Pages/Dashboard.jsx

import React from 'react';
import { usePage } from '@inertiajs/react';
import { Typography, Paper, List, ListItem, ListItemText, Grid } from '@mui/material';
import Layout from '../Components/Layout';

function Dashboard() {
    const { income, expense, transactions } = usePage().props;

    return (
        <Layout title="Dashboard">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '20px', height: '100%' }}>
                        <Typography variant="h6">Total Income</Typography>
                        <Typography variant="h4">${income}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '20px', height: '100%' }}>
                        <Typography variant="h6">Total Expense</Typography>
                        <Typography variant="h4">${expense}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', height: '100%' }}>
                        <Typography variant="h6">Recent Transactions</Typography>
                        <List>
                            {transactions.map(transaction => (
                                <ListItem key={transaction.id}>
                                    <ListItemText
                                        primary={transaction.description}
                                        secondary={`${transaction.date} - $${transaction.amount}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Dashboard;
