import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./page/NotFound";
import Login from "./page/Login";
import AuthLayout from "./components/layout/AuthLayout";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<AuthLayout />} >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
