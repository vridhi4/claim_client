import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './sidebar.css';

const Sidebar = ({ isAdmin }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="sidebar">
      <div className='links'>
        <ul>
          {isAdmin ? (
            <>
              <li onClick={() => navigate('/AdminDashboard')}>Home</li>
              <li onClick={() => navigate('/AdminPendingClaims')}>Pending Claims</li>
              {/* <li onClick={() => navigate('/ApproveClaim')}>Approve Claims</li> */}
              <li onClick={() => navigate('/EditPolicies')}>View Policies</li>
              <li onClick={() => navigate('/AddPolicy')}>Add Policy</li>
              
            </>
          ) : (
            <>
              <li onClick={() => navigate('/Dashboard')}>Home</li>
              <li onClick={() => navigate('/UserPolicies')}>Policies</li>
              <li onClick={() => navigate('/ApplyClaim')}>Apply Claim</li>
              <li onClick={() => navigate('/FetchAllClaims')}>Claims</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
  
};

export default Sidebar;
