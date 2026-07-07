import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../general/LoadingSpinner";
import { ThemeContext } from "../provider/ThemeProvider";

const AllVisasPage = () => {
  const { theme } = useContext(ThemeContext);
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [selectedVisaType, setSelectedVisaType] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/allVisas`)
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setFilteredVisas(data);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setSelectedVisaType(selectedType);

    if (selectedType === "All") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter((visa) => visa.visaType === selectedType);
      setFilteredVisas(filtered);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (theme == "light") {
    return (
      <section className="my-12">
        {/* Hero Section */}
        <div
          className="relative bg-heroImage bg-cover bg-center py-16 text-center bg-gray-100 text-gray-900"
          style={{ backgroundColor: "#F1F5F9" }}
        >
          <h1 className="text-5xl font-bold">Explore All Visas</h1>
          <p className="text-lg mt-4">
            Find the perfect visa option for your travel, work, or study needs!
          </p>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-6 my-8 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            All Visa Options
          </h2>
          <select
            className="select select-bordered w-full max-w-xs bg-white text-gray-800 border-2"
            value={selectedVisaType}
            onChange={handleFilterChange}
          >
            <option value="All">All Visa Types</option>
            <option value="Tourist">Tourist</option>
            <option value="Work">Work</option>
            <option value="Student">Student</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Visa Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {filteredVisas.map((visa) => (
            <div
              key={visa._id}
              className="border-none rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 bg-white text-gray-900 border-gray-300"
            >
              {/* Image */}
              <figure className="relative">
                <img
                  src={visa.countryImage}
                  alt={visa.countryName}
                  className="w-full h-48 object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <p className="text-lg font-semibold text-white">
                    {visa.countryName}
                  </p>
                </div>
              </figure>

              {/* Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {visa.countryName}
                </h3>
                <p>
                  <strong>Visa Type:</strong>{" "}
                  <span className="text-teal-500">
                    {visa.visaType || "Tourist"}
                  </span>
                </p>
                <p>
                  <strong>Processing Time:</strong>{" "}
                  {visa.processingTime || "N/A"}
                </p>
                <p>
                  <strong>Fee:</strong>{" "}
                  <span className="text-red-500">${visa.fee || "N/A"}</span>
                </p>
                <p>
                  <strong>Validity:</strong> {visa.validity || "N/A"}
                </p>
                <p>
                  <strong>Application Method:</strong>{" "}
                  {visa.applicationMethod || "N/A"}
                </p>

                {/* Details Button */}
                <Link
                  to={`/visas/${visa._id}`}
                  className="block text-center py-2 px-4 rounded-lg shadow-md transition-colors bg-blue-600 text-white"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    );
  }

  if (theme == "dark") {
    return (
      <section className="my-12">
        {/* Hero Section */}
        <div
          className="relative bg-heroImage bg-cover bg-center py-16 text-center bg-gray-800 text-white"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          <h1 className="text-5xl font-bold">Explore All Visas</h1>
          <p className="text-lg mt-4">
            Find the perfect visa option for your travel, work, or study needs!
          </p>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-6 my-8 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-[#007BFF]">
            All Visa Options
          </h2>
          <select
            className="select border-none select-bordered w-full max-w-xs bg-gray-700 text-white border-blue-500"
            value={selectedVisaType}
            onChange={handleFilterChange}
          >
            <option value="All">All Visa Types</option>
            <option value="Tourist">Tourist</option>
            <option value="Work">Work</option>
            <option value="Student">Student</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Visa Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {filteredVisas.map((visa) => (
            <div
              key={visa._id}
              className="border-none rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 bg-gray-800 text-white border-teal-500"
            >
              {/* Image */}
              <figure className="relative">
                <img
                  src={visa.countryImage}
                  alt={visa.countryName}
                  className="w-full h-48 object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <p className="text-lg font-semibold text-white">
                    {visa.countryName}
                  </p>
                </div>
              </figure>

              {/* Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-blue-400">
                  {visa.countryName}
                </h3>
                <p>
                  <strong>Visa Type:</strong>{" "}
                  <span className="text-teal-500">
                    {visa.visaType || "Tourist"}
                  </span>
                </p>
                <p>
                  <strong>Processing Time:</strong>{" "}
                  {visa.processingTime || "N/A"}
                </p>
                <p>
                  <strong>Fee:</strong>{" "}
                  <span className="text-red-500">${visa.fee || "N/A"}</span>
                </p>
                <p>
                  <strong>Validity:</strong> {visa.validity || "N/A"}
                </p>
                <p>
                  <strong>Application Method:</strong>{" "}
                  {visa.applicationMethod || "N/A"}
                </p>

                {/* Details Button */}
                <Link
                  to={`/visas/${visa._id}`}
                  className="block text-center py-2 px-4 rounded-lg shadow-md transition-colors bg-blue-600 text-white"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
};

export default AllVisasPage;
