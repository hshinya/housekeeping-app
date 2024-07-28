import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../Components/Layout";
import { Inertia } from "@inertiajs/inertia";

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
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {budgets.map((budget) => (
                            <TableRow key={budget.id}>
                                <TableCell>{budget.category.name}</TableCell>
                                <TableCell>{budget.amount}</TableCell>
                                <TableCell>{budget.start_date}</TableCell>
                                <TableCell>{budget.end_date}</TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        href={route("budgets.edit", budget.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        component="button"
                                        onClick={() =>
                                            confirm("Are you sure?") &&
                                            Inertia.delete(
                                                route(
                                                    "budgets.destroy",
                                                    budget.id
                                                )
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
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
