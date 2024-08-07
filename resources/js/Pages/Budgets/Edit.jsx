import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    MenuItem,
} from "@mui/material";
import Layout from "../../Components/Layout";
import { Inertia } from '@inertiajs/inertia';

const EditBudget = () => {
    const { budget, categories } = usePage().props;
    const [values, setValues] = useState({
        category_id: budget.category_id || "",
        amount: budget.amount || "",
        start_date: budget.start_date || "",
        end_date: budget.end_date || "",
    });

    const { patch, processing, errors } = useForm(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // patch(route("budgets.update", budget.id), values);
        Inertia.patch(route("budgets.update", budget.id), values);
    };

    return (
        <Layout title="Edit Budget">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Edit Budget</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                name="category_id"
                                value={values.category_id}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.category_id ? true : false}
                                helperText={errors.category_id}
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                label="Amount"
                                name="amount"
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.amount ? true : false}
                                helperText={errors.amount}
                            />
                            <TextField
                                fullWidth
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={values.start_date}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={errors.start_date ? true : false}
                                helperText={errors.start_date}
                            />
                            <TextField
                                fullWidth
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={values.end_date}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={errors.end_date ? true : false}
                                helperText={errors.end_date}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "20px" }}
                                disabled={processing}
                            >
                                Update
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default EditBudget;
