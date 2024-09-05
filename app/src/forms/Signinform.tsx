//@ts-nocheck
"use client";
import { useState } from "react";
import Image from 'next/image';
//import signinimg from '../../assets/sign.png';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { storeUser,storeverifycode } from "../lib/features/slices/userslice";
import axios from 'axios';

const SignupForm = () => {
  const initialData = { username: "", email: "", password: "" };
  const [inputdata, setInputdata] = useState(initialData);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!inputdata.username) {
      newErrors.username = 'Username is required';
    }
    if (!inputdata.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(inputdata.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!inputdata.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(inputdata.password)) {
      newErrors.password = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (inputdata.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (!isChecked) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleValidation = () => {
    const newErrors = validate();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const response = await axios.post(
          'https://management-system-backend-0wae.onrender.com/signup/mongo/',
          inputdata
        );
  
        // Accessing the verifyCode from the response
        const verifycode = response.data.verifyCode;
        
        // Ensure verifyCode is defined before dispatching
        if (verifycode) {
          dispatch(storeverifycode(verifycode));
          console.log('verifycode stored in Redux:');
        } else {
          console.error('verifycode is undefined in the response');
        }
  
        alert('Sign up successful!');
        router.push('');
      } catch (error) {
        console.error('Error during sign up:', error);
        alert('Sign up failed. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputdata({
      ...inputdata,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 mb-16 max-w-sm">
        <Image src={signimg} alt="Sample image" width={500} height={500} />
      </div>
      <form className="md:w-1/3 max-w-xs" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-gray-950 w-full font-bold h-4" style={{ fontFamily: 'Manrope', fontSize: '22px', fontWeight: 800, lineHeight: '49.18px', textAlign: 'left' }}>Welcome </h2>
          <p className="text-gray-900 w-full mb-4 mt-6" style={{ fontFamily: 'Space Grotesk', fontWeight: 400, fontSize: '18px', lineHeight: '25.52px' }}>Welcome! Please enter your details.</p>
        </div>
        <div className="mb-1">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            placeholder="Username"
            name="username"
            value={inputdata.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div className="mb-1">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            placeholder="Email Address"
            name="email"
            value={inputdata.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-1 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={inputdata.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute opacity-45 inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="mb-1 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute opacity-45 inset-y-0 right-0 flex items-center pr-3"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input
              className="mr-1"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span>I agree to the terms & conditions</span>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-black hover:bg-gray-700 w-full h-10 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-center">
          Already have an account?{" "}
          <a className="text-red-600 hover:underline hover:underline-offset-4" href="/login">
            Login
          </a>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
