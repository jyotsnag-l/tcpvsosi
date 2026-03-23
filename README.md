# OSI vs. TCP/IP Model Simulator

An interactive web application designed to visually simulate and compare the two fundamental networking models: the **7-layer OSI model** and the 
**4-layer TCP/IP model**. This tool helps students and network enthusiasts understand how data travels through network layers via encapsulation and decapsulation.

## 🚀 Features

- **Interactive Simulation**: Watch a data packet traverse through each layer of both models in real-time.
- **Side-by-Side Comparison**: Visualize how the 7 OSI layers map to the 4 TCP/IP layers.
- **Encapsulation & Decapsulation**: See how Protocol Data Units (PDUs) change from Data to Segments, Packets, Frames, and Bits.
- **Multiple Scenarios**:
  - **Web Browsing (HTTP)**
  - **Secure Web Browsing (HTTPS/TLS)**
  - **Sending an Email (SMTP)**
  - **File Transfer (FTP)**
- **AI-Powered Reports**: Generate a detailed technical report of your simulation using **Google Gemini AI**, providing a deep dive into the execution analysis.
- **Detailed Layer Info**: Click or hover to see protocols, descriptions, and PDU types for every layer.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (`@google/genai`)

## 🚦 Getting Started

1. **Select a Scenario**: Choose a networking task from the dropdown menu.
2. **Start Simulation**: Click the "Start Simulation" button to begin the data flow.
3. **Observe**: Watch the packet move down the sender's stack (encapsulation) and up the receiver's stack (decapsulation).
4. **Analyze**: Use the info panel to read about what happens at each specific layer.
5. **Generate Report**: Once finished, click "Generate AI Report" to get a comprehensive summary of the process.

**for running the files**
npm install
npm run dev 
