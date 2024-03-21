import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditBranch.css';

const API_URL = 'http://localhost:8000'; // Adjust this if your API is on a different URL

const EditBranchPage = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState({
    name: '',
    avg_daily_traffic: 0,
    avg_daily_withdrawal: 0,
    avg_daily_deposit: 0,
  });

  useEffect(() => {
    // Fetch branch details
    axios.get(`${API_URL}/branches/${branchId}`)
      .then(response => {
        setBranch(response.data); // Ensure the response data matches the state structure
      })
      .catch(error => {
        console.error('Failed to fetch branch details:', error);
      });
  }, [branchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'number' ? Number(value) : value;
    setBranch(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // First, send the updated data to the server to update the branch
    axios.patch(`${API_URL}/branches/${branchId}`, branch)
      .then(() => {
        console.log('Branch updated successfully');
        // After successfully updating the branch, assign employees
        return axios.post(`${API_URL}/assign-employees/`);
      })
      .then(() => {
        console.log('Employees assigned successfully');
        // After assigning employees, navigate to the home page or branch list page
        navigate('/');
      })
      .catch(error => {
        console.error('Failed to update branch or assign employees:', error);
      });
};

  return (
    <div className="edit-branch-page">
      <h1>Edit Branch: {branchId}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Branch Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={branch.name || ''} // Handle potential null/undefined values
          onChange={handleChange}
        />

        {/* Updated input names to match the state and backend */}
        <label htmlFor="avg_daily_traffic">Total daily traffic</label>
        <input
          type="number"
          id="avg_daily_traffic"
          name="avg_daily_traffic"
          value={branch.avg_daily_traffic || 0}
          onChange={handleChange}
        />

        <label htmlFor="avg_daily_withdrawal">Total daily withdrawals</label>
        <input
          type="number"
          id="avg_daily_withdrawal"
          name="avg_daily_withdrawal"
          value={branch.avg_daily_withdrawal || 0}
          onChange={handleChange}
        />

        <label htmlFor="avg_daily_deposit">Total daily deposits</label>
        <input
          type="number"
          id="avg_daily_deposit"
          name="avg_daily_deposit"
          value={branch.avg_daily_deposit || 0}
          onChange={handleChange}
        />

        <button type="submit">Update Branch</button>
      </form>
    </div>
  );
};

export default EditBranchPage;
