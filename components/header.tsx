'use client'

export function Header() {
  return (
    <header className="bg-[#0a0e27] border-b border-[#1a1f3a] sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-white">▲ AXIOM Pro</div>
          <nav className="flex gap-8 ml-12">
            {['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Yield', 'Vision', 'Portfolio'].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium transition-colors ${
                    item === 'Pulse' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by token or CA..."
            className="bg-[#1a1f3a] border border-[#2a2f4a] rounded-lg px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-400"
          />
          <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm">
            <span>SOL</span>
            <span>▼</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium text-white transition-colors">
            Deposit
          </button>
          <span className="text-gray-400 cursor-pointer text-lg">★</span>
          <span className="text-gray-400 cursor-pointer text-lg">🔔</span>
          <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <span>📊</span>
            <span>0</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <span>💎</span>
            <span>0</span>
          </div>
          <button className="text-gray-400 hover:text-white text-lg">▼</button>
          <button className="text-gray-400 hover:text-white text-lg">👤</button>
        </div>
      </div>

      {/* Tab section with controls */}
      <div className="px-6 py-3 flex items-center gap-4 border-t border-[#1a1f3a]">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium text-sm">Pulse</span>
          <button className="p-1 text-gray-400 hover:text-white">≡</button>
          <button className="p-1 text-gray-400 hover:text-white">📦</button>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-yellow-400 text-sm font-mono">⚡ 0</span>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span>≡</span>
            <span>P1</span>
            <span>P2</span>
            <span>P3</span>
            <span>⇅</span>
          </div>
          <div className="flex gap-3 ml-4">
            <button className="text-gray-400 hover:text-white p-1">📋</button>
            <button className="text-gray-400 hover:text-white p-1">⊞</button>
            <button className="text-gray-400 hover:text-white p-1">🔊</button>
            <button className="text-gray-400 hover:text-white p-1">⚙️</button>
            <button className="text-gray-400 hover:text-white p-1">📌</button>
          </div>
          <span className="text-gray-400 text-sm">1</span>
          <span className="text-gray-600 cursor-pointer ml-2">▼</span>
        </div>
      </div>
    </header>
  )
}
