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
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/create-employee">Create Employee</a>
            </li>
            <li>
              <a href="/create-branch">Create Branch</a>
            </li>
          </ul>
        </nav>
        {/* Routes Setup */}
        <Routes>
          <Route path="/" exact component={HomePage} />
          <Route path="/create-employee" component={EmployeeForm} />
          <Route path="/create-branch" component={BranchForm} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
