'use client';

import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            lightest: '#576483',
            light: '#3B4969',
            main: '#263453',
            dark: '#162341',
            darkest: '#08132B',
            text: '#ddd',
            contrasText: '#fff',
        },
        secondary: {
            lightest: '#6d8ec4',
            light: '#4971b5',
            main: '#365486',
            dark: '#2b446d',
            darkest: '#1d2d48',
            text: '#ddd',
            contrasText: '#fff',
        },
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },
});

export default theme;