'use client';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: { 
     light: {
      palette:{
        primary: {
          main: '#025581', // Main primary color for dark mode
        },
        secondary: {
          main: '#b8e3f3', // Secondary color for dark mode
        },
        background:{
          default:'#e3e3e3',
          paper: '#ffffff',
        },
        success:{
          main:'#054e24',
        },
        error:{
          main:'#a01111',
        }
      }
     } ,
     dark: {
      palette:{
        primary: {
          main: '#1f8362', // Main primary color for dark mode
        },
        secondary: {
          main: '#e6cad3', // Secondary color for dark mode
        },
        background: {
          default: '#242323',
          paper: '#110f0f',
        },
      }
     } 
    },
  cssVariables: {
    colorSchemeSelector: 'class',
  },

  typography: {
    fontFamily: roboto.style.fontFamily ,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    overline: {
      lineHeight: 1.66
    },
    button: {
      textTransform: 'capitalize'
    }
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: "13px", // Kích thước chữ mặc định cho toàn bộ DataGrid
        },
        cell: {
          fontSize: "13px", // Kích thước chữ trong các ô
        },
        columnHeaders: {
          fontSize: "14px", // Kích thước chữ trong header
          fontWeight: "bold", // Đậm header nếu cần
        },
      },
    },
  },
  
});

export default theme;