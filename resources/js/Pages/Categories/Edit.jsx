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
import { ConnectingAirportsOutlined } from "@mui/icons-material";

function Edit() {
    const { category } = usePage().props;
    const [values, setValues] = useState({
        name: category.name || "",
        type: category.type || "",
    });

    const { patch, processing, errors } = useForm(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setValues((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(values);
        patch(route("categories.update", category.id), values);
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
                                error={errors.name ? true : false}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Type"
                                name="type"
                                value={values.type}
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
