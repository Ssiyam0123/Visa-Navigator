import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider"; // Assuming you have a ThemeContext to manage dark mode.

const AddVisaPage = () => {
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); // Use darkMode state from context

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const countryImage = form.countryImage.value;
    const countryName = form.countryName.value;
    const visaType = form.visaType.value;
    const processingTime = form.processingTime.value;
    const requiredDocuments = Array.from(
      form.querySelectorAll('input[name="requiredDocuments"]:checked')
    ).map((checkbox) => checkbox.value);
    const description = form.description.value;
    const ageRestriction = form.ageRestriction.value;
    const fee = form.fee.value;
    const validity = form.validity.value;
    const applicationMethod = form.applicationMethod.value;
    const email = user?.email;

    const data = {
      countryImage,
      countryName,
      visaType,
      processingTime,
      requiredDocuments,
      description,
      ageRestriction,
      fee,
      validity,
      applicationMethod,
      email
    };

    if (!countryName || !visaType || !processingTime) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");

    fetch("https://assignment-10-server-swart-nine.vercel.app/visas", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Visa Added Successfully");
        }
        if (!data.insertedId) {
          toast.error("Please try again later.");
        }
        form.reset();
      });
  };

  return (
    <div className={`max-w-4xl mx-auto my-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-3xl font-bold text-center mb-6">Add Visa</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form 
        onSubmit={handleSubmit}
        className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`} // Apply the form's background based on dark mode
      >
        {/* Country Image */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="countryImage"
            className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} w-1/4`}
          >
            Country Image URL
          </label>
          <input
            type="url"
            id="countryImage"
            name="countryImage"
            className="mt-1 p-2 w-3/4 border rounded"
            placeholder="Enter country image URL"
            required
          />
        </div>

        {/* Country Name */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="countryName"
            className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} w-1/4`}
          >
            Country Name
          </label>
          <input
            type="text"
            id="countryName"
            name="countryName"
            className="mt-1 p-2 w-3/4 border rounded"
            placeholder="Enter country name"
            required
          />
        </div>

        {/* Visa Type */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="visaType"
            className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} w-1/4`}
          >
            Visa Type
          </label>
          <select
            id="visaType"
            name="visaType"
            className="mt-1 p-2 w-3/4 border rounded"
            required
          >
            <option value="">Select Visa Type</option>
            <option value="Tourist">Tourist Visa</option>
            <option value="Student">Student Visa</option>
            <option value="Official">Official Visa</option>
            <option value="Business">Business Visa</option>
            <option value="Work">Work Visa</option>
          </select>
        </div>

        {/* Processing Time */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="processingTime"
            className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} w-1/4`}
          >
            Processing Time
          </label>
          <input
            type="text"
            id="processingTime"
            name="processingTime"
            className="mt-1 p-2 w-3/4 border rounded"
            placeholder="Processing time in days/weeks"
            required
          />
        </div>

        {/* Required Documents */}
        <div className="mb-4 flex items-start">
          <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} w-1/4`}>
            Required Documents
          </label>
          <div className="space-y-2 w-3/4 grid grid-cols-2 gap-2">
            {[
              "Valid passport",
              "Visa application form",
              "Recent passport-sized photograph",
              "Proof of financial support",
              "Invitation letter",
              "Proof of travel insurance",
              "Flight itinerary",
              "Hotel booking confirmation",
              "Medical certificate",
              "Employment letter",
            ].map((doc, idx) => (
              <label
                key={idx}
                className={`flex items-center p-2 border rounded hover:bg-gray-100 ${darkMode ? 'bg-gray-700 text-white' : ''}`}
              >
                <input
                  type="checkbox"
                  name="requiredDocuments"
                  value={doc}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">{doc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Other Fields */}
        {[
          { label: "Description", name: "description", type: "textarea" },
          { label: "Age Restriction", name: "ageRestriction", type: "text" },
          { label: "Fee", name: "fee", type: "number" },
          { label: "Validity", name: "validity", type: "text" },
          { label: "Application Method", name: "applicationMethod", type: "text" },
        ].map(({ label, name, type }, idx) => (
          <div className="mb-4 flex items-center" key={idx}>
            <label
              htmlFor={name}
              className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} w-1/4`}
            >
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                className="mt-1 p-2 w-3/4 border rounded"
                rows="4"
                required
              ></textarea>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                className="mt-1 p-2 w-3/4 border rounded"
                required
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisaPage;
