import React, { useContext } from "react";
import { Link } from "react-router-dom";

import LatestVisaSection from "./LatestVisaSection";
import ExtraSectionOne from "./ExtraSectionOne";
import ReadyToStart from "../general/ReadyToStart";
import ImageSlider from "../general/ImageSlider";
import ExtraSectionTwo from "./ExtraSectionTwo";
import FAQSection from "./FAQSection";
import { ThemeContext } from "../provider/ThemeProvider";

const HomePage = () => {



  const { theme, setTheme } = useContext(ThemeContext);


  console.log(theme)
  if(theme == 'light'){
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 bg-fixed text-gray-800">
        <section className="w-11/12 mx-auto">
          <ImageSlider />
        </section>
    
        {/* Latest Visas Section */}
        <section className="w-11/12 mx-auto">
          <LatestVisaSection />
        </section>
    
        {/* Extra Sections */}
        <section className="w-11/12 mx-auto rounded-3xl">
          <ExtraSectionOne />
          <ExtraSectionTwo />
          <FAQSection />
        </section>
    
        {/* Call to Action */}
        <section className="py-12">
          <div className="text-center">
            <p className="sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 mx-auto">
              <ReadyToStart />
            </p>
    
            <Link
              to="/add-visa"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Add Your Visa
            </Link>
          </div>
        </section>
      </div>
    );
    
    

    

  }

  if(theme=='dark'){
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-fixed text-white">
        <section className="w-11/12 mx-auto">
          <ImageSlider />
        </section>
    
        {/* Latest Visas Section */}
        <section className="w-11/12 mx-auto">
          <LatestVisaSection />
        </section>
    
        {/* Extra Sections */}
        <section className="w-11/12 mx-auto rounded-3xl">
          <ExtraSectionOne />
          <ExtraSectionTwo />
          <FAQSection />
        </section>
    
        {/* Call to Action */}
        <section className="py-12">
          <div className="text-center">
            <p className="sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 mx-auto">
              <ReadyToStart />
            </p>
    
            <Link
              to="/add-visa"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              Add Your Visa
            </Link>
          </div>
        </section>
      </div>
    );
    
    
  }

};

export default HomePage;
