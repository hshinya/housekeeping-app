import React, { useState } from "react";
import { usePage, Inertia } from "@inertiajs/react";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    MenuItem,
} from "@mui/material";
import Layout from "../../Components/Layout";

function Edit() {
    const { budget, categories } = usePage().props;
    const [values, setValues] = useState({
        category_id: budget.category_id || "",
        amount: budget.amount || "",
        start_date: budget.start_date || "",
        end_date: budget.end_date || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                error={Boolean(errors.category_id)}
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
                                error={Boolean(errors.amount)}
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
                                error={Boolean(errors.start_date)}
                                helperText={errors.start_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                error={Boolean(errors.end_date)}
                                helperText={errors.end_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
}

export default Edit;
