import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import LoadingSpinner from "../general/LoadingSpinner";

const VisaDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [visa, setVisa] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().slice(0, 10), 
    fee: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/visas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVisa(data);
        setFormData((prev) => ({ ...prev, fee: data.fee })); 
      })
      .catch((error) => console.error("Error fetching visa details:", error))
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const applicationData = {
      email: user?.email,
      ...formData,
      visa
    };

    fetch(`${import.meta.env.VITE_API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then((data) => {
        //("Application submitted:", data);
        toast.success("Visa application submitted successfully!");
        document.getElementById("my_modal_1").close();
      })
      .catch((error) => console.error("Error submitting application:", error));
  };

  if (!visa) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-6">
      {/* Country Name */}
      <h1 className="text-4xl font-bold text-center mb-8">{visa.countryName}</h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left Section: Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={visa.countryImage}
            alt={visa.countryName}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section: Information */}
        <div className="flex-grow">
          <div className="space-y-4">
            <p>
              <strong>Visa Type:</strong> {visa.visaType}
            </p>
            <p>
              <strong>Processing Time:</strong> {visa.processingTime}
            </p>
            <p>
              <strong>Fee:</strong> ${visa.fee}
            </p>
            <p>
              <strong>Validity:</strong> {visa.validity}
            </p>
            <p>
              <strong>Application Method:</strong> {visa.applicationMethod}
            </p>
            <p>
              <strong>Description:</strong> {visa.description}
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="btn btn-primary mt-6"
          >
            Apply for the Visa
          </button>
        </div>
      </div>

      {/* Modal for Visa Application Form */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Visa Application Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Fee</label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                disabled
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Apply
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default VisaDetails;
