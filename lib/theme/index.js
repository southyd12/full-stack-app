import { createTheme } from "@mui/material/styles";
import {yellow, indigo} from '@mui/material/colors';
// import green from '@mui/material/colors/green';
let theme = createTheme({
  palette: {
    primary: {
      main: yellow[500],
      contrastText: indigo[900]
    },
    secondary: {
      main: indigo[900],
      contrastText: indigo[900],
    },
  },
});

export default theme;