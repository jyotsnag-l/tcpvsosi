
export interface LayerData {
  name: string;
  number?: number; // OSI layers have numbers
  description: string;
  protocols: string[];
  pdu: string; // Protocol Data Unit
  color: string; // Tailwind color class
  tcpIpEquivalent?: string; // For OSI layers to map to TCP/IP
}

export interface ModelData {
  name: string;
  layers: LayerData[];
}

export interface Scenario {
    name: string;
    description: string;
    dataType: string;
}
