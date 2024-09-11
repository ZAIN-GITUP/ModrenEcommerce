"use client";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import passwordimage from '@/public/login.png';

const ResetPasswordForms = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Function to validate inputs
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(password)) {
      newErrors.password = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate inputs on submit and set errors
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form is valid, proceed with submission logic (e.g., API call)
    alert('Password successfully reset!');
    // Redirect to login page
    router.push('/login');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="h-screen bg-[var(--light-green)]  flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      {/* Hide image on screens smaller than 478px */}
      <div className="hidden md:block md:w-1/3 max-w-xs">
        <Image src={passwordimage} alt="Reset password illustration" />
      </div>
      <form className="bg-[var(--light-green)]  p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-[var(--dark-green)]  w-full font-bold h-6 mb-12 text-center" style={{ fontFamily: 'Manrope', fontSize: '32px', fontWeight: 800, lineHeight: '49.18px' }}>
          Reset Password
        </h2>

        <div className="mb-4 relative">
          <input
            className={`text-sm w-full  text-[var(--dark-green)]  px-4 py-2 bg-[var(--inputs)]  mb-0 border-b ${errors.password ? 'border-[var(--dark-green)] ' : 'border-[var(--dark-green)]  '}`}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute  text-[var(--dark-green)]  opacity-45 inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-[var(--dark-green)]  text-xs -mt-3">{errors.password}</p>}

        <div className="mb-4 relative">
          <input
            className={`text-sm  text-[var(--dark-green)] bg-[var(--inputs)]  w-full px-4 py-2 border-b border-[var(--dark-green)]  ${errors.confirmPassword ? 'border-[var(--dark-green)] ' : 'border-[var(--dark-green)] '}`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute opacity-45  text-[var(--dark-green)]  inset-y-0 right-0 flex items-center pr-3"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-[var(--dark-green)]  text-xs -mt-4 mb-6">{errors.confirmPassword}</p>}

        <button
          type="submit"
          className="w-full bg-[var(--text-green)] text-black p-2 rounded  hover:text-[var(--dark-green)] hover:bg-[var(--hover-green)]  focus:outline-none focus:ring-2 focus:ring-[var(--dark-green)] "
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForms;
