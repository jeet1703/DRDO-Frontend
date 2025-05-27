// components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className=" w-full bg-[#02447C] text-white shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
    <div className="flex flex-wrap justify-center items-center text-[11px] gap-x-2 gap-y-2 p-2">
      {[
        'Contact Us', 'Terms & Conditions', 'Privacy Policy', 'Copyright Policy',
        'Website Policy', 'Help', 'Web Information Manager'
      ].map((item, index, arr) => (
        <React.Fragment key={item}>
          <a href="#" className="hover:underline">{item}</a>
          {index < arr.length - 1 && <span className="text-gray-300">|</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="mt-4 mb-2 text-[10px] text-center text-gray-300">
      &copy; 2025, DRDO, Ministry of Defence, Government of India
    </div>
  </footer>
);

export default Footer;
