import React from 'react';


const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="w-100 text-center mt-auto p-1 bg-white">
      <div className="container text-center">
        <span className="text-muted" style={{ "font-size": "min(2vw, 0.75rem)" }}>
          © {getYear()} Mick Gooding Art. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
