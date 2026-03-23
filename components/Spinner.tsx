import React from 'react';

const Spinner: React.FC = () => (
  <div 
    className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-cyan-500 border-t-transparent"
    role="status"
    aria-label="Loading"
  ></div>
);

export default Spinner;
