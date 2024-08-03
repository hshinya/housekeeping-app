import React from "react";
import Layout from "../../Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import {
    Button,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const Index = () => {
    const { users } = usePage().props;

    return (
        <Layout title="Users">
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                href={route("users.create")}
            >
                Add User
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button
                                    component={Link}
                                    href={route("users.edit", user.id)}
                                    size="small"
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                                <Button
                                    component={Link}
                                    href={route("users.destroy", user.id)}
                                    method="delete"
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginLeft: 8 }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Layout>
    );
};

export default Index;
