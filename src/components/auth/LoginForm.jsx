import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../general/LoadingSpinner";

const LoginForm = () => {
  const { handleLogIn, handleGoogleLogIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false)



  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    setLoading(true);  // Set loading state to true before attempting login
    handleLogIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
        form.reset();  // Reset form on successful login
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);  // Set the error message
      })
      .finally(() => {
        setLoading(false);  // Set loading state to false once the process is done
      });
  };
  

  const googleButton = () => {
    setLoading(true);
    handleGoogleLogIn()
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);  // Handle error if Google login fails
      })
      .finally(() => {
        setLoading(false);  // Reset loading state
      });
  };
  


  if(loading){
    return (
      <LoadingSpinner></LoadingSpinner>
    )
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 my-5">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-sm text-right text-blue-500 hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition mt-4"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm">
            New user?{" "}
            <Link
              to="/register"
              className="text-indigo-500 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
          <button
            onClick={googleButton}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
