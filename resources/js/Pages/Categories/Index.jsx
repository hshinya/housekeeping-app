import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import Layout from "../../Components/Layout";

const Index = ({ categories }) => {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("categories.destroy", id));
        }
    };

    return (
        <Layout title="Categories">
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h6">Categories</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href={route("categories.create")}
                            style={{ marginBottom: "20px" }}
                        >
                            Add Category
                        </Button>
                        {categories.map((category) => (
                            <Paper
                                key={category.id}
                                style={{
                                    padding: "10px",
                                    marginBottom: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>
                                    {category.name} ({category.type})
                                </Typography>
                                <div>
                                    <IconButton
                                        color="primary"
                                        href={route(
                                            "categories.edit",
                                            category.id
                                        )}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </Paper>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Index;
