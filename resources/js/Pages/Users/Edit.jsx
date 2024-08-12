import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Layout from "../../Components/Layout";
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const Edit = () => {
    const { user } = usePage().props;
    const [values, setValues] = useState({
        name: user.name || "",
        email: user.email || "",
        passowrd: "",
        password_confirmation: "",
    });

    const { patch, processing, errors } = useForm(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("users.update", user.id), values);
    };

    return (
        <Layout title="Edit User">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Edit User</Typography>
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
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                value={values.password_confirmation}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "20px" }}
                                disabled={processing}
                            >
                                Update User
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Edit;
