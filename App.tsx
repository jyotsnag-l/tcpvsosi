import React, { useState, useEffect, useCallback, useRef } from 'react';
// Lightweight local fallback stub for environments where '@google/genai' isn't installed.
// When you add the official package to your project, restore the original import:
// import { GoogleGenAI } from "@google/genai";
class GoogleGenAI {
  apiKey?: string;
  constructor(opts?: { apiKey?: string }) { this.apiKey = opts?.apiKey; }
  models = {
    // Keep the same shape used in the app: generateContent returns an object with .text
    generateContent: async (_: any) => ({ text: 'Report generation unavailable: @google/genai package is not installed.' })
  };
}
import { OSI_MODEL, TCP_IP_MODEL, SCENARIOS } from './constants';
import type { LayerData, Scenario } from './types';
import ModelColumn from './components/ModelColumn';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import ReportModal from './components/ReportModal';
import { ChevronsDown, ChevronsUp, Network } from 'lucide-react';

const App: React.FC = () => {
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'paused' | 'finished'>('idle');
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  // State for report generation
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const intervalRef = useRef<number | null>(null);

  const activeOsiLayer = activeLayerIndex !== null ? OSI_MODEL.layers[activeLayerIndex] : null;
  const activeTcpIpLayerName = activeOsiLayer?.tcpIpEquivalent;
  const activeTcpIpLayer = activeTcpIpLayerName ? TCP_IP_MODEL.layers.find(l => l.name === activeTcpIpLayerName) : null;
  
  const totalOsiLayers = OSI_MODEL.layers.length;

  const runStep = () => {
    let currentIndex = activeLayerIndex;
    let currentDirection = direction;

    if (currentDirection === 'down') {
      const nextIndex = currentIndex === null ? 0 : currentIndex + 1;

      if (nextIndex >= totalOsiLayers) {
        // Switch to 'up' direction at the bottom layer
        setDirection('up');
      } else {
        const layer = OSI_MODEL.layers[nextIndex];
        const logEntry = `Encapsulation @ L${layer.number} ${layer.name}: The data is processed and a header/trailer is added. The Protocol Data Unit (PDU) is now a ${layer.pdu}.`;
        setSimulationLog(prev => [...prev, logEntry]);
        setActiveLayerIndex(nextIndex);
      }
    } else { // direction is 'up'
      // This null check is important for the first 'up' step
      if (currentIndex === null) return; 
      
      const nextIndex = currentIndex - 1;

      if (nextIndex < 0) {
        setSimulationState('finished');
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        const layer = OSI_MODEL.layers[nextIndex];
        const logEntry = `Decapsulation @ L${layer.number} ${layer.name}: The header/trailer is processed and removed. The Protocol Data Unit (PDU) is now a ${layer.pdu}.`;
        setSimulationLog(prev => [...prev, logEntry]);
        setActiveLayerIndex(nextIndex);
      }
    }
  };

  useEffect(() => {
    if (simulationState === 'running') {
      intervalRef.current = window.setInterval(runStep, 1500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [simulationState, activeLayerIndex, direction]);


  const handleStart = () => {
    if (simulationState === 'finished' || simulationState === 'idle') {
      resetSimulation();
    }
    setSimulationState('running');
  };

  const handlePause = () => {
    setSimulationState('paused');
  };

  const handleReset = () => {
    setSimulationState('idle');
    resetSimulation();
  };

  const resetSimulation = () => {
    setActiveLayerIndex(null);
    setDirection('down');
    setSimulationLog([]);
    setReportContent('');
  };

  const handleGenerateReport = async () => {
    setIsReportModalOpen(true);
    if (reportContent) return; // Don't re-generate if we already have it

    setIsGeneratingReport(true);
  
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const halfwayPoint = Math.ceil(simulationLog.length / 2);
      const encapsulationSteps = simulationLog.slice(0, halfwayPoint).map((s, i) => `${i + 1}. ${s}`);
      const decapsulationSteps = simulationLog.slice(halfwayPoint).map((s, i) => `${i + 1}. ${s}`);
  
      const prompt = `
You are a network engineering expert writing a formal report.
Based on the following simulation data, please generate a detailed report.

The report must have three sections:
1.  **Introduction**: Briefly explain the purpose of the OSI and TCP/IP models and introduce the specific scenario being simulated.
2.  **Execution Analysis**: Provide a step-by-step walkthrough of the data flow. First, describe the encapsulation process (sender), then the decapsulation process (receiver), using the provided logs. Explain what happens at each layer.
3.  **Conclusion**: Summarize the key takeaways from the simulation, highlighting the differences between the two models and the importance of layered networking.

**Simulation Details:**
- **Scenario:** ${activeScenario.name} (${activeScenario.description})
- **Data Type:** ${activeScenario.dataType}

**Simulation Log (Sender - Encapsulation):**
${encapsulationSteps.join('\n')}

**Simulation Log (Receiver - Decapsulation):**
${decapsulationSteps.join('\n')}

Format the output in well-structured Markdown with clear headings.
      `;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });
      
      setReportContent(response.text);
  
    } catch (error) {
      console.error("Error generating report:", error);
      setReportContent("## Report Generation Failed\n\nAn error occurred while communicating with the AI model. Please check the browser console for more details and ensure your API key is configured correctly.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const tcpIpPacketPositionIndex = TCP_IP_MODEL.layers.findIndex(l => l.name === activeTcpIpLayerName);
  const tcpIpPacketPosition = tcpIpPacketPositionIndex === -1 ? null : tcpIpPacketPositionIndex;

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-200 font-sans p-4 md:p-8 flex flex-col">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-tight">OSI vs. TCP/IP Model Simulator</h1>
          <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
            An interactive visualization of data encapsulation and decapsulation through network layers.
          </p>
        </header>
        
        <main className="flex-grow flex flex-col items-center">
          <Controls
            simulationState={simulationState}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onGenerateReport={handleGenerateReport}
            scenarios={SCENARIOS}
            activeScenario={activeScenario}
            setActiveScenario={setActiveScenario}
          />
          
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 px-6 md:px-8">
            <ModelColumn
              model={OSI_MODEL}
              activeLayer={activeOsiLayer}
              packetPosition={activeLayerIndex}
              direction={direction}
              scenario={activeScenario}
              packetAlignment="left"
            />
            <InfoPanel 
              osiLayer={activeOsiLayer}
              tcpIpLayer={activeTcpIpLayer}
              direction={direction}
              scenario={activeScenario}
              simulationState={simulationState}
            />
            <ModelColumn
              model={TCP_IP_MODEL}
              activeLayer={activeTcpIpLayer}
              packetPosition={tcpIpPacketPosition}
              direction={direction}
              scenario={activeScenario}
              packetAlignment="right"
            />
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS. Report generation powered by Gemini.</p>
        </footer>
      </div>
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        isLoading={isGeneratingReport}
        content={reportContent}
        scenarioName={activeScenario.name}
      />
    </>
  );
};

export default App;
