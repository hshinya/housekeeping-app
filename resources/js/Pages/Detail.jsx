// resources/js/Pages/Detail.jsx

import React from 'react';
import { usePage } from '@inertiajs/react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import Layout from '../Components/Layout';

function Detail() {
    const { details } = usePage().props;

    return (
        <Layout title="Detail List">
            <Paper style={{ marginTop: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Details
                </Typography>
                <List>
                    {details.map(detail => (
                        <ListItem key={detail.id} divider>
                            <ListItemText
                                primary={detail.name}
                                secondary={detail.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}

export default Detail;
