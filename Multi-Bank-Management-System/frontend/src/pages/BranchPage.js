import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBranches } from '../services/ApiService'; // Make sure this path is correct
import './BranchPage.css'; // Import the CSS for styling

const BranchPage = () => {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]); // Initialized with an empty array

    useEffect(() => {
        getBranches()
            .then(response => {
                setBranches(response.data); // Ensure the data is set here
                console.log("Info from Backend:", response.data)
            })
            .catch(error => {
                console.error('Failed to fetch branches:', error);
            });
    }, []);

    useEffect(() => {
        console.log("Info from Backend Branch:", branches.name);
      }, [branches]); 

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
                            <li key={index}>
                            {employee.name}
                            </li>
                        ))}
                        </ul>
                        { <p>Minimum Cash Requirement: ${branch.minimum_cash_requirement}</p> }
                        <p>Average Weelky withdrawals: ${branch.avg_daily_withdrawal}</p>
                        <p>Average Weelky deposits: ${branch.avg_daily_deposit}</p>
                        <p>Average Weelky traffic: {branch.avg_daily_traffic} people/day</p>
                        <button onClick={() => handleEditBranchClick(branch.id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchPage;