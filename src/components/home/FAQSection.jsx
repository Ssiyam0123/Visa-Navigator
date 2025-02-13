import React, { useContext } from "react";
import FaqTheme from "../utilities/FaqTheme";
import { ThemeContext } from "../provider/ThemeProvider";



const FAQSection = () => {
  const { theme } = useContext(ThemeContext);

  if (theme === "light") {
    return (
      <div className="faq-section py-12 px-6 md:px-12 lg:px-24 text-gray-900">
        <h2 className="text-center text-4xl font-bold mb-8 text-primary">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-center text-4xl font-bold text-gray-900">
              You can reach out to us 24/7
            </h1>
            <FaqTheme />
          </div>
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Question 1 */}
            <div className="collapse collapse-arrow bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium text-gray-800 hover:text-primary">
                What is Visa Navigator?
              </div>
              <div className="collapse-content text-gray-600">
                <p>
                  Visa Navigator is a user-friendly platform designed to
                  simplify the process of understanding visa requirements,
                  applying for visas, and tracking applications.
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="collapse collapse-arrow bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-gray-800 hover:text-primary">
                How do I apply for a visa?
              </div>
              <div className="collapse-content text-gray-600">
                <p>
                  To apply for a visa, log in to your account, navigate to the
                  "Add Visa" section, fill in the required details, and submit
                  your application.
                </p>
              </div>
            </div>

            {/* Question 3 */}
            <div className="collapse collapse-arrow bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-gray-800 hover:text-primary">
                Is my data secure on this platform?
              </div>
              <div className="collapse-content text-gray-600">
                <p>
                  Yes, we use secure authentication methods and store your data
                  safely using advanced encryption technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (theme == "dark") {
    return (
      <div
        className="faq-section py-12 px-6 md:px-12 lg:px-24 bg-gray-800 rounded-2xl text-gray-100"
      >
        <h2 className="text-center text-4xl font-bold mb-8 text-secondary">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-center text-4xl font-bold text-gray-100">
              You can reach out to us 24/7
            </h1>
            <FaqTheme />
          </div>
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Question 1 */}
            <div className="collapse collapse-arrow bg-gray-900 border border-gray-600 rounded-lg shadow-md">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium text-gray-200 hover:text-secondary">
                What is Visa Navigator?
              </div>
              <div className="collapse-content text-gray-400">
                <p>
                  Visa Navigator is a user-friendly platform designed to
                  simplify the process of understanding visa requirements,
                  applying for visas, and tracking applications.
                </p>
              </div>
            </div>
  
            {/* Question 2 */}
            <div className="collapse collapse-arrow bg-gray-900 border border-gray-600 rounded-lg shadow-md">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-gray-200 hover:text-secondary">
                How do I apply for a visa?
              </div>
              <div className="collapse-content text-gray-400">
                <p>
                  To apply for a visa, log in to your account, navigate to the
                  "Add Visa" section, fill in the required details, and submit
                  your application.
                </p>
              </div>
            </div>
  
            {/* Question 3 */}
            <div className="collapse collapse-arrow bg-gray-900 border border-gray-600 rounded-lg shadow-md">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-gray-200 hover:text-secondary">
                Is my data secure on this platform?
              </div>
              <div className="collapse-content text-gray-400">
                <p>
                  Yes, we use secure authentication methods and store your data
                  safely using advanced encryption technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
};

export default FAQSection;
