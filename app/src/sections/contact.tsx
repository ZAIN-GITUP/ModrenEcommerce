"use client";
import React from "react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <motion.div
      className="max-w-[700px] mx-auto my-[4rem] flex flex-col gap-4 items-center justify-center px-4"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <h2 className="text-var(--text-color) font-raleway text-[var(--light-slate)] text-center text-xl md:text-2xl lg:text-3xl">
        Get In Touch
      </h2>

      {/* Contact Form Section */}
      <div className="mt-4 w-full">
        <form action="#" className="w-full flex flex-col items-center">
          <div className="flex flex-col gap-4 w-full mb-4">
            <input
              type="text"
              placeholder="Username"
              className="flex-1 p-4 text-var(--text-color) border border-[var(--light-slate)] rounded bg-[var(--second-bg-color)] text-[var(--lightest-slate)]"
            />
            <input
              type="email"
              placeholder="E-mail Address"
              className="flex-1 p-4 text-var(--text-color) border border-[var(--light-slate)] rounded bg-[var(--second-bg-color)] text-[var(--lightest-slate)]"
            />
          </div>
          <div className="flex flex-col gap-4 w-full mb-4">
            <input
              type="number"
              placeholder="Mobile Number"
              className="flex-1 p-4 text-var(--text-color) border border-[var(--light-slate)] rounded bg-[var(--second-bg-color)] text-[var(--lightest-slate)]"
            />
            <input
              type="text"
              placeholder="Email Subject"
              className="flex-1 p-4 text-var(--text-color) border border-[var(--light-slate)] rounded bg-[var(--second-bg-color)] text-[var(--lightest-slate)]"
            />
          </div>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            placeholder="Your Message"
            className="w-full p-4 text-var(--text-color) border border-[var(--light-slate)] rounded bg-[var(--second-bg-color)] text-[var(--lightest-slate)] resize-none mb-4"
          ></textarea>
          <button
            type="submit"
            className="px-8 py-4 bg-[var(--theme-color)] text-black border border-[var(--light-slate)] rounded cursor-pointer transition-colors duration-300 ease-in-out mt-4 hover:bg-[var(--light-slate)]"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
