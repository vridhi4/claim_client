import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import "./EditPolicies.css";
const All_policy_API = `https://claim-server.onrender.com/customer/policies`;

const EditPolicies = () => {
  const navigate = useNavigate();
  const [all_policies, set_all_policies] = useState([]);
  const [formData, setFormData] = useState({
    policyName: "",
    policyNumber: "",
    premium: "",
    sumAssured: "",
    startDate: "",
    endDate: "",
  });

 
  useEffect(() => {
    tokenCheck();
    viewAllPolicies();
    console.log({all_policies})
  }, []);

  const tokenCheck = () => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/login");
    }
  };

  const viewAllPolicies = async () => {
    // Fetch all policies and update state
    try {
      const get_token = localStorage.getItem("admin_token");
      const response = await fetch(All_policy_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_token}`,
        },
      });
      if (!response.ok) {
        console.log("Failed to fetch policies");
      } else {
        const responseData = await response.json();
        console.log("Data", responseData);
        if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          set_all_policies(responseData.data);
        } else {
          console.log("Data is not in the expected format.");
        }
      }
    } catch (err) {
      console.error("Error fetching policies:", err);
    }
  };

  const handleDelete = async (id) => {
    // Delete policy with the given ID
    try {
      console.log("this woe");
      const get_token = localStorage.getItem("admin_token");
      const response = await fetch(
        `https://claim-server.onrender.com/admin/delete_policy/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token}`,
          },
        }
      );
      console.log({ response });
      if (!response.ok) {
        console.log("Failed to delete policy:", response.status);
        const errorMessage = await response.text(); // Get error message from response body if available
        console.log("Error message:", errorMessage);
      } else {
        console.log("Policy deleted successfully");
        // Remove the deleted policy from the state
        set_all_policies((prevPolicies) =>
          prevPolicies.filter((policy) => policy._id !== id)
        );
      }
    } catch (err) {
      console.error("Error deleting policy:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8003/admin/create_policy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("Failed to create policy:", errorMessage);
      } else {
        const newPolicy = await response.json();
        //set_all_policies((prevPolicies) => [...prevPolicies, newPolicy]);
        // Reset form fields
        setFormData({
          policyName: "",
          policyNumber: "",
          premium: "",
          sumAssured: "",
          startDate: "",
          endDate: "",
        });
        if(newPolicy)
        {
            viewAllPolicies();
        }
      }
    } catch (error) {
      console.error("Error creating policy:", error);
    }
  };

  

  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidebar-container">
          <Sidebar isAdmin />
        </div>
        <div className="content-container">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Policy No.</th>
                  <th>Name</th>
                  <th>Premium</th>
                  <th>Sum Assured</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                  {/* Add more headers if needed */}
                </tr>
              </thead>
              <tbody>
                {all_policies.map((policy) => (
                  <tr key={policy._id}>
                    <td>{policy.policyNumber}</td>
                    <td>{policy.policyName}</td>
                    <td>{policy.premium}</td>
                    <td>{policy.sumAssured}</td>
                    <td>{new Date(policy.startDate).toLocaleDateString()}</td>
                    <td>{new Date(policy.endDate).toLocaleDateString()}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(policy._id)}>
                        Delete
                      </button>
                    </td>
                    {/* Render more data fields if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="form-container">

         
          
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPolicies;
