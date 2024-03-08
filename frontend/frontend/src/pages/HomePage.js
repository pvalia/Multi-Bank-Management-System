import React from 'react';
import './HomePage.css'; // Import the CSS for styling

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>Multi-Branch Bank Management System</h1>
            <div className="buttons">
                <button onClick={() => alert('Create Employee Clicked')}>Create Employee</button>
                <button onClick={() => alert('Create Branch Clicked')}>Create Branch</button>
            </div>
        </div>
    );
}

export default HomePage;