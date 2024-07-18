import Layout from "../../Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import {
    Button,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";

const Budgetindex = () => {
    const { budgets } = usePage().props;
    return (
        <Layout title="Budgets">
            <Paper style={{ padding: "20px" }}>
                <Typography variant="h6">Budgets</Typography>
                <Button
                    variant="contained"
                    color="primay"
                    component={Link}
                    href={route("budgets.create")}
                    style={{ marginBottom: "20px" }}
                >
                    Add Budget
                </Button>
                <TableBody>
                    {budgets.map((budget) => (
                        <TableRow key={budget.id}>
                            <TableCell>{budget.category.name}</TableCell>
                            <TableCell>{budget.amount}</TableCell>
                            <TableCel>
                                <Button
                                    component={Link}
                                    href={route("budgets.edit", budget.id)}
                                    color="primary"
                                >
                                    Edit
                                </Button>
                                <Button
                                    component={Link}
                                    href={route("budgets.destroy", budget.id)}
                                    color="secondary"
                                >
                                    Delete
                                </Button>
                            </TableCel>
                        </TableRow>
                    ))}
                </TableBody>
            </Paper>
        </Layout>
    );
};

export default Budgetindex;
