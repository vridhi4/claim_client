import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminClaimsTable.css'

const AdminClaimsTable = ({ claims, isPendingClaim }) => {
    const [serial, setSerial] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Update serial number whenever claims array changes
        setSerial(1); // Reset serial number to 1
    }, [claims]);

    // Function to handle review claim button click
    const handleReviewClaim = (data) => {
        navigate('/ApproveClaim', { state: { claimData: data } });
    };

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Policy Number</th>
                        <th>User</th>
                        <th>Reason</th>
                        <th>Hospital</th>
                        <th>Claim Amount</th>
                        {!isPendingClaim && (<th>Status</th>)}
                        {isPendingClaim && (<th>Review Claim</th>)}
                    </tr>
                </thead>
                <tbody>
                    {claims.map((claim, index) => {
                        const { Hospital_name, claim_reason, claim_amount, Status, user_id, policy_num, user_name } = claim;
                        return (
                            <tr key={user_id}>
                                <td>{serial + index}</td>
                                <td>{policy_num}</td>
                                <td>{user_name}</td>
                                <td>{claim_reason}</td>
                                <td>{Hospital_name}</td>
                                <td>{claim_amount}</td>
                                {!isPendingClaim && (<td>{Status}</td>)}
                                {isPendingClaim && (
                                    <td>
                                        <button className="review-button"onClick={() => handleReviewClaim(claim)}>Review Claim</button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AdminClaimsTable;
