import { useState } from 'react';
import { Globe, Server, Shield, Settings, ExternalLink, Copy, CheckCircle } from 'lucide-react';

export function SiteConfiguration() {
  const [activeTab, setActiveTab] = useState<'domain' | 'hosting' | 'ssl' | 'settings'>('domain');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'domain', label: 'Domain', icon: Globe },
    { id: 'hosting', label: 'Hosting', icon: Server },
    { id: 'ssl', label: 'SSL/Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const renderDomainTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-400" />
          Domain Configuration
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Domain</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value="deep-tree-echo.ai"
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                readOnly
              />
              <button
                onClick={() => handleCopy('deep-tree-echo.ai')}
                className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subdomain</label>
            <input
              type="text"
              value="app.deep-tree-echo.ai"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Active</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">DNS Provider</label>
              <span className="text-slate-300">Cloudflare</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">DNS Records</h3>
        <div className="space-y-3">
          {[
            { type: 'A', name: '@', value: '104.21.45.123', status: 'active' },
            { type: 'CNAME', name: 'app', value: 'deep-tree-echo.ai', status: 'active' },
            { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', status: 'active' },
          ].map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-purple-400 font-mono text-sm">{record.type}</span>
                <span className="text-slate-300">{record.name}</span>
                <span className="text-slate-400 text-sm">{record.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHostingTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-purple-400" />
          Hosting Details
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Provider</label>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Server className="w-4 h-4" />
              </div>
              <span className="text-slate-300">Vercel</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <span className="text-slate-300">us-east-1 (Virginia)</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CDN</label>
            <span className="text-slate-300">Global Edge Network</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Performance</label>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-400">Optimal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Build Configuration</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Framework</label>
              <span className="text-slate-300">React + Vite</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Node Version</label>
              <span className="text-slate-300">18.x</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Build Command</label>
            <code className="block bg-slate-900/50 p-2 rounded text-sm text-green-400">npm run build</code>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Output Directory</label>
            <code className="block bg-slate-900/50 p-2 rounded text-sm text-green-400">dist</code>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSSLTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          SSL Certificate
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-400">Valid</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Issuer</label>
            <span className="text-slate-300">Let's Encrypt</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expires</label>
            <span className="text-slate-300">2024-12-15</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Auto-Renewal</label>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-400">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Security Headers</h3>
        <div className="space-y-3">
          {[
            { name: 'HTTPS Redirect', status: 'enabled' },
            { name: 'HSTS', status: 'enabled' },
            { name: 'X-Frame-Options', status: 'enabled' },
            { name: 'X-Content-Type-Options', status: 'enabled' },
            { name: 'CSP', status: 'enabled' },
          ].map((header, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-slate-300">{header.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Enabled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Site Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <input
              type="text"
              value="Deep Tree Echo: Holographic AI Identity"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value="A sophisticated holographic AI identity system demonstrating distributed cognition architecture"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-purple-600" />
                <span className="text-sm">Enable Analytics</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-purple-600" />
                <span className="text-sm">Auto-Deploy</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Environment Variables</h3>
        <div className="space-y-3">
          <div className="text-sm text-slate-400 mb-3">
            No environment variables required - the application runs entirely client-side.
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg border-l-4 border-purple-500">
            <p className="text-sm text-slate-300">
              This holographic AI identity system is built as a static application with no external dependencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Configuration</h2>
          <p className="text-slate-400 mt-1">Manage hosting, domains, and deployment settings</p>
        </div>
        <a
          href="https://deep-tree-echo.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Site
        </a>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-slate-700">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {activeTab === 'domain' && renderDomainTab()}
        {activeTab === 'hosting' && renderHostingTab()}
        {activeTab === 'ssl' && renderSSLTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
}