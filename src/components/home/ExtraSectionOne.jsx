import React, { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const ExtraSectionOne = () => {
  const {theme, setTheme} = useContext(ThemeContext)



  if(theme=='light'){
    return (
      <section className="py-12 rounded-xl bg-white text-gray-900">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-3xl font-semibold mb-6 text-primary">
            Why Choose Visa Navigator?
          </h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
            {/* Card 1 */}
            <div className="p-6  bg-white rounded-lg border-2 shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-primary">
                Fast Processing
              </h3>
              <p className="mt-2 text-gray-700">
                Get your visas processed in record time with our streamlined system.
              </p>
            </div>
    
            {/* Card 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md border-2 transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-primary">
                Global Reach
              </h3>
              <p className="mt-2 text-gray-700">
                Access visa information and applications for over 100 countries.
              </p>
            </div>
    
            {/* Card 3 */}
            <div className="p-6 border-2 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-primary">
                Secure & Reliable
              </h3>
              <p className="mt-2 text-gray-700">
                Trust our secure platform to handle your data with care.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
    
    
  }

  if(theme=='dark'){
    return (
      <section className="py-12 rounded-xl bg-gray-900 text-white">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-3xl font-semibold mb-6 text-secondary">
            Why Choose Visa Navigator?
          </h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
            {/* Card 1 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-secondary">
                Fast Processing
              </h3>
              <p className="mt-2 text-gray-300">
                Get your visas processed in record time with our streamlined system.
              </p>
            </div>
    
            {/* Card 2 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-secondary">
                Global Reach
              </h3>
              <p className="mt-2 text-gray-300">
                Access visa information and applications for over 100 countries.
              </p>
            </div>
    
            {/* Card 3 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-secondary">
                Secure & Reliable
              </h3>
              <p className="mt-2 text-gray-300">
                Trust our secure platform to handle your data with care.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
    
    
  }


  
};

export default ExtraSectionOne;
