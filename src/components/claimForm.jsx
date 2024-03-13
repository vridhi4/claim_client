import React, { useState } from 'react';
import './ClaimForm.css'; // Importing CSS file
import {ReactUrl} from './ReactURL'

const ClaimForm = () => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [hospital, setHospital] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');


  const policyNumArray = JSON.parse(localStorage.getItem('policyNumArray')) || [];



  const fetch_Claim = async () => {
    const url = `${ReactUrl}/customer/claim_policy/` + policyNumber; // Added '/' between base URL and policyNumber
    const get_token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${get_token}`
      },
      body: JSON.stringify({
        claim_amount: amount, claim_reason: reason, Hospital_name: hospital, policy_num: policyNumber
      })
    });
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleHospitalChange = (event) => {
    setHospital(event.target.value);
  };

  const handlePolicyChange = (event) => {

    console.log("event triggered")

    console.log(typeof event.target.value);

    setPolicyNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, like submitting it to a server
    // console.log("Amount:", amount);
    // console.log("Reason:", reason);
    // console.log("Hospital:", hospital);
    console.log("Policy_num:", policyNumber)
    // Reset form fields
    setAmount('');
    setReason('');
    setHospital('');
  };


  return (
    <form onSubmit={handleSubmit} className="claim-form">
      <div className="form-group">
        <label className="form-label">
          Choose Policy Number
          <select className="form-select" onChange={handlePolicyChange}>
          <option value="">Select Policy Number</option>
  {policyNumArray.map(policy => (
    <option key={policy} value={policy}>{policy}</option>
  ))}
</select>

        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Please enter claim amount
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="form-input"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Please provide reason for applying claim
          <input
            type="text"
            value={reason}
            onChange={handleReasonChange}
            className="form-input"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
         Enter the name of Hospital
          <input
            type="text"
            value={hospital}
            onChange={handleHospitalChange}
            className="form-input"
            required
          />
        </label>
      </div>
      <div className='submit-button1'>
      <button className="claimForm-button" onClick={() => { fetch_Claim() }}>Submit</button>

      </div>
      
    </form>
  );
}

export default ClaimForm;
