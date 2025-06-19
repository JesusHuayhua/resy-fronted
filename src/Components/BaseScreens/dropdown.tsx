import React, { useState } from "react";
import dropdown from "./dropdown.module.css";

import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropDownPerfil: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={dropdown.dropdownContainer}>
      <div className={dropdown.dropdownButton} onClick={toggleDropdown}>
        <FaUser className={dropdown.icon} />
        <span>XXXXXXXXXXXX</span>
        {isOpen ? <FaChevronUp className={dropdown.icon} /> : <FaChevronDown className={dropdown.icon} />}
      </div>

      {isOpen && (
        <div className={dropdown.dropdownMenu}>
          <div className={dropdown.dropdownItem}>PERFIL</div>
          <div className={dropdown.dropdownItem}>CERRAR SESIÓN</div>
        </div>
      )}
    </div>
  );
};

export default DropDownPerfil;
