import React from "react";
import map from "../../assets/World Map.svg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="relative hero bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${map})`,
      }}
    >
      {/* Overlay for Opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative hero-content flex-col lg:flex-row-reverse p-6 md:p-12 z-10">
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-bold">Your Gateway to the World</h1>
          <p className="py-6">
            Simplify your travel planning with Visa Navigator. Check visa
            requirements, apply online, and track applications seamlessly.
          </p>
          <Link to="/all-visas" className="btn btn-primary">
            Explore Visas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
