import React, { useState, useEffect } from 'react';
import All_Policy_Data from './All_Policy_Data';
import Sidebar from './sidebar';
import Header from './header';
import './UserPolicies.css'

const Mypolicies = () => {
    const [userPolicy, setUserPolicy] = useState([]);
    
    useEffect(() => {
        fetchUserPolicies();
    }, []); // Run only once on component mount

    const fetchUserPolicies = async () => {
        try {
            const get_token = localStorage.getItem('token');
            const response = await fetch('https://claim-server.onrender.com/customer/user_policies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get_token}`
                }
            });

            if (!response.ok) {
                console.log("Failed to fetch policies");
            } else {
                const responseData = await response.json();
                console.log("Policy data", responseData);

                if (responseData && responseData.policies && Array.isArray(responseData.policies)) {
                    setUserPolicy(responseData.policies);

                    // Extract policy numbers and store in local storage
                    const policyNumArray = responseData.policies.map(policy => policy.policyNumber);
                    localStorage.setItem('policyNumArray', JSON.stringify(policyNumArray));
                }
            }
        } catch (error) {
            console.error("Error occurred while fetching policies:", error);
        }
    };
    
    return (
        <>
            <div className='header-container'>
                <Header />
            </div>
            <div className='main-container'>
                <div className='sidebar-container'>
                    <Sidebar />
                </div>
                <div className='content-container'>
                    <div className='table-container1'>
                        <All_Policy_Data all_policies={userPolicy} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mypolicies;
