'use client'

export function Header() {
  return (
    <header className="bg-[#050810] border-b border-[#1a1f3a] sticky top-0 z-50">
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
          <span className="text-white font-medium text-base">Pulse</span>
          {/* Solana logo icon */}
          <button className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500/30 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 2L10 4L6 6L2 4Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 8L6 6L10 8L6 10L2 8Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 6L6 4L10 6L6 8L2 6Z" fill="currentColor"/>
            </svg>
          </button>
          {/* Golden cube icon */}
          <button className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 2L6 1L9 2V4L6 5L3 4V2Z" fill="currentColor"/>
              <path d="M3 4L6 5L9 4V6L6 7L3 6V4Z" fill="currentColor" opacity="0.7"/>
              <path d="M3 6L6 7L9 6V8L6 9L3 8V6Z" fill="currentColor" opacity="0.5"/>
            </svg>
          </button>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="text-gray-400 hover:text-white p-1.5 text-sm">?</button>
          <button className="flex items-center gap-2 bg-[#1a1f3a] border border-[#2a2f4a] rounded px-3 py-1.5 text-gray-300 hover:bg-[#2a2f4a] transition-colors text-sm">
            <span>☰</span>
            <span>Display</span>
            <span>▼</span>
          </button>
          <button className="text-gray-400 hover:text-white p-1.5 text-sm">🔖</button>
          <button className="text-gray-400 hover:text-white p-1.5 text-sm">⌨️</button>
          <button className="text-gray-400 hover:text-white p-1.5 text-sm">🔊</button>
          <button className="text-gray-400 hover:text-white p-1.5 text-sm">🎯</button>
          <button className="flex items-center gap-1.5 bg-[#1a1f3a] border border-[#2a2f4a] rounded px-3 py-1.5 text-gray-300 hover:bg-[#2a2f4a] transition-colors text-sm">
            <span>💼</span>
            <span>1</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-purple-400">
              <path d="M2 4L6 2L10 4L6 6L2 4Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 8L6 6L10 8L6 10L2 8Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 6L6 4L10 6L6 8L2 6Z" fill="currentColor"/>
            </svg>
            <span>0</span>
            <span>▼</span>
          </button>
        </div>
      </div>
    </header>
  )
}
