// services/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Your FastAPI server URL

export const createBranch = (branchData) => {
  console.log('Creating branch with data:', branchData); // Print data being sent
  return axios.post(`${API_URL}/branches/`, branchData)
              .then(response => {
                console.log('Response from creating branch:', response.data); // Print response data
                return response;
              });
};

export const createEmployee = (employeeData) => {
  console.log('Creating employee with data:', employeeData); // Print data being sent
  return axios.post(`${API_URL}/employees/`, employeeData)
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

