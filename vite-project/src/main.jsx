import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { ThemeProvider } from "./components/theme-provider"
import { StudentProvider } from "./context/StudentContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </ThemeProvider>
  </React.StrictMode>
)