import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
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

function Edit() {
    const { category } = usePage().props;
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name || "",
        type: category.type || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("categories.update", category.id), { data });
    };

    return (
        <Layout title="Edit Category">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Edit Category</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.name ? true : false}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Type"
                                name="type"
                                value={data.type}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.type ? true : false}
                                helperText={errors.type}
                            >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </TextField>
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
