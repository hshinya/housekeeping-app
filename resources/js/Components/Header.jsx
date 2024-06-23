import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = ({ onMenuClick, isSidebarOpen }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {!isDesktop && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ marginRight: 2 }}
                    >
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                )}
                <Typography variant="h6" noWrap component="div">
                    家計簿アプリ
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
