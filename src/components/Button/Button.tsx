import React from 'react';

// STYLES
import './styles.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button className='button' onClick={onClick}>{children}</button>;
};

export default Button;
