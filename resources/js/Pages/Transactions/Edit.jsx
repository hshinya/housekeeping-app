import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    MenuItem,
} from "@mui/material";
import Layout from "../../Components/Layout";

function Edit({ transaction }) {
    const [values, setValues] = useState({
        description: "",
        amount: "",
        date: "",
        type: "",
        category: "",
    });

    useEffect(() => {
        setValues({
            description: transaction.description,
            amount: transaction.amount,
            date: transaction.date,
            type: transaction.type,
            category: transaction.category,
        });
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route("transactions.update", transaction.id), values);
    };

    return (
        <Layout title="Edit Transaction">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Edit Transaction</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Amount"
                                name="amount"
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Date"
                                name="date"
                                type="date"
                                value={values.date}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Type"
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                margin="normal"
                                required
                            >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "20px" }}
                            >
                                Update
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Edit;
