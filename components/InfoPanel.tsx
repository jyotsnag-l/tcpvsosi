
import React from 'react';
import type { LayerData, Scenario } from '../types';
import { ChevronsDown, ChevronsUp, Info, Package, PlayCircle } from 'lucide-react';

interface InfoPanelProps {
  osiLayer: LayerData | null;
  tcpIpLayer: LayerData | null;
  direction: 'down' | 'up';
  scenario: Scenario;
  simulationState: 'idle' | 'running' | 'paused' | 'finished';
}

const InfoPanel: React.FC<InfoPanelProps> = ({ osiLayer, tcpIpLayer, direction, scenario, simulationState }) => {

  const getProcessDescription = () => {
    if (!osiLayer) return "The simulation is idle. Press 'Start' to begin.";
    if (direction === 'down') {
      return `Encapsulation: The ${osiLayer.name} layer is adding its header/trailer, creating a ${osiLayer.pdu}.`;
    } else {
      return `Decapsulation: The ${osiLayer.name} layer is processing and removing its header/trailer from the ${osiLayer.pdu}.`;
    }
  };

  const renderContent = () => {
    if (simulationState === 'idle' || !osiLayer || !tcpIpLayer) {
      return (
        <div className="text-center flex flex-col items-center justify-center h-full">
          <PlayCircle className="w-16 h-16 text-slate-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-300">Simulation Ready</h3>
          <p className="text-slate-400 mt-2">Press 'Start Simulation' to begin.</p>
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg w-full">
            <h4 className="font-semibold text-cyan-400 mb-2">Current Scenario</h4>
            <p className="text-sm text-slate-300">{scenario.description}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="text-center">
            {direction === 'down' ? (
                 <div className="inline-flex items-center gap-2 text-lg font-semibold text-orange-400">
                    <ChevronsDown className="w-6 h-6"/> Encapsulation (Sender)
                 </div>
            ) : (
                <div className="inline-flex items-center gap-2 text-lg font-semibold text-green-400">
                    <ChevronsUp className="w-6 h-6"/> Decapsulation (Receiver)
                </div>
            )}
        </div>
        
        <div className="p-4 bg-slate-800 rounded-lg border border-cyan-400/30">
          <h3 className="text-lg font-bold text-cyan-400">OSI Layer: {osiLayer.name}</h3>
          <p className="text-sm mt-1 text-slate-300">{osiLayer.description}</p>
        </div>
        
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
          <h3 className="text-lg font-bold text-slate-300">TCP/IP Layer: {tcpIpLayer.name}</h3>
          <p className="text-sm mt-1 text-slate-400">{tcpIpLayer.description}</p>
        </div>

        <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" /> Current Process
            </h4>
            <p className="text-sm text-slate-300">{getProcessDescription()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-800 rounded-lg">
                <h5 className="font-semibold text-slate-400">Protocols</h5>
                <p className="text-white font-mono text-xs mt-1">{osiLayer.protocols.join(', ')}</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
                <h5 className="font-semibold text-slate-400">PDU</h5>
                <p className="text-white font-mono text-xs mt-1">{osiLayer.pdu}</p>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-slate-800/50 rounded-lg shadow-xl flex flex-col justify-center min-h-[400px] md:min-h-0">
      {renderContent()}
    </div>
  );
};

export default InfoPanel;
