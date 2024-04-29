import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingWrapper from "./components/LoadingWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { lazy } from "react";

// Below are the lazy loaded components
const Signup = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LoadingWrapper Child={Signup} />} />
          <Route
            path="/dashboard"
            element={<LoadingWrapper Child={Dashboard} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
