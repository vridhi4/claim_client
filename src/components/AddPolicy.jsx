import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import './AddPolicy.css';

const AddPolicy = () =>{

    const [formData, setFormData] = useState({
        policyName: "",
        policyNumber: "",
        premium: "",
        sumAssured: "",
        startDate: "",
        endDate: "",
      });


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
                alert('Policy created successfully')
            }
         
          }
        } catch (error) {
          console.error("Error creating policy:", error);
        }
      };
    




return (
    <>
     <div className='header-container'>
        <Header/>
    </div>
<div className='main-container2'>
   
    <div className='sidebar-container'>
           <Sidebar isAdmin/>
    </div>

    <div className='content-container2'>
              <form onSubmit={handleSubmit} className="policy-form">
                <label className="form-label">
                  Policy Name:
                  <input
                    type="text"
                    name="policyName"
                    value={formData.policyName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Policy Number:
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Premium:
                  <input
                    type="text"
                    name="premium"
                    value={formData.premium}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Sum Assured:
                  <input
                    type="text"
                    name="sumAssured"
                    value={formData.sumAssured}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Start Date:
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  End Date:
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <button type="submit" className="submit-button">
                  Create Policy
                </button>
              </form>
        
        
      </div>
   

    </div>




          

    </>
)

}

export default AddPolicy;