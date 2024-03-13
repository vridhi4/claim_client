import React, { useState, useEffect } from 'react';

import Sidebar from './sidebar';
import Header from './header';
import AdminClaimsTable from './AdminClaimsTable';

const AdminPendingClaims = () => {
 
    const [pendingClaims, setPendingClaims] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://claim-server.onrender.com/admin/claims';
            const get_token = localStorage.getItem('admin_token');

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${get_token}`
                    } 
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch claim');
                }
                const responseData = await response.json();

                console.log(responseData);

                
                
                const pendingClaimsArray = responseData.claims.filter(claim => claim.Status === "Pending");
                setPendingClaims(pendingClaimsArray);

                console.log({pendingClaims})

               
            } catch (error) {
                console.error("Error occurred while fetching claim:", error);
            }
        };
    
        fetchData();
    }, []); // Empty dependency array to ensure this effect runs only once

    return (
        <>
            <div className='header-container'>
                <Header/>
            </div>
            <div className='main-container'>
                <div className='sidebar-container'>
                    <Sidebar isAdmin={true}/>
                </div>
                <div className='content-container'>
                    {
                        pendingClaims.length > 0 ? (
                            <div className='table-container'>
                                <AdminClaimsTable claims={pendingClaims} isPendingClaim/>
                            </div>
                        ) : (
                            <p>Currently there are no pending claims.</p>
                        )
                    }
                    </div>
                </div>
       
        </>
    );
};

export default AdminPendingClaims;
