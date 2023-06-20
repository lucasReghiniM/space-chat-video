import React from 'react';

// STYLES
import './styles.scss';

// ASSETS
import { CaretIcon } from '../../styles/icons';

interface SelectProps {
  icon?: React.ReactNode;
  selected?: string;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  name: string;
}

const Select: React.FC<SelectProps> = ({ icon, selected, children , onChange, id, name }) => {
  return (
    <div className="select-container">
      <div className='icon'>
        {icon}
      </div>
      <select
        id={id}
        name={name}
        className="select"
        value={selected}
        onChange={onChange}
      >
        {children}
      </select>
      <div className="select-container-arrow">
        <CaretIcon />
      </div>
    </div>
  );
};

export default Select;
