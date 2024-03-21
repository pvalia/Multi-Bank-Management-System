import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBranches } from '../services/ApiService'; // Make sure this path is correct
import './BranchPage.css'; // Import the CSS for styling

const BranchPage = () => {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]); // State to store the branches

    // Function to fetch branches from the backend when the component mounts
    useEffect(() => {
        getBranches()
            .then(response => {
                setBranches(response.data); // Set the branches state with the response data
            })
            .catch(error => {
                console.error('Error fetching branches:', error);
                // Handle error state as needed
            });
    }, []); // The empty array ensures this effect runs only once after initial render

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
                        <p>Total daily withdrawals: ${branch.withdrawals}</p> {/* Fix typo: from withdrawls to withdrawals */}
                        <p>Total daily deposits: ${branch.deposits}</p>
                        <button onClick={() => handleEditBranchClick(branch.id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchPage;