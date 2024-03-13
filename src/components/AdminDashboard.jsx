import React, { useState, useEffect } from 'react';

import Header from './header';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
import AdminClaimsTable from './AdminClaimsTable';
import './AdminDashboard.css'




const AdminDashboard = () =>{

    const [claim, setClaim] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:8003/admin/claims';
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

                setClaim(responseData.claims)
            } catch (error) {
                console.error("Error occurred while fetching claim:", error);
            }
        };
    
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return(
        <>
        <div className='header-container'>
       <Header/>
   </div>
<div className='main-container'>
  
   <div className='sidebar-container'>
          <Sidebar isAdmin={true}/>
   </div>

   <div className='content-container'>
    
       <div className='table-container'>
       
        <AdminClaimsTable claims={claim}/>
      
       
     </div>
       

   </div>

</div>
       

      

<button onClick={handleLogout}>LOGOUT</button>
      
 </>
    )
}

export default AdminDashboard;
