import logo from "./logo.svg";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import JavaPlayground from "./JavaPlayground";

const theme = createTheme();

function App() {
  return <ThemeProvider theme={theme}>{<JavaPlayground />}</ThemeProvider>;
}

export default App;
