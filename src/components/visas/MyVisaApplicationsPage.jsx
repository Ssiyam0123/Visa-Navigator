import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpinner from "../general/LoadingSpinner";
import debounce from "lodash.debounce";

const MyVisaApplicationsPage = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(
      `https://assignment-10-server-swart-nine.vercel.app/applications/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setFilteredApplications(data); // Initialize with all applications
      })
      .catch((error) => console.error("Error fetching applications:", error))
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const filtered = applications.filter((app) =>
        app.visa.countryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    }, 300),
    [applications]
  );

  // Update search term and trigger debounced search
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    debouncedSearch(searchTerm); // Debounced filtering
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-server-swart-nine.vercel.app/applications/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your application has been canceled.", "success");
              const remaining = applications.filter((app) => app._id !== id);
              setApplications(remaining);
              setFilteredApplications(remaining);
            }
          })
          .catch((error) => {
            console.error("Error canceling application:", error);
            Swal.fire("Error!", "Failed to delete the application. Please try again.", "error");
          });
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        My Visa Applications
      </h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search by country name"
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {filteredApplications.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">No visa applications found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 space-y-4"
            >
              {/* Visa Image */}
              <div className="relative w-full h-48 overflow-hidden rounded-md">
                <img
                  src={app.visa.countryImage}
                  alt={app.visa.country}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* Badge */}
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {app.visa.visaType}
                </span>
              </div>

              {/* Visa Details */}
              <h2 className="text-2xl font-semibold text-gray-800">{app.country}</h2>
              <div className="text-sm space-y-2">
                <p className="text-gray-600">
                  <strong>Country:</strong> {app.visa.countryName}
                </p>
                <p className="text-gray-600">
                  <strong>Processing Time:</strong> {app.visa.processingTime}
                </p>
                <p className="text-gray-600">
                  <strong>Fee:</strong> ${app.visa.fee}
                </p>
                <p className="text-gray-600">
                  <strong>Validity:</strong> {app.visa.validity}
                </p>
                <p className="text-gray-600">
                  <strong>Application Method:</strong> {app.visa.applicationMethod}
                </p>
                <p className="text-gray-600">
                  <strong>Applied Date:</strong> {app.appliedDate}
                </p>
                <p className="text-gray-600">
                  <strong>Applicant:</strong> {`${app.firstName} ${app.lastName}`}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {app.email}
                </p>
              </div>

              {/* Delete Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(app._id)}
                  className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg transition-all duration-300"
                >
                  Cancel Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVisaApplicationsPage;
