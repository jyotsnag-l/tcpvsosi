import React from 'react';
import type { ModelData, LayerData, Scenario } from '../types';
import LayerBox from './LayerBox';
import DataPacket from './DataPacket';

interface ModelColumnProps {
  model: ModelData;
  activeLayer: LayerData | null;
  packetPosition: number | null;
  direction: 'down' | 'up';
  scenario: Scenario;
  packetAlignment: 'left' | 'right';
}

const ModelColumn: React.FC<ModelColumnProps> = ({ model, activeLayer, packetPosition, direction, scenario, packetAlignment }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg shadow-xl h-full relative">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">{model.name}</h2>
      <div className="w-full space-y-2 flex-grow flex flex-col">
        {model.layers.map((layer, index) => (
          <LayerBox
            key={layer.name}
            layer={layer}
            isActive={activeLayer?.name === layer.name}
          />
        ))}
      </div>
      {packetPosition !== null && (
        <DataPacket 
          layerCount={model.layers.length} 
          position={packetPosition} 
          direction={direction} 
          dataType={scenario.dataType}
          alignment={packetAlignment}
        />
      )}
    </div>
  );
};

export default ModelColumn;