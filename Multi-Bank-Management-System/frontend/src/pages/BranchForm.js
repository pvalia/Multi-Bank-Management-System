// BranchForm.js
import React, { useState } from 'react';
import './EmployeeForm.css'; // Reuse the same CSS if the styles are to be consistent

const BranchForm = () => {
  // Initialize form state with useState hook
  const [formData, setFormData] = useState({
    branchName: '',
    averageTraffic: '',
    openTime: '',
    closeTime: '',
  });

  // Function to update state based on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send formData to your backend server
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Create Branch</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="branchName">Branch Name:</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="branchLocation">Branch Location:</label>
            <input
              type="text"
              name="branchLocation"
              value={formData.branchLocation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="averageTraffic">Average Traffic:</label>
            <input
              type="text"
              name="averagetraffic"
              value={formData.averageTraffic}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="openTime">Open Time:</label>
            <input
              type="time"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="closeTime">Close Time:</label>
            <input
              type="time"
              name="closeTime"
              value={formData.closeTime}
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
