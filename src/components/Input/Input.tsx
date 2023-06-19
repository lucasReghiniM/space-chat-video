import React from 'react';
import './styles.scss';

interface InputProps {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ icon, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <img className="icon" src={icon} alt="Icon" />
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
