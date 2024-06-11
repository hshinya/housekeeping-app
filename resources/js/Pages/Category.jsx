import React from "react";
import { usePage } from "@inertiajs/react";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import Layout from "../Components/Layout";

function Category() {
    const { categories } = usePage().props;

    return (
        <Layout title="Catagory List">
            <Paper style={{ marginTop: "20px", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Categories
                </Typography>
                <List>
                    {categories.map(category => (
                        <li key={category.id}>{category.name}: {category.type}</li>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}

export default Category;
