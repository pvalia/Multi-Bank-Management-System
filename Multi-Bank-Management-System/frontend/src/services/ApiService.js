// services/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Your FastAPI server URL

export const createBranch = (branchData) => {
  console.log('Creating branch with data:', branchData);

  // Prepare data with the correct data types
  const dataWithCorrectTypes = {
    ...branchData,
    avg_daily_traffic: Number(branchData.avg_daily_traffic),
    avg_daily_deposit: Number(branchData.avg_daily_deposit),
    avg_daily_withdrawal: Number(branchData.avg_daily_withdrawal),
    minimum_cash_requirement: Number(branchData.minimum_cash_requirement)
  };

  return axios.post(`${API_URL}/create-branch/`, dataWithCorrectTypes) // Adjust API_URL to the correct endpoint
    .then(response => {
      console.log('Response from creating branch:', response.data);
      return response;
    }).catch(error => {
      console.error('Error creating branch:', error.response ? error.response.data : error);
    });
};


export const createEmployee = (employeeData) => {
  console.log('Creating employee with data:', employeeData); // Print data being sent

  const dataWithCorrectTypes = {
    ...employeeData,
    avg_daily_work_hours: Number(employeeData.avg_daily_work_hours),
  };

  return axios.post(`${API_URL}/employees/`, dataWithCorrectTypes)
              .then(response => {
                console.log('Response from creating employee:', response.data); // Print response data
                return response;
              });
};

export const updateBranch = (branchId, branchData) => {
  console.log(`Updating branch with ID ${branchId} with data:`, branchData); // Print data being sent
  return axios.patch(`${API_URL}/branches/${branchId}`, branchData)
              .then(response => {
                console.log(`Response from updating branch ID ${branchId}:`, response.data); // Print response data
                return response;
              });
};

export const getBranches = () => {
  console.log('Fetching all branches'); // Print operation
  return axios.get(`${API_URL}/branches/`)
              .then(response => {
                console.log('Response from fetching branches:', response.data); // Print response data
                return response;
              });
};

