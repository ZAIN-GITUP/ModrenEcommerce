import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold  mb-4">Elpha</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={24} />
              </Link>
              <Link href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-between space-y-0 md:space-y-0 md:space-x-12">
            <div className="space-y-4 mx-2 text-center md:text-left">
              <h3 className="text-lg font-bold">Shop</h3>
    
              <ul className="list-none space-y-2">
                <li>
                  <Link href="/">Products</Link>
                </li>
                <li>
                  <Link href="/">Overview</Link>
                </li>
                <li>
                  <Link href="/">Pricing</Link>
                </li>
                <li>
                  <Link href="/">Releases</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 mx-8 mb-20 text-center md:text-left">
              <h3 className="text-lg font-bold">Company</h3>
              <ul className="list-none space-y-2">
                <li>
                  <Link href="/">About Us</Link>
                </li>
                <li>
                  <Link href="/">Contact</Link>
                </li>
                <li>
                  <Link href="/">News</Link>
                </li>
                <li>
                  <Link href="/">Support</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 justify-center text-center text-sm">
          <p>© {new Date().getFullYear()} Elpha. All rights reserved.</p>
          <ul className="list-none flex justify-center space-x-4 mt-4">
            <li>
              <Link href="/">Terms</Link>
            </li>
            <li>
              <Link href="/">Privacy</Link>
            </li>
            <li>
              <Link href="/">Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
