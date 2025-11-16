 'use client'

import React, { memo, useEffect, useRef, useState } from 'react'

function HeaderComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pulseMenuOpen, setPulseMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const pulseMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
      if (pulseMenuRef.current && !pulseMenuRef.current.contains(e.target as Node)) {
        setPulseMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <header className="bg-[#000000] sticky top-0 z-50">
      <div className="px-4 py-3 min-h-[72px] flex items-center justify-between border-b border-[#1a1f3a]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <div className="w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-b-[26px] border-b-white"></div>
            </div>
            
            <div className="text-white">
              <div className="text-white flex flex-col md:flex-row md:items-center md:gap-2 justify-center">
                <span className="text-lg sm:text-2xl font-normal leading-tight">AXIOM</span>
                <span className="text-sm sm:text-lg font-normal leading-tight md:ml-2">Pro</span>
              </div>
            </div>

          </div>
          <nav className="hidden md:flex gap-6 ml-8">
            {['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Yield', 'Vision', 'Portfolio'].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                    item === 'Pulse' 
                      ? 'text-[#667AFF]' 
                      : 'text-white hover:text-[#667AFF] hover:bg-[#667AFF]/8'
                  }`}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search by token or CA..."
              className="border border-[#2a2f4a] rounded-3xl pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-400 w-48"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
                    {/* Hamburger icon for mobile */}
                    <div className="md:hidden flex items-center">
                      <button className="text-white text-3xl px-2 py-1 ml-2"><span>☰</span></button>
                    </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#1a1f3a] border border-[#2a2f4a] rounded-3xl text-gray-300 hover:bg-[#2a2f4a] text-sm transition-colors">
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" className="text-violet-600">
              <path d="M2 4L6 2L10 4L6 6L2 4Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 8L6 6L10 8L6 10L2 8Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 6L6 4L10 6L6 8L2 6Z" fill="currentColor"/>
            </svg>
            <span>SOL</span>
            <span>▼</span>
          </button>
          <button className="bg-[#667AFF] hover:bg-[#295EFF] px-6 py-2 rounded-3xl font-medium text-black transition-colors">
            Deposit
          </button>
          <button className="text-gray-400 hover:text-white text-lg transition-colors">★</button>
          <button className="text-gray-400 hover:text-white text-lg transition-colors">🔔</button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1f3a] border border-[#2a2f4a] rounded-3xl text-gray-300 hover:bg-[#2a2f4a] transition-colors text-sm">
            <span>💼</span>
            <span>0</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-purple-400">
              <path d="M2 4L6 2L10 4L6 6L2 4Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 8L6 6L10 8L6 10L2 8Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 6L6 4L10 6L6 8L2 6Z" fill="currentColor"/>
            </svg>
            <span>0</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-yellow-400">
              <path d="M3 2L6 1L9 2V4L6 5L3 4V2Z" fill="currentColor"/>
              <path d="M3 4L6 5L9 4V6L6 7L3 6V4Z" fill="currentColor" opacity="0.7"/>
              <path d="M3 6L6 7L9 6V8L6 9L3 8V6Z" fill="currentColor" opacity="0.5"/>
            </svg>
            <span>▼</span>
          </button>
          <button className="text-gray-400 hover:text-white text-lg transition-colors">👤</button>
        </div>
      </div>

      {/* Tab section with controls */}
        {/* Icon row */}
        <div className="px-6 py-1 flex items-center gap-2 bg-[#000000] border-b border-[#1a1f3a]">
          <button className="text-white hover:text-white text-xs p-1 transition-colors">⚙️</button>
          <button className="text-white hover:text-white text-xs p-1 transition-colors">★</button>
          <button className="text-white hover:text-white text-xs p-1 transition-colors">📈</button>
        </div>

        {/* Tab section with controls */}
        <div className="px-6 py-2.5 flex items-center gap-4 bg-[#000000]">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium text-lg">Pulse</span>
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
          <button className="text-gray-400 hover:text-white p-1 text-sm transition-colors">?</button>
          <button className="flex items-center gap-2 bg-[#1a1f3a] border border-[#2a2f4a] rounded-3xl px-3 py-1 text-gray-300 hover:bg-[#2a2f4a] transition-colors text-sm">
            <span>☰</span>
            <span className="font-medium">Display</span>
            <span>▼</span>
          </button>
          <button className="text-gray-400 hover:text-white p-1 text-sm transition-colors">🔖</button>
          <button className="text-gray-400 hover:text-white p-1 text-sm transition-colors">⊞</button>
          <button className="text-gray-400 hover:text-white p-1 text-sm transition-colors">🔊</button>
          <button className="text-gray-400 hover:text-white p-1 text-sm transition-colors">🎯</button>
          <button className="flex items-center gap-1.5 bg-[#1a1f3a] border border-[#2a2f4a] rounded-3xl px-3 py-1 text-gray-300 hover:bg-[#2a2f4a] transition-colors text-sm">
            <span>💼</span>
            <span>1</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-purple-400">
              <path d="M2 4L6 2L10 4L6 6L2 4Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 8L6 6L10 8L6 10L2 8Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 6L6 4L10 6L6 8L2 6Z" fill="currentColor"/>
            </svg>
            <span>0</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-yellow-400">
              <path d="M3 2L6 1L9 2V4L6 5L3 4V2Z" fill="currentColor"/>
              <path d="M3 4L6 5L9 4V6L6 7L3 6V4Z" fill="currentColor" opacity="0.7"/>
              <path d="M3 6L6 7L9 6V8L6 9L3 8V6Z" fill="currentColor" opacity="0.5"/>
            </svg>
            <span>▼</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
