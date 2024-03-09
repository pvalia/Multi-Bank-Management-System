import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBranch.css'; // Ensure this CSS file exists and is styled correctly

// Mock function to fetch branch details, replace with real data fetching in your app
const fetchBranchDetails = (branchId) => {
  // Simulate an API call to get branch details
  return Promise.resolve({
    id: branchId,
    name: 'Branch ' + branchId, // Mock name based on branch ID
    traffic: 200
  });
};

const EditBranchPage = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [branchName, setBranchName] = useState('');
  const [traffic, setTraffic] = useState(0);

  useEffect(() => {
    fetchBranchDetails(branchId).then(data => {
      setBranchName(data.name);
      setTraffic(data.traffic);
    });
  }, [branchId]);

  const handleBranchNameChange = (e) => {
    setBranchName(e.target.value);
  };

  const handleWithdrawls = (e) => {
    setTraffic(e.target.value);
  };

  const handleDeposits = (e) => {
    setTraffic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually send the updated data to the server
    console.log(`Branch ${branchId} updated with new name: ${branchName} and traffic: ${traffic}`);
    navigate('/'); // Redirect to home page or branch list page
  };

  return (
    <div className="edit-branch-page">
      <h1>Edit Branch</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="branchName">Branch Name</label>
        <input
          type="text"
          id="branchName"
          value={branchName}
          onChange={handleBranchNameChange}
        />

        <label htmlFor="withdrawls">Total daily withdrawals</label>
        <input
          type="number"
          id="withdrawls"
          value={traffic}
          onChange={handleWithdrawls}
        />

        <label htmlFor="deposits">Total daily deposits</label>
        <input
          type="number"
          id="deposits"
          value={traffic}
          onChange={handleDeposits}
        />
        
        <button type="submit">Update Branch</button>
      </form>
    </div>
  );
};

export default EditBranchPage;
