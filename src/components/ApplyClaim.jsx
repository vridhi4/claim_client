import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import ClaimForm from './claimForm';
import './ApplyClaim.css';

const ApplyClaim = () => {
    
     const policyNumArray = localStorage.getItem('policyNumArray');



    return (
        <>
            <div className='header-container'>
                <Header />
            </div>
            <div className='main-container1'>
                <div className='sidebar-container'>
                    <Sidebar />
                </div>
            
                <div className='content-container1'>
                  <div >
                  <ClaimForm className="claim-form" policyNumArrayProp={policyNumArray} />

                  </div>
                  
                </div>
            </div>
        </>
    );
}

export default ApplyClaim;
