"use client";

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa"; // Add this import for the cart icon
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/app/src/componenets/Button";
import Image from "next/image";

import logo from '@/public/logo.png'
function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);

  const sectionLinks = [
    { name: "Home", link: "/#Home" },
    { name: "Shop", link: "/#Shop" },
    { name: "Feature", link: "/#Features" },
    { name: "Contact", link: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setNavbarVisible(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleLinkClick = () => setResponsiveNavVisible(false);
    const links = document.querySelectorAll(".nav-items-list-item-link");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    const nav = document.querySelector(".nav-items");
    nav?.addEventListener("click", (e) => e.stopPropagation());

    const html = document.querySelector("html");
    html?.addEventListener("click", () => setResponsiveNavVisible(false));

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      html?.removeEventListener("click", () => setResponsiveNavVisible(false));
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (responsiveNavVisible) {
      main?.classList.add("blur");
    } else {
      main?.classList.remove("blur");
    }
  }, [responsiveNavVisible]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        navbarVisible ? "bg-green-100 shadow-lg" : "bg-transparent"
      } transition-all duration-300 ease-in-out`}
      data-aos="fade-down"
    >
      <div className="relative flex items-center justify-between py-4 px-6">
        <motion.div
          className="text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ color: "var(--dark-green)" }}
        >
              <Image
            src={logo}
            alt="Logo"
            width={200}
            height={50}
            className="w-auto h-12 sm:h-16 object-cover rounded-lg"
          />

        </motion.div>

        <div className="flex-1 flex justify-center md:justify-start">
          <div
            className={`${
              responsiveNavVisible
                ? "fixed top-16 p-4 right-0 w-2/4 max-w-sm h-full bg-[var(--light-green)]"
                : "hidden"
            } md:flex md:justify-center md:w-full md:top-0 md:right-0 md:relative md:h-auto`}
          >
            <ul className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-6">
              {sectionLinks.map(({ name, link }, index) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, y: -25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  <Link
                    href={link}
                    className="nav-items-list-item-link"
                    style={{ color: "var(--dark-green)" }}
                  >
                    {name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          <motion.div
            className="hidden md:flex text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ color: "var(--dark-green)" }}
          >
            <Link href="/cart" className="text-2xl">
              <FaShoppingCart />
            </Link>
            
            <Button text="LOGIN" link="/Login" />
          </motion.div>

          <motion.div
            className="hidden md:flex"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
          </motion.div>

          
          <motion.div
            className="md:hidden flex items-center space-x-8"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ color: "var(--dark-green)" }}
          >
            <Link href="/cart" className="text-2xl  mx-6">
              <FaShoppingCart />
            </Link>
          
            
          </motion.div>

          <motion.div
            className="md:hidden text-2xl"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {responsiveNavVisible ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setResponsiveNavVisible(false);
                }}
                className="top-6 border-none"
              >
                <CgClose />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setResponsiveNavVisible(true);
                }}
                className="absolute top-6 right-6 text-var(--dark-green) bg-transparent border-none"
              >
                <GiHamburgerMenu />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
