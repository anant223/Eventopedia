import React from 'react'
import {Container, Logo} from '../index.js'
import { Instagram, TwitterIcon, X, XIcon, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" py-12 text-white bg-gray-950">
      <Container>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Logo/>
            <p className="text-gray-400 text-sm">
              Empowering virtual events, anywhere, anytime.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-400 mb-4">Follow Us</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} Eventopedia. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer


