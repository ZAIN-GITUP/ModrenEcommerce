"use client";
import { useState } from "react";
import Image from 'next/image';
import signinimg from '@/public/sign.png';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { storeverifycode } from "@/app/src/lib/features/slices/userslice";
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isChecked: boolean;
}

const SignupForm = () => {
  const initialData: FormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    isChecked: false,
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (!formData.isChecked) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleValidation = () => {
    const newErrors = validate();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const response = await axios.post(
          'https://management-system-backend-0wae.onrender.com/signup/mongo/',
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        const verifyCode = (response.data as { verifyCode: string }).verifyCode;

        if (verifyCode) {
          dispatch(storeverifycode(verifyCode));
        }

        alert('Sign up successful!');
        router.push('/otpform');
      } catch (error) {
        console.error('Error during sign up:', error);
        alert('Sign up failed. Please try again.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const toggleConfirmPasswordVisibility = () => {
    setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword });
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="hidden md:block md:w-1/3 mb-16 max-w-sm">
        <Image src={signinimg} alt="Sample image" width={500} height={500} />
      </div>
      <form className="md:w-1/3 max-w-xs p-4 bg-white border border-gray-300 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-text-color font-bold text-2xl mb-2">Welcome</h2>
          <p className="text-text-color mb-4 text-lg">Welcome! Please enter your details.</p>
        </div>
        <div className="mb-2">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.username ? 'border-error-color' : 'border-border-color'}`}
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="text-error-color text-xs mt-1">{errors.username}</p>}
        </div>
        <div className="mb-2">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.email ? 'border-error-color' : 'border-border-color'}`}
            type="text"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-error-color text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-2 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.password ? 'border-error-color' : 'border-border-color'}`}
            type={formData.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-error-color text-xs mt-1">{errors.password}</p>}
        <div className="mb-2 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b border-solid ${errors.confirmPassword ? 'border-error-color' : 'border-border-color'}`}
            type={formData.showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
            onClick={toggleConfirmPasswordVisibility}
          >
            {formData.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-error-color text-xs mt-1">{errors.confirmPassword}</p>}
        <div className="mt-4 flex items-center text-sm">
          <input
            className="mr-2"
            type="checkbox"
            name="isChecked"
            checked={formData.isChecked}
            onChange={handleInputChange}
          />
          <label className="text-text-color">I agree to the terms & conditions</label>
        </div>
        {errors.terms && <p className="text-error-color text-xs mt-1">{errors.terms}</p>}
        <div className="text-center mt-4">
          <button
            className="bg-primary-color hover:bg-hover-color text-white w-full h-10 px-4 py-2 rounded text-sm uppercase"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-text-color">
          Already have an account?{" "}
          <a className="text-secondary-color hover:underline" href="#">
            Sign in
          </a>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
