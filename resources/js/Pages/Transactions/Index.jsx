// resources/js/Pages/Transactions/Index.jsx

import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Layout from '../../Components/Layout';

function Index() {
    const { transactions } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            Inertia.delete(route('transactions.destroy', id));
        }
    };

    return (
        <Layout title="Transactions">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', height: '100%' }}>
                        <Typography variant="h6">Transactions</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            href={route('transactions.create')}
                            style={{ marginBottom: '20px' }}
                        >
                            Add Transaction
                        </Button>
                        <List>
                            {transactions.map(transaction => (
                                <ListItem key={transaction.id}>
                                    <ListItemText
                                        primary={transaction.description}
                                        secondary={`${new Date(transaction.date).toLocaleDateString()} - $${transaction.amount}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            component={Link}
                                            href={route('transactions.edit', transaction.id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => handleDelete(transaction.id)}>
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Index;
