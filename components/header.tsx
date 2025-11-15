'use client'

export function Header() {
  return (
    <header className="bg-[#0a0e27] border-b border-[#1a1f3a] sticky top-0 z-50">
      {/* Main navigation bar */}
      <div className="px-3 sm:px-6 py-3 flex items-center justify-between border-b border-[#1a1f3a] flex-wrap gap-2">
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <div className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>▲</span>
            <span className="hidden sm:inline">AXIOM Pro</span>
            <span className="sm:hidden">AXIOM</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 ml-2 sm:ml-4">
            {['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Yield', 'Vision', 'Portfolio'].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    item === 'Pulse' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1a1f3a] border border-[#2a2f4a] rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-400 w-24 sm:w-48"
          />
          <button className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-gray-400 hover:text-white text-xs sm:text-sm border border-[#2a2f4a] rounded">
            <span>SOL</span>
            <span className="text-xs">▼</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 rounded font-medium text-white text-xs sm:text-sm transition-colors">
            Deposit
          </button>
          <button className="text-gray-400 hover:text-white text-base sm:text-lg p-1">★</button>
          <button className="text-gray-400 hover:text-white text-base sm:text-lg p-1">🔔</button>
          <div className="hidden sm:flex items-center gap-1.5 text-gray-400 text-xs cursor-pointer px-2">
            <span>📊</span>
            <span>0</span>
            <span className="text-gray-600">0</span>
          </div>
          <button className="text-gray-400 hover:text-white text-base sm:text-lg p-1">👤</button>
        </div>
      </div>

      {/* Pulse section header */}
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between bg-[#0a0e27] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-xs sm:text-sm">Pulse</span>
          <button className="p-1 text-gray-400 hover:text-white text-xs">⚡</button>
          <button className="p-1 text-gray-400 hover:text-white text-xs">📦</button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button className="text-xs text-gray-400 hover:text-white px-2 py-1 border border-[#2a2f4a] rounded">
            Display
          </button>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button className="text-gray-400 hover:text-white p-1 text-xs sm:text-sm">⊞</button>
            <button className="text-gray-400 hover:text-white p-1 text-xs sm:text-sm">📋</button>
            <button className="text-gray-400 hover:text-white p-1 text-xs sm:text-sm">🔊</button>
            <button className="text-gray-400 hover:text-white p-1 text-xs sm:text-sm">⚙️</button>
            <button className="text-gray-400 hover:text-white p-1 text-xs sm:text-sm">📌</button>
          </div>
          <span className="hidden sm:inline text-gray-400 text-sm font-mono">1 SOL</span>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <span>⚡</span>
            <span>0</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-gray-400 text-xs">
            <span>≡</span>
            <span>P1</span>
            <span>P2</span>
            <span>P3</span>
            <span>⇅</span>
          </div>
        </div>
      </div>
    </header>
  )
}
