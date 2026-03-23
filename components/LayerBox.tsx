
import React from 'react';
import type { LayerData } from '../types';

interface LayerBoxProps {
  layer: LayerData;
  isActive: boolean;
}

const LayerBox: React.FC<LayerBoxProps> = ({ layer, isActive }) => {
  const activeClasses = 'ring-4 ring-cyan-400 scale-105 shadow-lg shadow-cyan-500/30';
  const baseClasses = 'w-full text-center p-3 rounded-md transition-all duration-500 ease-in-out border border-white/10 flex-grow flex flex-col justify-center';

  return (
    <div className={`${baseClasses} ${layer.color} ${isActive ? activeClasses : 'opacity-60'}`}>
      <h3 className="font-bold text-sm md:text-base text-white">
        {layer.number && `Layer ${layer.number}: `}{layer.name}
      </h3>
    </div>
  );
};

export default LayerBox;
