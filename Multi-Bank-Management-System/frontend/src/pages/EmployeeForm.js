import React, { useState } from 'react';
import './EmployeeForm.css'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avg_daily_work_hours: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataWithCorrectTypes = {
      ...formData,
      avg_daily_work_hours: Number(formData.avg_daily_work_hours),
    };

    console.log('Creating employee with data:', dataWithCorrectTypes);

    axios.post(`${API_URL}/employees/`, dataWithCorrectTypes)
    .then(response => {
      console.log('Employee created successfully:', response.data);
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
      console.error('Failed to create employee:', error);
    });
};
  

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
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" />
      </label>
      <br />
      <label>
        Position:
        <input type="text" name="position"  />
      </label>
      <br />
      <label>
        Daily Work Hours:
        <input type="text" name="avg_daily_work_hours" value={formData.avg_daily_work_hours} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="CREATE" />
    </form>
    </div>
    </div>
  );
};

export default EmployeeForm;
