import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";

function Sidebar({ variant, open, onClose }) {
    const items = [
        { text: "Inbox", icon: <InboxIcon /> },
        { text: "Starred", icon: <MailIcon /> },
    ];

    return (
        <Drawer variant={variant} anchor="left" open={open} onClose={onClose}>
            <Toolbar /> {/* To ensure there's enough space below the header */}
            <List>
                {items.map((item) => (
                    <ListItem button key={item.text} onClick={onClose}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
