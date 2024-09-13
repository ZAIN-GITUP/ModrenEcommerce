"use client"
import React, { useEffect, useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/app/src/componenets/Button";
import Image from "next/image";
import logo from '@/public/logo.png';
import { useSelector } from 'react-redux'; 
type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

function Navbar() {
  const [state, setState] = useState({
    navbarVisible: false,
    responsiveNavVisible: false,
    cartVisible: false,
  });

  const cartPopupRef = useRef<HTMLDivElement>(null); // Ref for CartPopup
  const router = useRouter();
  const pathname = usePathname();

  const cartItems = useSelector((state: any) => state.cart); // Get cart items from Redux store

  const sectionLinks = [
    { name: "Home", link: "/#Home" },
    { name: "Shop", link: "/#Shop" },
    { name: "Feature", link: "/#Features" },
    { name: "Contact", link: "/#contact" },
  ];

  useEffect(() => {
    if (pathname === "/cart") {
      setState((prevState) => ({
        ...prevState,
        cartVisible: false,
      }));
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setState((prevState) => ({
        ...prevState,
        navbarVisible: window.pageYOffset > 100,
      }));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartPopupRef.current && !cartPopupRef.current.contains(e.target as Node)) {
        setState((prevState) => ({
          ...prevState,
          cartVisible: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCartNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      cartVisible: false,
    }));
    setTimeout(() => {
      router.push("/cart");
    }, 300);
  };

 

  const CartPopup = () => {
    const cartItems: CartItem[] = useSelector((state: any) => state.cart || []);

  
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };
  
    return (
      <div
        className={`fixed top-0 right-0 w-full sm:w-1/3 h-full bg-[var(--light-green)] shadow-lg transform ${
          state.cartVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-[var(--dark-green)] font-semibold">Shopping Cart</h2>
            <button
              className="text-xl font-semibold"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  cartVisible: false,
                }))
              }
            >
              &times;
            </button>
          </div>
  
          <div className="my-4">
            {cartItems.length > 0 ? (
              cartItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="p-1 border border-gray-400">-</button>
                        <span className="font-medium">{item.quantity}</span>
                        <button className="p-1 border border-gray-400">+</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="ml-2 text-red-500 text-xl">&times;</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No items in cart</div>
            )}
          </div>
  
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">${getTotalPrice()}</span>
            </div>
  
            <button
              onClick={handleCartNavigation}
              className="bg-[var(--text-green)] text-[var(--hover-green)] py-2 rounded w-full"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 ${
          state.navbarVisible ? "bg-green-100 shadow-lg" : "bg-transparent"
        } transition-all duration-300 ease-in-out`}
        data-aos="fade-down"
      >
        <div className="relative flex max-w-7xl mx-auto items-center justify-between py-4 px-6">
          <motion.div
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ color: "var(--dark-green)" }}
          >
            <Image
              src={logo}
              alt="logo"
              className="w-6 md:w-8 lg:w-10 xl:w-12 h-auto object-cover"
            />
          </motion.div>

          <div className="flex-1 flex justify-center md:justify-start">
            <div
              className={`${
                state.responsiveNavVisible
                  ? "fixed mt-8 p-4 right-0 block bg-[var(--light-green)]"
                  : "hidden"
              } md:flex md:justify-center md:w-full md:top-0 md:right-0 md:relative md:h-auto`}
            >
              <ul className="flex flex-col h-full items-center space-y-0 md:space-y-0 md:flex-row md:space-x-6">
                {sectionLinks.map(({ name, link }, index) => (
                  <motion.li
                    key={name}
                    className="w-full"
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
                      className="nav-items-list-item-link block text-center w-full py-2"
                      style={{ color: "var(--dark-green)" }}
                    >
                      {name}
                    </Link>
                  </motion.li>
                ))}

                <motion.div
                  className="md:hidden text-xl font-bold items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ color: "var(--dark-green)" }}
                >
                  <Button text="LOGIN" link="/login" />
                </motion.div>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[var(--dark-green)] ">
            <motion.div
              className="hidden md:flex text-xl font-bold items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ color: "var(--dark-green)" }}
            >
              <button
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    cartVisible: true,
                  }))
                }
                className="text-2xl"
              >
                <FaShoppingCart />
              </button>
              <Button text="LOGIN" link="/login" />
            </motion.div>

            <motion.div
              className="flex md:hidden items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    cartVisible: true,
                  }))
                }
                className="text-2xl"
              >
                <FaShoppingCart />
              </button>
              <button
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    responsiveNavVisible: !prevState.responsiveNavVisible,
                  }))
                }
                className="text-3xl"
              >
                {state.responsiveNavVisible ? <CgClose /> : <GiHamburgerMenu />}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Render CartPopup */}
      {state.cartVisible && <CartPopup />}
    </>
  );
}

export default Navbar;
