import React from 'react';
import type { Scenario } from '../types';
import { Play, Pause, RotateCw, ChevronDown, FileText } from 'lucide-react';

interface ControlsProps {
  simulationState: 'idle' | 'running' | 'paused' | 'finished';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onGenerateReport: () => void;
  scenarios: Scenario[];
  activeScenario: Scenario;
  setActiveScenario: (scenario: Scenario) => void;
}

const Controls: React.FC<ControlsProps> = ({
  simulationState,
  onStart,
  onPause,
  onReset,
  onGenerateReport,
  scenarios,
  activeScenario,
  setActiveScenario,
}) => {
  const isRunning = simulationState === 'running';
  const isFinished = simulationState === 'finished';

  return (
    <div className="w-full max-w-4xl p-4 bg-slate-800/60 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="relative w-full md:w-auto">
        <select
          value={activeScenario.name}
          onChange={(e) => {
            const selected = scenarios.find(s => s.name === e.target.value);
            if (selected) setActiveScenario(selected);
          }}
          disabled={isRunning || simulationState === 'paused'}
          className="w-full appearance-none bg-slate-700 border border-slate-600 rounded-md py-2 pl-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 transition-opacity"
        >
          {scenarios.map(s => <option key={s.name}>{s.name}</option>)}
        </select>
        <ChevronDown className="w-5 h-5 text-slate-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
      </div>
      
      <div className="flex items-center gap-3">
        {isRunning ? (
          <button
            onClick={onPause}
            className="px-4 py-2 bg-yellow-500 text-slate-900 font-semibold rounded-md flex items-center gap-2 hover:bg-yellow-400 transition-colors"
          >
            <Pause className="w-5 h-5" /> Pause
          </button>
        ) : (
          <button
            onClick={onStart}
            className="px-4 py-2 bg-green-500 text-slate-900 font-semibold rounded-md flex items-center gap-2 hover:bg-green-400 transition-colors"
          >
            <Play className="w-5 h-5" /> {simulationState === 'paused' ? 'Resume' : 'Start Simulation'}
          </button>
        )}
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-red-500 transition-colors"
        >
          <RotateCw className="w-5 h-5" /> Reset
        </button>
         <button
          onClick={onGenerateReport}
          disabled={!isFinished}
          className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileText className="w-5 h-5" /> Report
        </button>
      </div>
    </div>
  );
};

export default Controls;
