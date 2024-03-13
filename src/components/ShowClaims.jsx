import React, { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import ClaimsTable from './claimsTable';


const ShowClaim = ({claims}) => {

    if (!Array.isArray(claims)) {
        // If claims is not an array, return null or handle the error accordingly
        return null; // You can also return an error message or handle the error in another way
      }
    

// const [claim, setClaim] = useState([]);
 
// const fetch_Claim = async () => {
//     const url = 'http://localhost:8003/customer/claims';  
//     const get_token = localStorage.getItem('token');
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${get_token}`
//             } 
//         });
//         if (!response.ok) {
//             console.log("Failed to fetch claims");
//             return;
//         }
//         const responseData = await response.json();
//         console.log("Claims data", claim);

//         if (responseData && responseData.claims && Array.isArray(responseData.claims)) {
           
//             setClaim(responseData.claims); // Set state with fetched claims
//         }
//     } catch (error) {
//         console.error("Error occurred while fetching claims:", error);
//     }
// };

// fetch_Claim();


  
    
    return (
        <>
        <div className='header-conatiner'>
            <Header/>
        </div>
                <div className='main-container'>
        
                <div className='sidebar-container'>
                   <Sidebar/>
            </div>
            <div className='content-container'>
                <h1>this is claims page
                 
                </h1>
              <ClaimsTable claims ={claims}/>
              
             

            </div>
        
        
        
                </div>
                
                </>
    );
}


export default ShowClaim;