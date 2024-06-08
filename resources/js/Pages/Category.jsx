import React from 'react';
import { usePage } from '@inertiajs/react';

function Category() {
    const { categories } = usePage().props;

    return (
        <>
            <h1>category List</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}: {category.type}</li>
                ))}
            </ul>
        </>
    );
}

export default Category;
