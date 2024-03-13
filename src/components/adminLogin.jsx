import React from 'react';
import Login from './login';

const AdminLogin = () =>{
    return(
        <>
            <div>
               
                <Login isAdmin={true} /> {/* Pass isAdmin prop */}
            </div>
        </>
    )
}

export default AdminLogin;
