import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({ lable, id, name, type, placeholder, value, onChange, full }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`col-span-6 ${full ? '': 'sm:col-span-3'} relative`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{lable}</label>
        <input
            id={id}
            name={name}
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="mt-1 w-full pr-10 rounded-md border-[#50B426] bg-white text-sm text-gray-700 shadow-sm focus:border-1 focus:border-[#ffb062] focus:outline-none focus:ring-0"
        />
        {type === 'password' && (
            <span className=' absolute cursor-pointer text-[#50B426] right-3 top-9' onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        )}
    </div>
  );
};

export default Input;
