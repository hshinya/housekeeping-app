import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import Layout from "../../Components/Layout";

function Create() {
    const [values, setValues] = useState({
        description: "",
        amount: "",
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("transactions.store"), values);
    };

    return (
        <Layout title="Add Transaction">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Add Transaction</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="内容"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="金額"
                                name="amount"
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="日付"
                                name="date"
                                type="date"
                                value={values.date}
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
                                追加
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Create;
