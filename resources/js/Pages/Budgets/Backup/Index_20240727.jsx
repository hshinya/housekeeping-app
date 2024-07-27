import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../Components/Layout";

function Index() {
    const { budgets } = usePage().props;

    return (
        <Layout title="Budgets">
            <TableContainer component={Paper}>
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
            </TableContainer>
            <Button
                component={Link}
                href={route("budgets.create")}
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
            >
                Add Budget
            </Button>
        </Layout>
    );
}

export default Index;
