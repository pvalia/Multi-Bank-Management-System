import React, { useState } from 'react';
import './EmployeeForm.css'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const BranchForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    avg_daily_traffic: 0,
    avg_daily_deposit: 0,
    avg_daily_withdrawal: 0,
    minimum_cash_requirement: 0,
  });
  const navigate = useNavigate();

  // Function to update state based on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name.includes('avg_daily_') ? parseInt(value, 10) || 0 : value;
    setFormData({ ...formData, [name]: parsedValue });
  };
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting the following data:', formData); 
    axios.post(`${API_URL}/create-branch/`, formData)
      .then(response => {
        console.log('Branch created successfully:', response.data);
        return axios.post(`${API_URL}/assign-employees/`);
      })
      .then(() => {
        console.log('Employees assigned successfully');
        navigate('/');
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Validation errors:', error.response.data);
        }
        console.error('Failed to create branch:', error);
      });
  };


  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Create Branch</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Branch Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Branch Address:</label>
            <input
              type="text"
              name="address"
              value={formData.branchLocation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avg_daily_traffic">Average Traffic:</label>
            <input
              type="text"
              name="avg_daily_traffic"
              value={formData.avg_daily_traffic}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avg_daily_deposit">Average Daily Deposits:</label>
            <input
              type="text"
              name="avg_daily_deposit"
              value={formData.avg_daily_deposit}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avg_daily_withdrawal">Average Daily Withdrawals:</label>
            <input
              type="text"
              name="avg_daily_withdrawal"
              value={formData.avg_daily_withdrawal}
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="CREATE" />
        </form>
      </div>
    </div>
  );
};

export default BranchForm;
