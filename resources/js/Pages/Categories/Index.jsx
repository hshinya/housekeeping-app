import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Layout from "../../Components/Layout";

function Index() {
    const { categories } = usePage().props;

    return (
        <Layout title="Categories">
            <h1>Categories</h1>
            <InertiaLink
                href={route("categories.create")}
                className="btn btn-primary"
            >
                Add Category
            </InertiaLink>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <InertiaLink
                            href={route("categories.edit", category.id)}
                            className="btn btn-secondary"
                        >
                            Edit
                        </InertiaLink>
                        <InertiaLink
                            href={route("categories.destroy", category.id)}
                            method="delete"
                            className="btn btn-danger"
                            as="button"
                        >
                            Delete
                        </InertiaLink>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export default Index;
