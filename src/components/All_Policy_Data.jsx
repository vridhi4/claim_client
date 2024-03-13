import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowClaim from './ShowClaims'; // Make sure to import the correct component
import './All_Policy_Data.css'; // Import your CSS file

import {ReactUrl} from './ReactURL';

const All_Policy_data = ({ all_policies, isHome }) => {
    const navigate = useNavigate(); // Use useNavigate hook if you're using React Router
    const get_token = localStorage.getItem('token');

    //const [isApplied, setIsApplied] = useState("")

    const ApplyPolicyHandler = async (policyNumber) => {
        try {
            const response = await fetch(`${ReactUrl}/customer/applyPolicy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get_token}`
                },
                body: JSON.stringify({
                    policy_num: policyNumber
                })
            });
            if (response.ok) {
                // Policy applied successfully, you may want to handle this event
            } else {
                alert("You have Already applied this policy")
                // Handle error response
                console.error('Failed to apply policy');
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error occurred while applying policy:', error);
        }
    };

    return (
        <div className="cards-container">
            {all_policies.map((policy) => {
                const { policyName, policyNumber, premium, sumAssured, startDate, endDate } = policy;

                const newStartDate = new Date(startDate).toLocaleDateString();
                const newEndDate = new Date(endDate).toLocaleDateString();

                return (
                    <div key={policyNumber} className="card">
                        <div className='card-heading'> 
                            <h3>{policyName}</h3>
                        </div>
                        <div className='card-content'>
                            <p><strong>Policy Number:</strong> {policyNumber}</p>
                            <p><strong>Premium:</strong> {premium}</p>
                            <p><strong>Sum Assured:</strong> {sumAssured}</p>
                            <p><strong>Start Date:</strong> {newStartDate}</p>
                            <p><strong>End Date:</strong> {newEndDate}</p>
                        </div>
                        <div className='button-container'>
                            {isHome ? (
                                <button className='button' onClick={() => ApplyPolicyHandler(policyNumber)}>Apply Policy</button>
                            ) : (
                                <button className="button" onClick={() => {}}>Claim</button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default All_Policy_data;
