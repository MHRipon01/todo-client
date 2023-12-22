import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside className="md:mt-16">
           
          <p >
            <span className="text-xl font-bold"> SCC Technovision Inc.</span>
          
            <br />
            Providing reliable tech since 2012
          </p>
        </aside>
        <nav>
          <header className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Services</header>
          <a className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Branding</a>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Design</a>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Marketing</a>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">About us</a>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Contact</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Terms of use</a>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Privacy policy</a>
          <a  className="tooltip  tooltip-top" data-tip="Link under Construction 🚧">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
