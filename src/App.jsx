import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreatePortfolio from "./pages/CreatePortfolio";
import PortfolioPage from "./pages/PortfolioPage";
 import Login from "./pages/Login";  

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreatePortfolio />} />
          </Route>
          <Route path="/portfolio/:slug" element={<PortfolioPage />} />
           <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}