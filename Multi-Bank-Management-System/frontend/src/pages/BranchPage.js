import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBranches, deleteBranch, assignEmployees} from '../services/ApiService'; 
import './BranchPage.css'; 
import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

const BranchPage = () => {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const handleRemoveBranchClick = async (branchId) => {
        console.log("deleting branch id:", branchId)
        try {
            const message = await deleteBranch(branchId);
            console.log(message);
            assignEmployees();
            window.location.reload();
            console.log("Branch removed successfully");
        } catch (error) {
            console.error('Failed to delete branch:', error);
        }
    };
    const handleEmployeeDelete = (employee_Id) => {
        axios.delete(`${API_URL}/employees/${employee_Id}`, employee_Id)
          .then(() => {
            console.log('Employee deleted successfully');
            return axios.post(`${API_URL}/assign-employees/`);
          })
          .then(() => {
            console.log('Employees assigned successfully');
            window.location.reload();
          })
          .catch(error => {
            console.error('Failed to delete or re-assign employees:', error);
          });
    };

    useEffect(() => {
        getBranches()
            .then(response => {
                setBranches(response.data); 
                console.log("Info from Backend:", response.data)
            })
            .catch(error => {
                console.error('Failed to fetch branches:', error);
            });
    }, []);

    useEffect(() => {
        console.log("Info from Backend Branch:", branches.name);
      }, [branches]); 

    const handleCreateEmployeeClick = () => {
        navigate('/create-employee');
    };

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

            <div className="branches">
                {branches.map(branch => (
                    <div key={branch.id} className="branch-info">
                        <h2>Branch ID: {branch.id}</h2>
                        <h3>Branch Name:</h3>
                        <ul>
                            <li>{branch.name}</li>
                        </ul>
                        <h3>Employees:</h3>
                        <ul className="employees-list">
                            {branch.employees.map((employee, index) => (
                                <li key={index}>
                                <div className="employee-name">{employee.name}</div>
                                <button onClick={() => handleEmployeeDelete(employee.id)} className="deleteButton">
                                    <img src="/trash.svg" alt="Delete" />
                                </button>
                                </li>
                            ))}
                        </ul>
                        { <p>Minimum Cash Requirement: ${branch.minimum_cash_requirement}</p> }
                        <p>Average Weekly Withdrawals: ${branch.avg_daily_withdrawal}</p>
                        <p>Average Weekly Deposits: ${branch.avg_daily_deposit}</p>
                        <p>Average Weekly Traffic: {branch.avg_daily_traffic} people/day</p>
                        <button onClick={() => handleEditBranchClick(branch.id)}>Edit</button>
                        <button3 onClick={() => handleRemoveBranchClick(branch.id)}>Remove</button3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchPage;