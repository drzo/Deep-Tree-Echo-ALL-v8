import { useState, useEffect } from 'react';
import { Rocket, GitBranch, Clock, CheckCircle, AlertCircle, Activity, Users, Globe, Zap } from 'lucide-react';

interface DeploymentRecord {
  id: string;
  version: string;
  branch: string;
  status: 'success' | 'failed' | 'building' | 'pending';
  timestamp: Date;
  duration: number;
  author: string;
}

export function DeployDashboard() {
  const [deployments] = useState<DeploymentRecord[]>([
    {
      id: '1',
      version: 'v1.2.3',
      branch: 'main',
      status: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      duration: 45,
      author: 'System'
    },
    {
      id: '2',
      version: 'v1.2.2',
      branch: 'main',
      status: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      duration: 52,
      author: 'AI Agent'
    },
    {
      id: '3',
      version: 'v1.2.1',
      branch: 'feature/deploy-pages',
      status: 'building',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      duration: 0,
      author: 'Copilot'
    },
  ]);

  const [metrics, setMetrics] = useState({
    totalDeployments: 127,
    successRate: 98.4,
    avgBuildTime: 48,
    uptime: 99.9,
    activeVisitors: 1247,
    lastDeployment: '15m ago'
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeVisitors: prev.activeVisitors + Math.floor(Math.random() * 10 - 5),
        avgBuildTime: prev.avgBuildTime + Math.floor(Math.random() * 4 - 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'building':
        return <Activity className="w-4 h-4 text-yellow-400 animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      case 'building':
        return 'text-yellow-400';
      default:
        return 'text-slate-400';
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return 'In progress...';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Deploy Dashboard</h2>
          <p className="text-slate-400 mt-1">Monitor deployments and release management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          <Rocket className="w-4 h-4" />
          Deploy Now
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400">Total Deploys</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.totalDeployments}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs text-slate-400">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.successRate}%</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Avg Build Time</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.avgBuildTime}s</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs text-slate-400">Uptime</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.uptime}%</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400">Active Users</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.activeVisitors.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Last Deploy</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.lastDeployment}</div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Current Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Production</span>
            </div>
            <p className="text-slate-300 text-sm">Running v1.2.3</p>
            <p className="text-slate-400 text-xs">Deployed 15m ago</p>
          </div>
          
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-medium">Staging</span>
            </div>
            <p className="text-slate-300 text-sm">Building v1.2.4</p>
            <p className="text-slate-400 text-xs">Started 5m ago</p>
          </div>
          
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 font-medium">Development</span>
            </div>
            <p className="text-slate-300 text-sm">Ready v1.3.0-dev</p>
            <p className="text-slate-400 text-xs">Updated 1h ago</p>
          </div>
        </div>
      </div>

      {/* Recent Deployments */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-400" />
          Recent Deployments
        </h3>
        <div className="space-y-3">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(deployment.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{deployment.version}</span>
                    <span className="text-xs bg-slate-600 px-2 py-1 rounded">{deployment.branch}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>by {deployment.author}</span>
                    <span>{formatRelativeTime(deployment.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium capitalize ${getStatusColor(deployment.status)}`}>
                  {deployment.status}
                </div>
                <div className="text-sm text-slate-400">
                  {formatDuration(deployment.duration)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Build Pipeline */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Build Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Code Analysis', status: 'complete', duration: '12s' },
            { name: 'Build Assets', status: 'complete', duration: '24s' },
            { name: 'Run Tests', status: 'complete', duration: '8s' },
            { name: 'Deploy', status: 'complete', duration: '15s' },
          ].map((step, index) => (
            <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{step.name}</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-xs text-slate-400">{step.duration}</div>
              <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                <div className="bg-green-400 h-2 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}