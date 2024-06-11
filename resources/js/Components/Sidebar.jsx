// resources/js/Components/Sidebar.jsx

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

function Sidebar() {
    const items = [
        { text: 'Inbox', icon: <InboxIcon /> },
        { text: 'Starred', icon: <MailIcon /> },
    ];

    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                {items.map((item, index) => (
                    <ListItem button key={item.text}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
