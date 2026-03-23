import React from 'react';
import { Mail, File, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface DataPacketProps {
  layerCount: number;
  position: number;
  direction: 'down' | 'up';
  dataType: string;
  alignment: 'left' | 'right';
}

const DataPacket: React.FC<DataPacketProps> = ({ layerCount, position, direction, dataType, alignment }) => {
  const layerHeight = 100 / layerCount;
  const packetOffset = layerHeight / 2;
  const topPosition = position * layerHeight + packetOffset;

  const getIcon = () => {
    switch (dataType) {
      case 'SMTP Email Data':
        return <Mail className="w-6 h-6 md:w-8 md:h-8 text-cyan-300" />;
      case 'FTP File Data':
        return <File className="w-6 h-6 md:w-8 md:h-8 text-cyan-300" />;
      case 'HTTP Request Data':
      default:
        return <Globe className="w-6 h-6 md:w-8 md:h-8 text-cyan-300" />;
    }
  };

  const animationClass = direction === 'down' ? 'animate-packet-down' : 'animate-packet-up';
  const positionClass = alignment === 'left'
    ? 'left-[-24px] md:left-[-32px]'
    : 'right-[-24px] md:right-[-32px]';

  return (
    <div
      className={`absolute ${positionClass} w-12 h-12 md:w-16 md:h-16 transition-all duration-500 ease-in-out z-10`}
      style={{ top: `calc(${topPosition}% - 24px)` }}
    >
        {/* Trail effect container. The key forces a re-render and thus re-animation on position change. */}
        <div
            key={position} // This is the crucial part to restart the animation
            className={`absolute w-full flex justify-center items-center ${direction === 'down' ? 'bottom-full' : 'top-full'} z-[-1]`}
        >
            <div className={`flex ${direction === 'down' ? 'flex-col gap-1.5' : 'flex-col-reverse gap-1.5'}`}>
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-trail-effect"
                        style={{ animationDelay: `${i * 0.08}s` }}
                    />
                ))}
            </div>
        </div>

        <div className={`relative w-full h-full ${animationClass}`}>
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-75 animate-pulse-glow"></div>
            <div className="relative w-full h-full bg-slate-700 border-2 border-cyan-400 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                {getIcon()}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                    {direction === 'down' ? (
                    <>
                        <ChevronDown className="w-4 h-4 text-cyan-500 animate-chevron-down" style={{ animationDelay: '0s' }} />
                        <ChevronDown className="w-4 h-4 text-cyan-500 animate-chevron-down" style={{ animationDelay: '0.2s' }} />
                        <ChevronDown className="w-4 h-4 text-cyan-500 animate-chevron-down" style={{ animationDelay: '0.4s' }} />
                    </>
                    ) : (
                    <>
                        <ChevronUp className="w-4 h-4 text-cyan-500 animate-chevron-up" style={{ animationDelay: '0s' }} />
                        <ChevronUp className="w-4 h-4 text-cyan-500 animate-chevron-up" style={{ animationDelay: '0.2s' }} />
                        <ChevronUp className="w-4 h-4 text-cyan-500 animate-chevron-up" style={{ animationDelay: '0.4s' }} />
                    </>
                    )}
                </div>
            </div>
        </div>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite ease-in-out; }

        @keyframes packet-down {
          0%, 100% { transform: translateY(-15%); }
          50% { transform: translateY(15%); }
        }
        .animate-packet-down { animation: packet-down 1.5s infinite cubic-bezier(0.5, 0, 0.5, 1); }
        
        @keyframes packet-up {
          0%, 100% { transform: translateY(15%); }
          50% { transform: translateY(-15%); }
        }
        .animate-packet-up { animation: packet-up 1.5s infinite cubic-bezier(0.5, 0, 0.5, 1); }

        @keyframes chevron-down {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-chevron-down { animation: chevron-down 1.2s infinite ease-out; }

        @keyframes chevron-up {
            0% { transform: translateY(100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-chevron-up { animation: chevron-up 1.2s infinite ease-out; }

        @keyframes trail-effect {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0);
            opacity: 0;
          }
        }
        .animate-trail-effect {
          animation: trail-effect 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DataPacket;