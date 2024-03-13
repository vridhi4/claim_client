

const ClaimsTable = ({claims }) => {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Hospital Name</th>
                        <th>Reason</th>
                        <th>Claim Amount</th>
                        <th>Status</th>
                        <th>Policy Number</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {claims.map((claim) => {
                        const { Hospital_name, claim_reason, claim_amount, Status , user_id, policy_num} = claim;
                      
                        return (
                            <tr key={user_id}>
                                <td>{Hospital_name}</td>
                                <td>{claim_reason}</td>
                                <td>{claim_amount}</td>
                                <td>{Status}</td>
                                <td>{policy_num}</td>  
                            </tr>
                        );
                    })}
                </tbody>
            </table>
           
          
        </div>
    );
}

export default ClaimsTable;
