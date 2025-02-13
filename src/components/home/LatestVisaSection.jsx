import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../general/LoadingSpinner";
import { ThemeContext } from "../provider/ThemeProvider";

const LatestVisaSection = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext)

  useEffect(() => {
    setLoading(true);
    fetch("https://assignment-10-server-swart-nine.vercel.app/visas")
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }


  if(theme=='light'){
    return (
      <section className="my-12 px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold text-center text-darkBg mb-8">
          Latest Visas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="bg-lightBg rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <figure>
                <img
                  src={visa.countryImage}
                  alt={`Image of ${visa.countryName}`}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-darkBg mb-2">
                  {visa.countryName}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Visa Type:</span>{" "}
                  {visa.visaType || "Tourist"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Processing Time:</span>{" "}
                  {visa.processingTime || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Fee:</span> ${visa.fee || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Validity:</span>{" "}
                  {visa.validity || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Application Method:</span>{" "}
                  {visa.applicationMethod || "N/A"}
                </p>
                <Link
                  to={`/visas/${visa._id}`}
                  className="mt-4 inline-block bg-primary text-lightBg font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-secondary transition-colors"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/all-visas"
            className="btn bg-secondary text-white font-bold py-3 border-none px-6 rounded-lg shadow-lg hover:bg-primary transition-colors"
          >
            See All Visas
          </Link>
        </div>
      </section>
    );
    
  }

  if(theme=='dark'){
    return (
      <section className="my-12 px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold text-center text-lightBg mb-8">
          Latest Visas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="bg-darkBg dark:bg-darkBg rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <figure>
                <img
                  src={visa.countryImage}
                  alt={`Image of ${visa.countryName}`}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-lightBg mb-2">
                  {visa.countryName}
                </h3>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Visa Type:</span>{" "}
                  {visa.visaType || "Tourist"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Processing Time:</span>{" "}
                  {visa.processingTime || "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Fee:</span> ${visa.fee || "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Validity:</span>{" "}
                  {visa.validity || "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Application Method:</span>{" "}
                  {visa.applicationMethod || "N/A"}
                </p>
                <Link
                  to={`/visas/${visa._id}`}
                  className="mt-4 inline-block bg-primary text-lightBg font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-secondary transition-colors"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/all-visas"
            className="btn bg-secondary text-white font-bold py-3 border-none px-6 rounded-lg shadow-lg hover:bg-primary transition-colors"
          >
            See All Visas
          </Link>
        </div>
      </section>
    );
    
  }

 
};

export default LatestVisaSection;
