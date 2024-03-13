import React, { useEffect , useState} from 'react';
import Sidebar from './sidebar';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import All_Policy_Data from './All_Policy_Data';
import {ReactUrl} from './ReactURL'
const All_policy_API = `${ReactUrl}/customer/policies`;



const Dashboard = ({ token }) => {

    const navigate = useNavigate();
    const [all_policies, set_all_policies] = useState([]);

    useEffect(() => {
        tokenCheck();
        fetchPolicies();
    }, []);

    const tokenCheck = () => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    };

   
    const fetchPolicies = async () => {
        try {
            const get_token = localStorage.getItem('token');
            const response = await fetch(All_policy_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get_token}`
                }
            });
           if (!response.ok) {
    console.log("failed to fetch policies");
} else {
    const responseData = await response.json();
    console.log("dataaaa", responseData);

    if(responseData)

    if (responseData && responseData.data && Array.isArray(responseData.data)) {
        set_all_policies(responseData.data);
        console.log("policies", all_policies);


    } else {
        console.log("Data is not in the expected format.");
    }
}
            
          
        } catch (err) {
            console.error('Error fetching policies:', err);
        }
    };


    return (
        <>
         <div className='header-container'>
        <Header/>
    </div>
<div className='main-container'>
   
    <div className='sidebar-container'>
           <Sidebar/>
    </div>

    <div className='content-container'>
    {/* <h1>Medical policies </h1> */}
        <div className='table-container'>
     
                {/* creating a component with parameter , comp will take all policies and do something in allpolicies vali file */}
                <All_Policy_Data all_policies = {all_policies} isHome/>    
        
      </div>
        

    </div>

</div>
        

       

     
       
  </>
        

    )
}

export default Dashboard;

