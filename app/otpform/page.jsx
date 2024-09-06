"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import otpimg from '@/public/sign.png';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { clearVerifyCode } from '@/app/src/lib/features/slices/userslice';

const OTPForm = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [otpValid, setOtpValid] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const dummyOTP = useSelector((state) => state.user.verifycode);
  
  console.log('Retrieved verifycode from Redux:', dummyOTP);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputs.current[index + 1].focus();
    }

    setError('');
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 0) {
      setError('OTP is required');
    } else if (enteredOTP.length !== 6) {
      setError('OTP must be exactly 6 digits');
    } else if (enteredOTP !== dummyOTP) {
      setError('Invalid OTP');
    } else {
      setError('');
      setOtpValid(true);

      // Clear verifycode from Redux after successful OTP validation
      dispatch(clearVerifyCode());
      console.log('verifycode cleared from Redux');
    }
  };

  if (otpValid) {
    router.push('/login');
  }

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 mb-16 max-w-sm">
        <Image src={otpimg} alt="Sample image" />
      </div>
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-gray-950 w-full font-bold h-6 mb-12 align-center" style={{ fontFamily: 'Manrope', fontSize: '32px', fontWeight: 800, lineHeight: '49.18px', textAlign: 'center' }}>Enter OTP</h2>
        <div className="flex justify-center space-x-2 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              ref={(el) => (inputs.current[index] = el)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
