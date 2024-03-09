// Import React and useState hook
import React, { useState } from 'react';
import './EmployeeForm.css';
const EmployeeForm = () => {
  // Initialize form state with useState hook
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    address: '',
    position: '',
    startTime: '',
    endTime: '',
  });

  // Function to update state based on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({
      ...formData, // Spread current formData
      [name]: value, // Update changed value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Logic to handle form data, like sending to a server, goes here
    console.log('Form Data Submitted:', formData);
  };

  // JSX to render the form
  return (
    <div className="container">
    <div className="form-container">
      <h1 className="form-title">Create Employee</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        Position:
        <input type="text" name="position" value={formData.position} onChange={handleChange} />
      </label>
      <br />
      <label>
        Start Time:
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
      </label>
      <br />
      <label>
        End Time:
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="CREATE" />
    </form>
    </div>
    </div>
  );
};

export default EmployeeForm;
