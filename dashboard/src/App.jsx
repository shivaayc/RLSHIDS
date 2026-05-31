import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, Activity, Cpu, Network, Lock, Server, 
  Database, Zap, BarChart3, Settings, Play, 
  CheckCircle, AlertTriangle, XCircle, Clock,
  Terminal, Eye, Layers, Bot, Wifi, WifiOff
} from 'lucide-react'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

// ==================== NAVIGATION ====================
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'config', label: 'Configuration', icon: Settings },
  { id: 'test', label: 'Run Test', icon: Play },
  { id: 'results', label: 'Results', icon: Activity },
  { id: 'about', label: 'About', icon: Eye },
]

// ==================== PIPELINE STAGES ====================
const pipelineStages = [
  { id: 'init', label: 'Init', desc: 'Feature Extraction', time: '0s' },
  { id: 'train', label: 'Train', desc: 'VAE Training', time: '2s' },
  { id: 'aggregate', label: 'Aggregate', desc: 'FL Krum', time: '4s' },
  { id: 'detect', label: 'Detect', desc: 'Anomaly Detection', time: '6s' },
  { id: 'block', label: 'Block', desc: 'Response Action', time: '8s' },
]

// ==================== FEDERATED NODES ====================
const federatedNodes = [
  { id: 1, round: 'R12', trust: 98, status: 'online' },
  { id: 2, round: 'R12', trust: 95, status: 'online' },
  { id: 3, round: 'R12', trust: 97, status: 'online' },
  { id: 4, round: 'R11', trust: 42, status: 'suspicious' },
  { id: 5, round: 'R12', trust: 92, status: 'online' },
  { id: 6, round: 'R12', trust: 96, status: 'online' },
  { id: 7, round: 'R12', trust: 94, status: 'online' },
  { id: 8, round: '-', trust: 0, status: 'offline' },
  { id: 9, round: '-', trust: 0, status: 'offline' },
  { id: 10, round: 'R12', trust: 91, status: 'online' },
]

// ==================== ARCHITECTURE CARDS ====================
const architectureCards = [
  { 
    id: 'extract', 
    title: 'Feature Extraction', 
    desc: '42-dim flow vectors', 
    badge: 'Input',
    color: 'cyan'
  },
  { 
    id: 'vae', 
    title: 'VAE Anomaly', 
    desc: 'One-class detection', 
    badge: 'z=32',
    color: 'green'
  },
  { 
    id: 'cache', 
    title: 'HNSW Cache', 
    desc: 'Signature matching', 
    badge: 'η=0.85',
    color: 'orange'
  },
  { 
    id: 'ddqn', 
    title: 'DDQN Policy', 
    desc: 'Response selection', 
    badge: 'γ=0.99',
    color: 'purple'
  },
  { 
    id: 'fl', 
    title: 'FL + Krum', 
    desc: 'Byzantine aggregation', 
    badge: 'ε-DP',
    color: 'blue'
  },
]

// ==================== ACTIVITY LOG ====================
const generateActivity = () => {
  const activities = [
    { msg: 'Processing network flow...', type: 'info' },
    { msg: 'VAE: Computing reconstruction error', type: 'info' },
    { msg: 'VAE: KL divergence: 0.0234', type: 'info' },
    { msg: 'Cache: HNSW search (ef=50)', type: 'info' },
    { msg: 'Cache: Similarity score: 0.87', type: 'success' },
    { msg: 'DDQN: Q-values computed', type: 'info' },
    { msg: 'DDQN: Action selected: RateLimit', type: 'success' },
    { msg: 'FL: Client updates received', type: 'info' },
    { msg: 'FL: Krum score: 0.0042', type: 'info' },
    { msg: 'FL: Byzantine update rejected', type: 'warning' },
    { msg: 'DP: Gaussian noise injected (σ=0.8)', type: 'info' },
    { msg: 'Anomaly score exceeded threshold', type: 'warning' },
    { msg: 'Attack pattern matched: DoS', type: 'error' },
    { msg: 'Response action: Block', type: 'success' },
    { msg: 'Federated round: 12/100', type: 'info' },
  ]
  return activities[Math.floor(Math.random() * activities.length)]
}

// ==================== CHART DATA ====================
const convergenceData = [
  { round: 1, accuracy: 65 },
  { round: 2, accuracy: 72 },
  { round: 3, accuracy: 78 },
  { round: 4, accuracy: 83 },
  { round: 5, accuracy: 87 },
  { round: 6, accuracy: 89 },
  { round: 7, accuracy: 91 },
  { round: 8, accuracy: 92 },
  { round: 9, accuracy: 93 },
  { round: 10, accuracy: 94 },
  { round: 11, accuracy: 94.5 },
  { round: 12, accuracy: 95 },
]

