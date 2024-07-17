import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles"; // useThemeをインポート
import { Link } from "@inertiajs/react";

const drawerWidth = 240; // Set drawer width

const Sidebar = ({ isOpen, onClose }) => {
    const theme = useTheme(); // useThemeを使用

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={isOpen}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: (theme) => theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                }}
            >
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {[
                    "dashboard",
                    "transactions",
                    "category",
                    "reports",
                    "setting",
                ].map((text, index) => (
                    <ListItem
                        button
                        key={text}
                        component={Link}
                        href={`/${text}`}
                    >
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
