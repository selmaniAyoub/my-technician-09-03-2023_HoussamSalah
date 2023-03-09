import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from '../components/Admin/NavigationBar/NavigationBar';


export default function HomeLayout({ children }) {
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1400,
                xl: 1536,
            },
        },
        typography: {
            fontFamily: '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigationBar>
                {children}
            </NavigationBar>
        </ThemeProvider>
    )
}