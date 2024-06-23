import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = ({ children }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [isSidebarOpen, setSidebarOpen] = React.useState(isDesktop);

    React.useEffect(() => {
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: { xs: 0, md: isSidebarOpen ? 20 : 0 },
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
