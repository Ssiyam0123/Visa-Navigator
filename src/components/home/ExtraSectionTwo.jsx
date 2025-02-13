import React, { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { ThemeContext } from "../provider/ThemeProvider";

const ExtraSectionTwo = () => {
  const {theme} = useContext(ThemeContext)
  const stats = [
    { number: 1000, label: "Visas Processed", icon: "🌍" },
    { number: 50, label: "Countries Served", icon: "🏳️" },
    { number: 5000, label: "Happy Clients", icon: "😊" },
  ];

  if(theme=='light'){
    return (
      <section className="py-12 px-6 md:px-12 lg:px-24  text-gray-900">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Our Success in Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <Fade key={index} delay={index * 100}>
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
                <div className="text-5xl text-primary mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stat.number}+
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>
    );
    
  }

  if(theme=="dark"){
    return (
      <section className="py-12 px-6 md:px-12 lg:px-24  text-gray-100">
        <h2 className="text-4xl font-bold text-center text-secondary mb-8">
          Our Success in Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <Fade key={index} delay={index * 100}>
              <div className="bg-gray-900 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
                <div className="text-5xl text-secondary mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-100">
                  {stat.number}+
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>
    );
    
  }

};

export default ExtraSectionTwo;
