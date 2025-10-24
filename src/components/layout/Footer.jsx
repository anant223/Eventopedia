import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {["Collaboration", "FAQ", "About Me", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white transition-colors duration-300">
                Virtual City, Stateless
              </li>
              <li>
                <a
                  href="tel:+918810650327"
                  className="hover:text-white transition-colors duration-300"
                >
                  (+91) 8810650327
                </a>
              </li>
              <li>
                <a
                  href="mailto:anantbiz55@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  anantbiz55@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Follow</h4>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Eventopedia. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Legal
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Site Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );  
};

export default Footer;