import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Dropdown({ trigger, children, align = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className={`absolute ${align}-0 mt-2 bg-white text-[#0A2647] rounded shadow-lg z-30`}>
          {children(closeDropdown)}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
};
