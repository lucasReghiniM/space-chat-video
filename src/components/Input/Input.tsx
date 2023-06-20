import React from 'react';
import './styles.scss';

interface InputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ icon, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <div className='icon'>
        {icon}
      </div>
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
