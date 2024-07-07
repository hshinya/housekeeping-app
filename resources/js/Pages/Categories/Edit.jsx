import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import Layout from "../../Components/Layout";

function Edit({ category }) {
    const [values, setValues] = useState({
        name: "",
    });

    useEffect(() => {
        setValues({
            name: category.name,
        });
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route("categories.update", category.id), values);
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
                                value={values.name}
                                onChange={handleChange}
                                margin="normal"
                                required
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
