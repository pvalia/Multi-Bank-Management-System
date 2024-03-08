import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BranchPage.css'; // Import the CSS for styling

// Example branch data (you would get this from your app's state or an API in a real app)
const branches = [
  {
    id: 1,
    name: "RBC",
    employees: ['Alice Smith', 'Bob Johnson'],
    minCashRequirement: 50000,
    withdrawls: 150,
    deposits: 150
  },
  {
    id: 2,
    name: "TD",
    employees: ['Charlie Brown', 'Dana White', 'Bob Smith'],
    minCashRequirement: 75000,
    withdrawls: 200,
    deposits: 150
  },
  {
    id: 3,
    name: "CIBC",
    employees: ['Charlie Brown', 'Dana White', 'Bob Smith','Alice Smith',],
    minCashRequirement: 9000,
    withdrawls: 300,
    deposits: 150
  },
  {
    id: 4,
    name: "TD",
    employees: ['Charlie Brown', 'Bob Smith'],
    minCashRequirement: 75000,
    withdrawls: 200,
    deposits: 150
  },
  {
    id: 5,
    name: "CIBC",
    employees: ['Charlie Brown', 'Dana White', 'Bob Smith'],
    minCashRequirement: 10000,
    withdrawls: 300,
    deposits: 150
  },
  {
    id: 5,
    name: "TD",
    employees: ['Alice Smith', 'Dana White', 'Bob Smith'],
    minCashRequirement: 75000,
    withdrawls: 200,
    deposits: 150
  },
  {
    id: 7,
    name: "CIBC",
    employees: [ 'Dana White'],
    minCashRequirement: 9000,
    withdrawls: 300,
    deposits: 150
  },
];

const BranchPage = () => {
    const navigate = useNavigate();

    // Function to handle navigation to EmployeeForm
    const handleCreateEmployeeClick = () => {
        navigate('/create-employee');
    };

    // Function to handle navigation to BranchForm
    const handleCreateBranchClick = () => {
        navigate('/create-branch');
    };

    const handleEditBranchClick = (branchId) => {
        navigate(`/edit-branch/${branchId}`);
    };

    return (
        <div className="branch-page">
            <h1>Multi-Branch Bank Management System</h1>
            <div className="buttons">
                <button onClick={handleCreateEmployeeClick}>Create Employee</button>
                <button onClick={handleCreateBranchClick}>Create Branch</button>
            </div>

            {/* Branches Section */}
            <div className="branches">
                {branches.map(branch => (
                    <div key={branch.id} className="branch-info">
                        <h2>Branch ID: {branch.id}</h2>
                        <h3>Branch Name:</h3>
                        <ul>
                            <li>{branch.name}</li>   
                        </ul>
                        <h3>Employees:</h3>
                        <ul>
                            {branch.employees.map((employee, index) => (
                                <li key={index}>{employee}</li>
                            ))}
                        </ul>
                        <p>Minimum Cash Requirement: ${branch.minCashRequirement}</p>
                        <p>Total daily withdrawals: ${branch.withdrawls}</p>
                        <p>Total daily deposits: ${branch.deposits}</p>
                        <button onClick={() => handleEditBranchClick(branch.id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchPage;
