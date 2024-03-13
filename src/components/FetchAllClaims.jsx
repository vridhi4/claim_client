import React, { useState, useEffect } from "react";
import ShowClaim from "./ShowClaims";
import ClaimsTable from "./claimsTable";
import Header from "./header";
import Sidebar from "./sidebar";

const FetchAllclaim = ({ isAdmin }) => {
  const [claim, setclaim] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchclaim = async () => {
      let url = "";
      let get_token = "";
      if (isAdmin) {
        url = "https://claim-server.onrender.com/admin/claims";
        get_token = localStorage.getItem("admin_token");
      } else {
        url = "https://claim-server.onrender.com/claims";
        get_token = localStorage.getItem("token");
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claim");
        }
        const responseData = await response.json();
        setclaim(responseData.claims);
      } catch (error) {
        setError(error.message);
        console.error("Error occurred while fetching claim:", error);
      }
    };
    fetchclaim();
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts

  console.log({ claim });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {isAdmin ? <ClaimsTable claims={claim}/> : (
        <>
          <div className="header-container">
            <Header />
          </div>
          <div className="main-container">
            <div className="sidebar-container">
              <Sidebar />
            </div>
            <div className="content-container">
              <ClaimsTable claims={claim} />
            </div>
          </div>
        </>
      )}
    </div>
  );
  
};

export default FetchAllclaim;
