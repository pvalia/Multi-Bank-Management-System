import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BranchPage from './pages/BranchPage';
import EmployeeForm from './pages/EmployeeForm';
import BranchForm from './pages/BranchForm';
import EditBranch from './pages/EditBranch';

function App() {
  return (
    <Router>
      <div>
        {/* Routes Setup */}
        <Routes>
          <Route path="/" element={<BranchPage />} />
          <Route path="/create-employee" element={<EmployeeForm />} />
          <Route path="/create-branch" element={<BranchForm />} />
          <Route path="/edit-branch/:branchId" element={<EditBranch/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
