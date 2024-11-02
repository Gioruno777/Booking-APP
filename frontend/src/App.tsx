import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import Layout from "./laytout/Layout"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>9453</p></Layout>} />
        <Route path="/signup" element={<Layout><SignUpPage /></Layout>} />
        <Route path="/login" element={<Layout><LogInPage /></Layout>} />
        <Route path="/search" element={<>2486</>} />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  )
}

export default App