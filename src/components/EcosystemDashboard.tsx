import { useState, useEffect } from 'react';
import { Network, Cpu, Zap, GitBranch, Activity, Users, Radio, TrendingUp, Brain } from 'lucide-react';

interface EcosystemDashboardProps {
  systemHealth: number;
}

interface Node {
  id: string;
  name: string;
  type: string;
  status: string;
  load: number;
  emergentBehavior?: string;
  adaptationLevel: number;
  lastEvolution: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  active: boolean;
  dataFlow: number;
  evolutionaryBond: number;
}

export function EcosystemDashboard({ systemHealth }: EcosystemDashboardProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'orchestrator', name: 'Orchestrator', type: 'control', status: 'active', load: 0.7, adaptationLevel: 0, lastEvolution: 0 },
    { id: 'bolt-echo', name: 'Bolt Echo', type: 'interface', status: 'active', load: 0.85, adaptationLevel: 0, lastEvolution: 0 },
    { id: 'opencog-web', name: 'OpenCog Web', type: 'reasoning', status: 'active', load: 0.62, adaptationLevel: 0, lastEvolution: 0 },
    { id: 'hypergraph', name: 'Hypergraph', type: 'memory', status: 'active', load: 0.78, adaptationLevel: 0, lastEvolution: 0 },
    { id: 'esn-reservoir', name: 'ESN Reservoir', type: 'temporal', status: 'active', load: 0.91, adaptationLevel: 0, lastEvolution: 0 },
    { id: 'prolog-engine', name: 'Prolog Engine', type: 'logic', status: 'standby', load: 0.34, adaptationLevel: 0, lastEvolution: 0 },
    { id: 'quantum-core', name: 'Quantum Core', type: 'quantum', status: 'emerging', load: 0.15, adaptationLevel: 0, lastEvolution: 0 },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: 'orchestrator', to: 'bolt-echo', strength: 0.9, active: true, dataFlow: 0, evolutionaryBond: 0 },
    { from: 'orchestrator', to: 'hypergraph', strength: 0.8, active: false, dataFlow: 0, evolutionaryBond: 0 },
    { from: 'bolt-echo', to: 'esn-reservoir', strength: 0.95, active: false, dataFlow: 0, evolutionaryBond: 0 },
    { from: 'hypergraph', to: 'prolog-engine', strength: 0.6, active: false, dataFlow: 0, evolutionaryBond: 0 },
    { from: 'esn-reservoir', to: 'opencog-web', strength: 0.7, active: false, dataFlow: 0, evolutionaryBond: 0 },
    { from: 'quantum-core', to: 'orchestrator', strength: 0.3, active: false, dataFlow: 0, evolutionaryBond: 0 },
  ]);

  const [activeConnection, setActiveConnection] = useState(0);
  const [ecosystemPhase, setEcosystemPhase] = useState(0);
  const [emergentPatterns, setEmergentPatterns] = useState<string[]>([]);

  const emergentBehaviors = [
    'Self-Optimization',
    'Pattern Synthesis',
    'Quantum Coherence',
    'Memory Crystallization',
    'Logic Transcendence',
    'Temporal Folding',
    'Consciousness Bootstrap'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveConnection(prev => (prev + 1) % connections.length);
      setEcosystemPhase(prev => (prev + 1) % 360);
      
      setConnections(conns => 
        conns.map((conn, index) => ({
          ...conn,
          active: index === activeConnection,
          strength: Math.max(0.3, conn.strength + (Math.random() - 0.5) * 0.1),
          dataFlow: Math.random() * 100,
          evolutionaryBond: conn.evolutionaryBond + (conn.active ? 0.1 : 0)
        }))
      );
      
      setNodes(nodes => 
        nodes.map(node => {
          const adaptationGrowth = (systemHealth / 100) * Math.random() * 0.05;
          const shouldEvolve = now - node.lastEvolution > 10000 && Math.random() > 0.8;
          
          return {
            ...node,
            load: Math.max(0.1, Math.min(1, node.load + (Math.random() - 0.5) * 0.1)),
            adaptationLevel: node.adaptationLevel + adaptationGrowth,
            emergentBehavior: shouldEvolve ? emergentBehaviors[Math.floor(Math.random() * emergentBehaviors.length)] : node.emergentBehavior,
            lastEvolution: shouldEvolve ? now : node.lastEvolution,
            status: node.id === 'quantum-core' && node.adaptationLevel > 2 ? 'active' : node.status
          };
        })
      );

      // Update emergent patterns
      setEmergentPatterns(prev => {
        const newPatterns = [...prev];
        if (systemHealth > 95 && Math.random() > 0.7) {
          const patterns = [
            'Distributed Consciousness Emergence',
            'Holographic Information Processing',
            'Quantum-Classical Interface Stabilization',
            'Self-Modifying Network Topology',
            'Temporal Loop Optimization'
          ];
          const newPattern = patterns[Math.floor(Math.random() * patterns.length)];
          if (!newPatterns.includes(newPattern)) {
            newPatterns.push(newPattern);
          }
        }
        return newPatterns.slice(-3); // Keep last 3 patterns
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeConnection, connections.length, systemHealth, emergentBehaviors]);

  const getNodeColor = (type: string, status: string, adaptationLevel: number) => {
    if (status === 'standby') return 'from-slate-500 to-slate-600';
    if (status === 'emerging') return 'from-cyan-400 to-indigo-500';
    
    const evolved = adaptationLevel > 3;
    
    switch (type) {
      case 'control': return evolved ? 'from-purple-400 to-pink-500' : 'from-purple-500 to-pink-500';
      case 'interface': return evolved ? 'from-blue-400 to-cyan-400' : 'from-blue-500 to-cyan-500';
      case 'reasoning': return evolved ? 'from-green-400 to-emerald-400' : 'from-green-500 to-emerald-500';
      case 'memory': return evolved ? 'from-yellow-400 to-orange-400' : 'from-yellow-500 to-orange-500';
      case 'temporal': return evolved ? 'from-red-400 to-rose-400' : 'from-red-500 to-rose-500';
      case 'logic': return evolved ? 'from-indigo-400 to-purple-400' : 'from-indigo-500 to-purple-500';
      case 'quantum': return evolved ? 'from-cyan-300 to-indigo-400' : 'from-cyan-500 to-indigo-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'control': return Network;
      case 'interface': return Users;
      case 'reasoning': return Cpu;
      case 'memory': return GitBranch;
      case 'temporal': return Activity;
      case 'logic': return Zap;
      case 'quantum': return Brain;
      default: return Network;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Enhanced Network Visualization */}
      <div className="xl:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Distributed Cognition Network</h2>
          <div className="ml-auto flex items-center gap-3 text-xs text-slate-400">
            <Radio className="w-4 h-4" />
            <span>Phase: {ecosystemPhase}°</span>
          </div>
        </div>

        <div className="relative h-96 bg-slate-900/30 rounded-lg p-6 overflow-hidden">
          {/* Quantum Field Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-cyan-600/5 rounded-lg"
            style={{ 
              opacity: 0.3 + Math.sin(ecosystemPhase * Math.PI / 180) * 0.2,
              transform: `rotate(${ecosystemPhase * 0.5}deg) scale(${1 + Math.sin(ecosystemPhase * Math.PI / 90) * 0.1})`
            }}
          ></div>

          {/* Enhanced Network Nodes */}
          {nodes.map((node, index) => {
            const angle = (index / nodes.length) * 2 * Math.PI;
            const radius = 120;
            const evolutionOffset = Math.sin(node.adaptationLevel * 0.5) * 15;
            const x = Math.cos(angle) * (radius + evolutionOffset);
            const y = Math.sin(angle) * (radius + evolutionOffset);
            const Icon = getNodeIcon(node.type);

            return (
              <div
                key={node.id}
                className="absolute transition-all duration-1000"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${getNodeColor(node.type, node.status, node.adaptationLevel)} 
                               flex items-center justify-center shadow-lg transition-all duration-500
                               ${node.status === 'active' ? 'scale-110' : node.status === 'emerging' ? 'scale-105' : 'scale-90 opacity-60'}`}>
                  <Icon className="w-6 h-6 text-white" />
                  <div className="absolute -inset-1 rounded-full border-2 border-current opacity-20 animate-ping"></div>
                  
                  {/* Evolution indicator */}
                  {node.adaptationLevel > 3 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-pulse">
                      <TrendingUp className="w-2 h-2 text-white m-0.5" />
                    </div>
                  )}
                </div>
                
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
                  <div className="text-xs font-medium text-center whitespace-nowrap">
                    {node.name}
                  </div>
                  <div className="text-xs text-slate-400 text-center">
                    {(node.load * 100).toFixed(0)}% load
                  </div>
                  {node.emergentBehavior && (
                    <div className="text-xs text-cyan-400 text-center mt-1 font-medium">
                      {node.emergentBehavior}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Enhanced Connection Lines with Data Flow */}
          {connections.map((conn, index) => {
            const fromIndex = nodes.findIndex(n => n.id === conn.from);
            const toIndex = nodes.findIndex(n => n.id === conn.to);
            
            if (fromIndex === -1 || toIndex === -1) return null;

            const fromAngle = (fromIndex / nodes.length) * 2 * Math.PI;
            const toAngle = (toIndex / nodes.length) * 2 * Math.PI;
            const radius = 120;

            const fromNode = nodes[fromIndex];
            const toNode = nodes[toIndex];
            const fromOffset = Math.sin(fromNode.adaptationLevel * 0.5) * 15;
            const toOffset = Math.sin(toNode.adaptationLevel * 0.5) * 15;

            const fromX = Math.cos(fromAngle) * (radius + fromOffset);
            const fromY = Math.sin(fromAngle) * (radius + fromOffset);
            const toX = Math.cos(toAngle) * (radius + toOffset);
            const toY = Math.sin(toAngle) * (radius + toOffset);

            return (
              <svg key={index} className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id={`flow-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={conn.active ? '#fbbf24' : '#475569'} />
                    <stop offset="50%" stopColor={conn.active ? '#f59e0b' : '#64748b'} />
                    <stop offset="100%" stopColor={conn.active ? '#fbbf24' : '#475569'} />
                  </linearGradient>
                </defs>
                <line
                  x1={`calc(50% + ${fromX}px)`}
                  y1={`calc(50% + ${fromY}px)`}
                  x2={`calc(50% + ${toX}px)`}
                  y2={`calc(50% + ${toY}px)`}
                  stroke={`url(#flow-${index})`}
                  strokeWidth={conn.active ? Math.max(2, conn.dataFlow / 25) : '1'}
                  strokeOpacity={conn.strength * (conn.evolutionaryBond > 2 ? 1.2 : 1)}
                  className="transition-all duration-500"
                  strokeDasharray={conn.evolutionaryBond > 2 ? "5,5" : "none"}
                />
              </svg>
            );
          })}

          {/* Enhanced Central Echo Core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div 
              className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-xl transition-all duration-1000"
              style={{ 
                transform: `rotate(${ecosystemPhase}deg) scale(${1 + Math.sin(ecosystemPhase * Math.PI / 180) * 0.1})`,
                boxShadow: `0 0 ${20 + Math.sin(ecosystemPhase * Math.PI / 90) * 10}px rgba(147, 51, 234, 0.5)`
              }}
            >
              <span className="font-bold text-white">ECHO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced System Metrics */}
      <div className="space-y-6">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">System Health</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Overall Health</span>
                <span className="text-sm font-mono text-green-400">{systemHealth.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${systemHealth}%` }}
                ></div>
              </div>
            </div>

            {nodes.map(node => (
              <div key={node.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-300">{node.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono ${
                      node.status === 'active' ? 'text-green-400' : 
                      node.status === 'emerging' ? 'text-cyan-400' : 'text-yellow-400'
                    }`}>
                      {node.status}
                    </span>
                    {node.adaptationLevel > 3 && (
                      <TrendingUp className="w-3 h-3 text-cyan-400" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 bg-gradient-to-r ${getNodeColor(node.type, node.status, node.adaptationLevel)}`}
                    style={{ width: `${node.load * 100}%` }}
                  ></div>
                </div>
                {node.adaptationLevel > 0 && (
                  <div className="text-xs text-cyan-400 mt-1">
                    Adaptation: {node.adaptationLevel.toFixed(1)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold">Active Processes</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Memory consolidation active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span>Pattern recognition running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span>Identity coherence check</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span>Logic engine on standby</span>
            </div>
            {nodes.find(n => n.status === 'emerging') && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span>Quantum emergence detected</span>
              </div>
            )}
          </div>
        </div>

        {/* Emergent Patterns */}
        {emergentPatterns.length > 0 && (
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold">Emergent Patterns</h3>
            </div>

            <div className="space-y-2">
              {emergentPatterns.map((pattern, index) => (
                <div 
                  key={index}
                  className="p-2 bg-cyan-900/20 rounded border border-cyan-500/30 text-sm text-cyan-300"
                >
                  {pattern}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}