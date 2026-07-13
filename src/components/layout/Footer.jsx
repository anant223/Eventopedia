import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { WrapperContainer } from '@/components/containers/Container';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
  <WrapperContainer>
    <div className="flex items-center justify-between border-t border-black/[0.07] py-6 flex-col sm:flex-row gap-3 sm:gap-0">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D85A30]" />
        <span className="text-[12px] text-[#9b9890]">
          Grupio · {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {[
          { label: "X",        href: "https://twitter.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#9b9890] hover:text-[#1a1814] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </WrapperContainer>
</footer>
);

export default Footer;

