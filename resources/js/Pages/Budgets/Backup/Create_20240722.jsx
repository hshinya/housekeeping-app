import React, { useState } from "react";
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
import { usePage } from "@inertiajs/react";

function Create() {
    const { categories } = usePage().props;

    const [values, setValues] = useState({
        category_id: "",
        amount: "",
        start_date: "",
        end_date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("budgets.store"), values);
    };

    return (
        <Layout title="Add Budget">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Add Budget</Typography>
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
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "20px" }}
                            >
                                Add
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Create;
