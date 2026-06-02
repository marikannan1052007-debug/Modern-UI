import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import DashboardLayout from "./layout/DashboardLayout"

import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App