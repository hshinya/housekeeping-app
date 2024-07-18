import Layout from "../../Components/Layout";
import { useForm, usePage } from "@inertiajs/react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
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
                            <TextField>
                                
                            </TextField>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};
