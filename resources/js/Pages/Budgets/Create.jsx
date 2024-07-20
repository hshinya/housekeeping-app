import Layout from "../../Components/Layout";
import { useForm, usePage } from "@inertiajs/react";
import { Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CreateBudget = () => {
    const { categories } = usePage().props;
    const [values, setValues] = useState({
        category_id: "",
        amount: "",
    });

    const { post, processing, errors } = useForm(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setvalues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("budgets.store"), values);
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
                                error={errors.category_id ? true : false}
                                helperText={errors.category_id}
                            >
                                {categories.map((category) => {
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>;
                                })}
                            </TextField>
                            <TextField
                                fullWidth
                                label="Amount"
                                name="amount"
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                                margin="nomal"
                                required
                                error={errors.amount ? true : false}
                                helperText={errors.amount}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "20px" }}
                                disabled={processing}
                            >
                                Add
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default CreateBudget;
