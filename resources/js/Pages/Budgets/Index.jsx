import Layout from "../../Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const BudgetIndex = () => {
    const { budgets } = usePage().props;
    return (
        <Layout title="Budgets">
            <Paper style={{ padding: "20px" }}>
                <Typography variant="h6">Budgets</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={route("budgets.create")}
                    style={{ marginBottom: "20px" }}
                >
                    Add Budget
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {budgets.map((budget) => (
                            <TableRow key={budget.id}>
                                <TableCell>{budget.category.name}</TableCell>
                                <TableCell>{budget.amount}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        href={route("budgets.edit", budget.id)}
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        component={Link}
                                        href={route(
                                            "budgets.destroy",
                                            budget.id
                                        )}
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Layout>
    );
};

export default BudgetIndex;
