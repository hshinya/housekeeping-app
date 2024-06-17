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
                        <Typography variant="h6">総収入</Typography>
                        <Typography variant="h4">{income}円</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '20px', height: '100%' }}>
                        <Typography variant="h6">総支出</Typography>
                        <Typography variant="h4">{expense}円</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', height: '100%' }}>
                        <Typography variant="h6">最近の利用状況</Typography>
                        <List>
                            {transactions.map(transaction => (
                                <ListItem key={transaction.id}>
                                    <ListItemText
                                        primary={transaction.description}
                                        secondary={`${transaction.date} - ${transaction.amount}円`}
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
