import React from "react";
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import Logo from "../../../../assets/logo.webp"
import "./header.css"

const HeaderBar: React.FC = () => (
  <div className="barra-header">
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={Logo}
        alt="Salón Verde logo"
        style={{ height: "55px", marginRight: "8px" }}
      />
    </div>
    <div style={{ display: "flex", gap: "8px" }}>
      <a href="https://www.facebook.com/share/14EjLYqLMUJ/" target="_blank" rel="noopener noreferrer">
        <span className="icon">
          <FaFacebookF />
        </span>
      </a>
      <a href="https://wa.me/51977932164" target="_blank" rel="noopener noreferrer">
        <span className="icon">
          <FaWhatsapp />
        </span>
      </a>
    </div>
  </div>
);

export default HeaderBar;