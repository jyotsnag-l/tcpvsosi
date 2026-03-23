import type { ModelData, Scenario } from './types';

export const OSI_MODEL: ModelData = {
  name: 'OSI Model',
  layers: [
    {
      name: 'Application',
      number: 7,
      description: 'Provides network services directly to user applications. It\'s the layer closest to the end user.',
      protocols: ['HTTP', 'FTP', 'SMTP', 'DNS'],
      pdu: 'Data',
      color: 'bg-red-500',
      tcpIpEquivalent: 'Application',
    },
    {
      name: 'Presentation',
      number: 6,
      description: 'Translates, encrypts, and compresses data. Ensures data is in a usable format for the Application layer.',
      protocols: ['SSL', 'TLS', 'JPEG', 'MPEG'],
      pdu: 'Data',
      color: 'bg-orange-500',
      tcpIpEquivalent: 'Application',
    },
    {
      name: 'Session',
      number: 5,
      description: 'Manages sessions between applications. Handles connection establishment, maintenance, and termination.',
      protocols: ['NetBIOS', 'PPTP', 'RPC'],
      pdu: 'Data',
      color: 'bg-yellow-500',
      tcpIpEquivalent: 'Application',
    },
    {
      name: 'Transport',
      number: 4,
      description: 'Provides reliable end-to-end data transfer and error correction between hosts.',
      protocols: ['TCP', 'UDP'],
      pdu: 'Segment / Datagram',
      color: 'bg-green-500',
      tcpIpEquivalent: 'Transport',
    },
    {
      name: 'Network',
      number: 3,
      description: 'Handles logical addressing (IP addresses) and routing of data packets across different networks.',
      protocols: ['IP', 'ICMP', 'OSPF'],
      pdu: 'Packet',
      color: 'bg-blue-500',
      tcpIpEquivalent: 'Internet',
    },
    {
      name: 'Data Link',
      number: 2,
      description: 'Manages physical addressing (MAC addresses) and defines rules for how devices on the same local network access the physical medium.',
      protocols: ['Ethernet', 'Wi-Fi', 'PPP'],
      pdu: 'Frame',
      color: 'bg-indigo-500',
      tcpIpEquivalent: 'Network Access',
    },
    {
      name: 'Physical',
      number: 1,
      description: 'Transmits raw bits over a physical medium like cables or radio waves. It deals with hardware specifications.',
      protocols: ['Ethernet (Cables)', 'Bluetooth', 'USB'],
      pdu: 'Bit',
      color: 'bg-purple-500',
      tcpIpEquivalent: 'Network Access',
    },
  ],
};

export const TCP_IP_MODEL: ModelData = {
  name: 'TCP/IP Model',
  layers: [
    {
      name: 'Application',
      description: 'Combines OSI\'s Application, Presentation, and Session layers. Provides protocols for specific user services.',
      protocols: ['HTTP', 'SMTP', 'DNS', 'SSL/TLS'],
      pdu: 'Data',
      color: 'bg-red-600',
    },
    {
      name: 'Transport',
      description: 'Responsible for end-to-end communication and error-free data delivery. Analogous to OSI Transport layer.',
      protocols: ['TCP', 'UDP'],
      pdu: 'Segment / Datagram',
      color: 'bg-green-600',
    },
    {
      name: 'Internet',
      description: 'Packages data into IP datagrams and handles routing across networks. Analogous to OSI Network layer.',
      protocols: ['IP', 'ICMP'],
      pdu: 'Packet',
      color: 'bg-blue-600',
    },
    {
      name: 'Network Access',
      description: 'Combines OSI\'s Data Link and Physical layers. Manages all hardware-related details of physical transmission.',
      protocols: ['Ethernet', 'Wi-Fi'],
      pdu: 'Frame / Bit',
      color: 'bg-indigo-600',
    },
  ],
};

export const SCENARIOS: Scenario[] = [
    {
        name: 'Web Browsing',
        description: 'You are requesting a webpage from a server using your browser.',
        dataType: 'HTTP Request Data'
    },
    {
        name: 'Secure Web Browsing',
        description: 'You are requesting a secure webpage (HTTPS) from a server.',
        dataType: 'HTTPS/TLS Data'
    },
    {
        name: 'Sending an Email',
        description: 'You are sending an email to a recipient using an email client.',
        dataType: 'SMTP Email Data'
    },
    {
        name: 'File Transfer',
        description: 'You are downloading a large file from a remote server.',
        dataType: 'FTP File Data'
    },
];