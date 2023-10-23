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
            lightest: '#FFE696',
            light: '#FFDC6B',
            main: '#ebc344',
            dark: '#D6A91B',
            darkest: '#A6810B',
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