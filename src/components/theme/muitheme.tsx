import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
//primaryとsecondaryで、色を指定します
const mui_normal_theme = createMuiTheme({
    palette: {
      primary: {
        main: "#006400",
      },
    secondary: {
        main: "#006400",
      },
    },
});

export default mui_normal_theme;