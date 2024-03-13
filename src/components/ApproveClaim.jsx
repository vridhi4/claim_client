import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import './ApproveClaim.css'

const ApproveClaim = () => {
  const location = useLocation();
  const claimData = location.state.claimData;

  // Function to render selected key-value pairs as table rows
  const renderClaimData = () => {
    return (
      <table>
        <tbody>
          <tr>
            <td className="label">Username</td>
            <td>{claimData.user_name}</td>
          </tr>
          <tr>
            <td className="label">Policy Number</td>
            <td>{claimData.policy_num}</td>
          </tr>
          <tr>
            <td className="label">Reason</td>
            <td>{claimData.claim_reason}</td>
          </tr>
          <tr>
            <td className="label">Hospital</td>
            <td>{claimData.Hospital_name}</td>
          </tr>
          <tr>
            <td className="label">Claim Amount</td>
            <td>{claimData.claim_amount}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const ApproveHandler = async () =>{
    try {
        const response = await fetch(
          `https://claim-server.onrender.com/admin/approve_claim/${claimData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to approve claim");
        }
        // Handle success
        console.log("Claim approved successfully");
      } catch (error) {
        console.error("Error occurred while approving claim:", error);
      }
  };

  const DenyHandler = async () =>{
    try {
        const response = await fetch(
          `https://claim-server.onrender.com/admin/deny_claim/${claimData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to deny claim");
        }
        // Handle success
        console.log("Claim denied successfully");
      } catch (error) {
        console.error("Error occurred while denying claim:", error);
      }
  };

  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidebar-container">
          <Sidebar isAdmin={true} />
        </div>
        <div className="content-container3">
          {renderClaimData()}
          <div className="buttons">
            <button onClick={ApproveHandler}>Approve</button>
            <button onClick={DenyHandler}>Reject</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproveClaim;
