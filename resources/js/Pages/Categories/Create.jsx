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

const Create = () => {
    const [values, setValues] = useState({
        name: "",
        type: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("categories.store"), values);
    };

    return (
        <Layout title="Add Category">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Add Category</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Category Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                select
                                fullWidth
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
};

export default Create;
