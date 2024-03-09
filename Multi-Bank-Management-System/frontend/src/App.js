import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import EmployeeForm from './pages/EmployeeForm';
import BranchForm from './pages/BranchForm';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links Example (optional) */}
        {/* Routes Setup */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-employee" element={<EmployeeForm />} />
          <Route path="/create-branch" element={<BranchForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
