import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../general/LoadingSpinner";

const RegisterForm = () => {
  const { handleSignUp, handleSignOut } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinimumLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !hasMinimumLength) {
      return "Password must contain at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordError = validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    setError("");
    setLoading(true)
    handleSignUp(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //(user);
        toast.success("Registration successful! Please Login Now");
        handleSignOut()
        navigate('/login')
      })
      .catch((error) => {
        console.error(error.code, error.message);
        toast.error("Registration failed. Please try again.");
      })
      .finally(()=>{
        setLoading(false)
      })
  };

  if(loading){
    return (
      <LoadingSpinner></LoadingSpinner>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 my-5">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-600 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a link to your profile photo"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a strong password"
              required
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