const latencyData = [
  { name: 'P50', value: 8, color: '#00ff88' },
  { name: 'P75', value: 15, color: '#00f0ff' },
  { name: 'P90', value: 22, color: '#ff9500' },
  { name: 'P95', value: 28, color: '#ff3366' },
  { name: 'P99', value: 35, color: '#ff3366' },
]

const trustData = [
  { node: 'N1', trust: 98 },
  { node: 'N2', trust: 95 },
  { node: 'N3', trust: 97 },
  { node: 'N4', trust: 42 },
  { node: 'N5', trust: 92 },
  { node: 'N6', trust: 96 },
  { node: 'N7', trust: 94 },
  { node: 'N8', trust: 0 },
  { node: 'N9', trust: 0 },
  { node: 'N10', trust: 91 },
]

// ==================== COMPONENTS ====================

function Navbar({ activeTab, setActiveTab }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-strong sticky top-0 z-50 border-b border-cyber-cyan/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">
              Intelligent Network Security Framework
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Privacy-Preserving Federated Learning for Industrial IoT
            </p>
          </div>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-gray-400 hover:text-cyber-cyan hover:bg-cyber-dark-3'
                }`}
              >
                <item.icon className="w-4 h-4 inline mr-2" />
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function PipelineTimeline() {
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2" />
        Real-Time Pipeline Timeline
      </h3>
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-cyber-dark-3 rounded-full" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-green rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeStage / (pipelineStages.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
        {pipelineStages.map((stage, idx) => (
          <div key={stage.id} className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{
                scale: idx === activeStage ? 1.2 : 1,
                boxShadow: idx === activeStage 
                  ? '0 0 20px rgba(0, 240, 255, 0.6)' 
                  : '0 0 10px rgba(0, 240, 255, 0.2)'
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                idx <= activeStage
                  ? 'bg-cyber-dark-2 border-cyber-cyan'
                  : 'bg-cyber-dark-3 border-gray-600'
              }`}
            >
              {idx <= activeStage ? (
                <CheckCircle className="w-6 h-6 text-cyber-cyan" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-gray-600" />
              )}
            </motion.div>
            <div className="mt-3 text-center">
              <p className={`text-sm font-semibold ${idx <= activeStage ? 'text-cyber-cyan' : 'text-gray-500'}`}>
                {stage.label}
              </p>
              <p className="text-xs text-gray-500">{stage.desc}</p>
              <p className="text-xs text-cyber-green mt-1 font-mono">{stage.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function StatusCards() {
  const statuses = [
    { label: 'Framework Ready', value: 'Online', icon: Shield, color: 'green', glow: 'glow-green' },
    { label: 'Privacy ε', value: '2.4', icon: Lock, color: 'cyan', glow: 'glow-cyan' },
    { label: 'Byzantine Resistance', value: '20%', icon: Shield, color: 'cyan', glow: 'glow-cyan' },
    { label: 'Privacy Budget', value: '85%', icon: Database, color: 'green', glow: 'glow-green' },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {statuses.map((status, idx) => (
        <motion.div
          key={status.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass rounded-2xl p-4 card-hover"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">{status.label}</span>
            <status.icon className={`w-5 h-5 text-cyber-${status.color}`} />
          </div>
          <div className={`text-2xl font-bold text-cyber-${status.color} ${status.glow} px-3 py-1 rounded-lg inline-block`}>
            {status.value}
          </div>
          {status.label === 'Privacy Budget' && (
            <div className="mt-2 h-2 bg-cyber-dark-3 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-green"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1 }}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    inferences: 1247,
    detectionRate: 94,
    blocked: 156,
    latency: 12.7,
    f1: 94.2
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        inferences: prev.inferences + Math.floor(Math.random() * 3),
        detectionRate: 90 + Math.floor(Math.random() * 10),
        blocked: prev.blocked + (Math.random() > 0.7 ? 1 : 0),
        latency: (10 + Math.random() * 5).toFixed(1),
        f1: (93 + Math.random() * 3).toFixed(1),
      }))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const metricsData = [
    { label: 'Total Inferences', value: metrics.inferences, unit: '', color: 'cyan' },
    { label: 'Attack Detection', value: metrics.detectionRate, unit: '%', color: 'green' },
    { label: 'Attacks Blocked', value: metrics.blocked, unit: '', color: 'red' },
    { label: 'Avg Latency', value: metrics.latency, unit: 'ms', color: 'orange' },
    { label: 'F1-Score', value: metrics.f1, unit: '%', color: 'purple' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2" />
        Live Metrics
      </h3>
      <div className="grid grid-cols-5 gap-4">
        {metricsData.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-cyber-cyan font-mono">
              <motion.span
                key={metric.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {metric.value}
              </motion.span>
              <span className="text-lg text-cyber-green">{metric.unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function FederatedNodes() {
  const getTrustColor = (trust) => {
    if (trust >= 90) return 'text-cyber-green'
    if (trust >= 70) return 'text-cyber-orange'
    if (trust > 0) return 'text-cyber-red'
    return 'text-gray-500'
  }

  const getStatusColor = (status) => {
    if (status === 'online') return 'bg-cyber-green'
    if (status === 'suspicious') return 'bg-cyber-red animate-pulse'
    return 'bg-gray-600'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
        <Network className="w-5 h-5 mr-2" />
        Federated Learning Nodes
      </h3>
      <div className="grid grid-cols-5 gap-3">
        {federatedNodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.05 }}
            className={`glass rounded-xl p-3 text-center border ${
              node.status === 'suspicious' 
                ? 'border-cyber-red/50 bg-cyber-red/10' 
                : node.status === 'offline'
                ? 'border-gray-700 opacity-50'
                : 'border-cyber-cyan/20'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status)}`} />
              <span className="text-xs font-mono text-gray-400">Node {node.id}</span>
            </div>
            <div className={`text-lg font-bold font-mono ${getTrustColor(node.trust)}`}>
              {node.trust > 0 ? `${node.trust}%` : '-'}
            </div>
            <div className="text-xs text-gray-500 mt-1">{node.round}</div>
          </motion.div>
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-lg flex items-center"
      >
        <AlertTriangle className="w-4 h-4 text-cyber-red mr-2" />
        <span className="text-sm text-cyber-red">Node 4 marked suspicious – Low trust score (42%)</span>
      </motion.div>
    </motion.div>
  )
}

function ArchitecturePipeline() {
  const getColorClass = (color) => {
    const colors = {
      cyan: 'border-cyber-cyan text-cyber-cyan',
      green: 'border-cyber-green text-cyber-green',
      orange: 'border-cyber-orange text-cyber-orange',
      purple: 'border-cyber-purple text-cyber-purple',
      blue: 'border-cyber-blue text-cyber-blue',
    }
    return colors[color] || colors.cyan
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
        <Layers className="w-5 h-5 mr-2" />
        Research Pipeline Architecture
      </h3>
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {architectureCards.map((card, idx) => (
          <React.Fragment key={card.id}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`flex-shrink-0 glass rounded-xl p-4 border-2 ${getColorClass(card.color)} min-w-[160px]`}
            >
              <div className="flex items-center justify-between mb-2">
                <Cpu className={`w-5 h-5 text-cyber-${card.color}`} />
                <span className="text-xs px-2 py-1 rounded bg-cyber-dark-3 text-gray-400 font-mono">
                  {card.badge}
                </span>
              </div>
              <h4 className="font-semibold text-white">{card.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
            </motion.div>
            {idx < architectureCards.length - 1 && (
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-cyber-cyan flex-shrink-0"
              >
                →
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  )
}

function ActivityLog() {
  const [logs, setLogs] = useState([
    { time: '12:45:32', msg: 'System initialized', type: 'info' },
    { time: '12:45:35', msg: 'VAE model loaded', type: 'success' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const activity = generateActivity()
      setLogs(prev => [
        { 
          time: new Date().toLocaleTimeString('en-US', { hour12: false }), 
          msg: activity.msg, 
          type: activity.type 
        },
        ...prev.slice(0, 19)
      ])
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const getTypeColor = (type) => {
    const colors = {
      info: 'text-cyber-cyan',
      success: 'text-cyber-green',
      warning: 'text-cyber-orange',
      error: 'text-cyber-red',
    }
    return colors[type] || colors.info
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
        <Terminal className="w-5 h-5 mr-2" />
        Real-Time Activity Log
      </h3>
      <div className="bg-cyber-dark rounded-xl p-4 h-64 overflow-y-auto font-mono text-sm">
        {logs.map((log, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-1 border-b border-cyber-dark-3 last:border-0"
          >
            <span className="text-gray-500">[{log.time}]</span>
            <span className={`ml-2 ${getTypeColor(log.type)}`}>{log.msg}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ChartsSection() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Federated Convergence
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={convergenceData}>
            <defs>
              <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
            <XAxis dataKey="round" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} domain={[60, 100]} />
            <Tooltip 
              contentStyle={{ background: '#0f1923', border: '1px solid #00f0ff' }}
              labelStyle={{ color: '#00f0ff' }}
            />
            <Area 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#00f0ff" 
              fillOpacity={1} 
              fill="url(#colorAcc)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Latency Distribution
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={latencyData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
            <XAxis type="number" stroke="#666" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ background: '#0f1923', border: '1px solid #00f0ff' }}
              labelStyle={{ color: '#00f0ff' }}
            />
            <Bar dataKey="value" fill="#00f0ff" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
          <Network className="w-5 h-5 mr-2" />
          Node Trust Scores
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={trustData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
            <XAxis dataKey="node" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#0f1923', border: '1px solid #00f0ff' }}
              labelStyle={{ color: '#00f0ff' }}
            />
            <Bar dataKey="trust">
              {trustData.map((entry, index) => (
                <Cell 
                  key={index} 
                  fill={entry.trust >= 90 ? '#00ff88' : entry.trust > 0 ? '#ff9500' : '#666'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Detection Performance
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={[
                { name: 'True Positive', value: 156, color: '#00ff88' },
                { name: 'False Positive', value: 12, color: '#ff9500' },
                { name: 'False Negative', value: 8, color: '#ff3366' },
                { name: 'True Negative', value: 324, color: '#00f0ff' },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {[
                { name: 'True Positive', value: 156, color: '#00ff88' },
                { name: 'False Positive', value: 12, color: '#ff9500' },
                { name: 'False Negative', value: 8, color: '#ff3366' },
                { name: 'True Negative', value: 324, color: '#00f0ff' },
              ].map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#0f1923', border: '1px solid #00f0ff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {[
            { label: 'TP', color: '#00ff88' },
            { label: 'FP', color: '#ff9500' },
            { label: 'FN', color: '#ff3366' },
            { label: 'TN', color: '#00f0ff' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ConfigurationPanel() {
  const configs = [
    { label: 'Byzantine Threshold', value: 0.2, max: 0.5, step: 0.05 },
    { label: 'Feature Dimension', value: 42, max: 100, step: 1 },
    { label: 'Krum Threshold Scale', value: 3.0, max: 5, step: 0.5 },
    { label: 'Latent Dimension', value: 32, max: 64, step: 1 },
    { label: 'Privacy ε', value: 2.4, max: 5, step: 0.1 },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-cyber-cyan mb-6 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        Configuration Parameters
      </h3>
      <div className="space-y-6">
        {configs.map((config, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">{config.label}</span>
              <span className="text-cyber-cyan font-mono font-bold">{config.value}</span>
            </div>
            <input
              type="range"
              min={0}
              max={config.max}
              step={config.step}
              defaultValue={config.value}
              className="w-full h-2 bg-cyber-dark-3 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Footer() {
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass mt-6 py-4 border-t border-cyber-cyan/10"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500">Research Prototype Dashboard</span>
          <span className="text-sm text-gray-500">|</span>
          <span className="text-sm text-gray-500">Industrial IoT Security Monitoring Interface</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-sm text-gray-400">System Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-400 font-mono">{formatUptime(uptime)}</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

// ==================== MAIN APP ====================
function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <PipelineTimeline />
            <StatusCards />
            <LiveMetrics />
            <FederatedNodes />
            <ArchitecturePipeline />
            <ActivityLog />
            <ChartsSection />
          </div>
        )
      case 'config':
        return <ConfigurationPanel />
      case 'test':
        return (
          <div className="flex items-center justify-center h-96">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-12 text-center cursor-pointer border-2 border-cyber-cyan/30 hover:border-cyber-cyan"
            >
              <Play className="w-16 h-16 text-cyber-cyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Run Test</h3>
              <p className="text-gray-400">Click to execute the detection framework</p>
            </motion.div>
          </div>
        )
      case 'results':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'F1-Score', value: '94.2%', color: 'green' },
                { label: 'Precision', value: '92.8%', color: 'cyan' },
                { label: 'Recall', value: '95.6%', color: 'cyan' },
                { label: 'Accuracy', value: '96.1%', color: 'green' },
              ].map((item, idx) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className={`text-3xl font-bold text-cyber-${item.color} mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
            <ChartsSection />
          </div>
        )
      case 'about':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-8 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-cyber-cyan mb-4">About This Framework</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This intelligent network security framework integrates five complementary mechanisms for 
              Industrial IoT protection: one-class anomaly detection via Variational Autoencoders, 
              approximate nearest-neighbor signature matching using HNSW graphs, delayed-confirmation 
              response adaptation using Double Deep Q-Network, privacy-preserving federated optimization 
              with differential privacy, and Byzantine-robust aggregation with historical geometric validation.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The framework achieves 98.7% F1-score with 0.9% false-positive rate, 12.7ms average latency 
              on edge devices, and maintains 96.8% accuracy retention under 20% Byzantine client participation.
            </p>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-cyber-dark grid-pattern">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App