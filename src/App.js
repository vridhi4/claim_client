import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Signup from "./components/register.jsx"
import Login from "./components/login.jsx";
import Dashboard from "./components/dashboard.jsx";
import UserPolicies from "./components/UserPolicies.jsx";
import ShowClaims from "./components/ShowClaims.jsx"
import ApplyClaim from "./components/ApplyClaim.jsx";
import AdminLogin from "./components/adminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import FetchAllClaims from "./components/FetchAllClaims.jsx";
import AdminPendingClaims from "./components/AdminPendingClaims.jsx";
import ApproveClaim from "./components/ApproveClaim.jsx";
import EditPolicies from "./components/EditPolicies.jsx";
import AddPolicy from "./components/AddPolicy.jsx";


function App() {
  return  (
    <Router>
<Routes>

<Route path="/" element={<Signup/>} />
    { <Route path="/register" element={<Signup/>} /> }
    <Route path="/login" element={<Login/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/UserPolicies" element={<UserPolicies/>} />
    <Route path="/ShowClaims" element={<ShowClaims/>} />
    <Route path="/ApplyClaim" element={<ApplyClaim/>} />
    <Route path="/adminLogin" element={<AdminLogin />} />
    <Route path="/AdminDashboard" element={<AdminDashboard />} />
    <Route path="/FetchAllClaims" element={<FetchAllClaims />} />
    <Route path="/AdminPendingClaims" element={<AdminPendingClaims />} />
    <Route path="/ApproveClaim" element={<ApproveClaim />} />
    <Route path="/EditPolicies" element={<EditPolicies />} />
    <Route path="/AddPolicy" element={<AddPolicy />} />

    

</Routes>
    </Router>

  )
}


export default App;
