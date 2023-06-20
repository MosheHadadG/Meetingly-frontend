import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import store from "./redux/store";
import { cssVar } from "./pages/CalendarPage/components/CalendarEvents/ScheduleEvents/utils/utils";
import DialogProvider from "./services/contexts/Dialog";
import SubDialogProvider from "./services/contexts/SubDialog";
import SnackBarProvider from "./services/contexts/SnackBar";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  palette: {
    primary: {
      main: cssVar("--color-primary-purple"),
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <DialogProvider>
          <SubDialogProvider>
            <Router>
              <App />
            </Router>
          </SubDialogProvider>
        </DialogProvider>
      </SnackBarProvider>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
