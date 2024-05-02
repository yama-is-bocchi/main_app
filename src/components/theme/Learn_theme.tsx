import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
//primaryとsecondaryで、色を指定します
const mui_learn_theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ff0000",
      },
    secondary: {
        main: "#ff0000",
      },
    },
});

export default mui_learn_theme;