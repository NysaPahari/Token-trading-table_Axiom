'use client'

export function BottomBar() {
  return (
    <div className="w-full bg-[#0a0e27] border-t border-[#1a1f3a] px-4 py-2 flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center gap-4">
        <span className="text-white font-semibold">PRESET 1</span>
        <a href="#" className="hover:text-white transition-colors">Wallet</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">Discover</a>
        <a href="#" className="hover:text-white transition-colors">Pulse</a>
        <a href="#" className="hover:text-white transition-colors">PnL</a>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-gray-500">$95.8K</span>
        <span className="text-gray-500">$3151</span>
        <span className="text-gray-500">$140.98</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-green-400">Connection is stable</span>
        </div>
        <span className="text-gray-500">GLOBAL</span>
      </div>
    </div>
  )
}

