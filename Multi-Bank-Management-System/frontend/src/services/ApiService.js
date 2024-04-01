import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const createBranch = (branchData) => {
  console.log('Creating branch with data:', branchData);

  const dataWithCorrectTypes = {
    ...branchData,
    avg_daily_traffic: Number(branchData.avg_daily_traffic),
    avg_daily_deposit: Number(branchData.avg_daily_deposit),
    avg_daily_withdrawal: Number(branchData.avg_daily_withdrawal),
    minimum_cash_requirement: Number(branchData.minimum_cash_requirement)
  };

  return axios.post(`${API_URL}/create-branch/`, dataWithCorrectTypes) 
    .then(response => {
      console.log('Response from creating branch:', response.data);
      return response;
    }).catch(error => {
      console.error('Error creating branch:', error.response ? error.response.data : error);
    });
};


export const createEmployee = (employeeData) => {
  console.log('Creating employee with data:', employeeData); 

  const dataWithCorrectTypes = {
    ...employeeData,
    avg_daily_work_hours: Number(employeeData.avg_daily_work_hours),
  };

  return axios.post(`${API_URL}/employees/`, dataWithCorrectTypes)
              .then(response => {
                console.log('Response from creating employee:', response.data); 
                return response;
              });
};

export const updateBranch = (branchId, branchData) => {
  console.log(`Updating branch with ID ${branchId} with data:`, branchData);
  return axios.patch(`${API_URL}/branches/${branchId}`, branchData)
              .then(response => {
                console.log(`Response from updating branch ID ${branchId}:`, response.data); 
                return response;
              });
};

export const getBranches = () => {
  console.log('Fetching all branches'); 
  return axios.get(`${API_URL}/branches/`)
              .then(response => {
                console.log('Response from fetching branches:', response.data);
                return response;
              });
};

export const deleteBranch = async (branchId) => {
  const response = await fetch(`http://localhost:8000/branches/${branchId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  if (!response.ok) {
      throw new Error('Failed to delete branch');
  }
  return 'Branch deleted successfully';
};

export const assignEmployees = async (trafficPerEmployee = 100) => {
  const response = await fetch(`http://localhost:8000/assign-employees/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ traffic_per_employee: trafficPerEmployee }),
  });
  if (!response.ok) {
      throw new Error('Failed to assign employees');
  }
  return response.json(); 
};