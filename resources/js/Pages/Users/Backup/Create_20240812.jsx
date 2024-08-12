import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import Layout from "../../Components/Layout";

function Create() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { post, processing, errors } = useForm(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <Layout title="Create User">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Create User</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.name ? true : false}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.email ? true : false}
                                helperText={errors.email}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={errors.password ? true : false}
                                helperText={errors.password}
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                value={values.password_confirmation}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={
                                    errors.password_confirmation ? true : false
                                }
                                helperText={errors.password_confirmation}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "20px" }}
                                disabled={processing}
                            >
                                Create
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Create;
