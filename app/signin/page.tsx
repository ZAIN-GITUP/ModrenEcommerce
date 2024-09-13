"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from 'next/image';
import signinimg from '@/public/sign.png';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { storeverifycode } from "@/app/src/lib/features/slices/userslice";
import axios from 'axios';

const SignupForm = () => {
  const initialData = { username: "", email: "", password: "" };
  const [inputdata, setInputdata] = useState<typeof initialData>(initialData);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    const newErrors: Record<string, string> = {};
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const response = await axios.post(
          '',
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
        router.push('/otpform');
      } catch (error) {
        console.error('Error during sign up:', error);
        alert('Sign up failed. Please try again.');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <section className="h-screen  bg-[var(--light-green)] flex flex-col md:flex-row justify-center space-y-10 md:space-y-4 md:space-x-16 items-center  md:mx-0 md:my-0">
      <div className="md:w-1/3 mb-0 max-w-sm hidden md:block  boder  border-1 border-rounded-lg">
        <Image src={signinimg} alt="Sample image" width={300} height={300} />
      </div>
      <form className="md:w-1/3 max-w-xs" onSubmit={handleSubmit}>
        <div>
   
          <p className="text-[var(--dark-green)] w-full mb-4 mt-6" style={{ fontFamily: 'Space Grotesk', fontWeight: 400, fontSize: '18px', lineHeight: '25.52px' }}>Welcome! Please enter your details.</p>
        </div>
        <div className="mb-1">
          <input
            className={`text-sm w-full px-4 py-2 border-b text-[var(--dark-green)]  bg-[var(--inputs)]  ${errors.username ? 'border-[var(--text-green)] ' : 'border-[var(--text-green)] '}`}
            type="text"
            placeholder="Username"
            name="username"
            value={inputdata.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="text-[var(--text-green)]  text-xs mt-1">{errors.username}</p>}
        </div>
        <div className="mb-1">
          <input
            className={`text-sm w-full px-4 py-2 border-b text-[var(--dark-green)] bg-[var(--inputs)]   ${errors.email ? 'border-[var(--text-green)] ' : 'border-[var(--text-green)] '}`}
            type="text"
            placeholder="Email Address"
            name="email"
            value={inputdata.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-[var(--text-green)]  text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-1 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b text-[var(--dark-green)]   bg-[var(--inputs)]  ${errors.password ? 'border-[var(--text-green)] ' : 'border-[var(--text-green)] '}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={inputdata.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute opacity-45 inset-y-0 right-0 flex items-center pr-3 text-[var(--dark-green)] "
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          {errors.password && <p className="text-[var(--text-green)]  text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="mb-1 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b text-[var(--dark-green)]   bg-[var(--inputs)]  ${errors.confirmPassword ? 'border-[var(--text-green)]  text-[var(--text-green)] ' : 'border-[var(--text-green)] '}`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute opacity-45 inset-y-0 right-0 flex items-center pr-3 text-[var(--dark-green)] "
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          {errors.confirmPassword && <p className="text-[var(--text-green)]  text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <div className="mt-4 mx-1 flex justify-between font-semibold text-sm">
          <label className="flex text-[var(--dark-green)]  hover:text-[var(--text-green)]  cursor-pointer">
            <input
              className="mr-1"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span>I agree to the terms & conditions</span>
          </label>
        </div>
        {errors.terms && <p className="text-[var(--text-green)]  text-xs mt-1">{errors.terms}</p>}
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-[var(--text-green)] hover:bg-[var(--hover-green)]  hover:text-[var(--dark-green)]  w-full h-10  mx-1 px-4 py-2 text-black  uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-[var(--dark-green)]  text-center md:text-center">
          Already have an account?{" "}
          <a className="text-[var(--text-green)] hover:underline hover:underline-offset-4" href="/login">
            Login
          </a>
        </div>

      </form>
    </section>
  );
};

export default SignupForm;
