import React from 'react'
import {Container, Logo} from "../index.js"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 font-roboto">
      <Container>
        <div className="px-6 sm:flex sm:justify-between grid grid-cols-1">
          <div >
            <Logo />
            <p className="text-gray-400 text-base">Connect From Anywhere</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Collaboration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Virtual City, Stateless</li>
              <li>Phone: (+91) 8810650327</li>
              <li>Email: anantbiz55@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Follow</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-500 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-pink-500 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Eventopedia. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;