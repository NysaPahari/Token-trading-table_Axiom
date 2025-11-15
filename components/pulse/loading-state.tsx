'use client'

import { memo } from 'react'

export const LoadingState = memo(function LoadingState() {
  return (
    <div className="h-full min-h-screen bg-[#0a0e27] p-4 md:p-6">
      <div className="mb-6">
        <div className="h-10 w-40 bg-[#1a1f3a] rounded animate-pulse mb-2" />
        <div className="h-4 w-60 bg-[#1a1f3a] rounded animate-pulse" />
      </div>

      <div className="bg-[#1a1f3a] border border-[#2a3050] rounded-lg p-4 mb-6 animate-pulse">
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-[#0f1220] rounded" />
          <div className="h-10 w-32 bg-[#0f1220] rounded" />
          <div className="h-10 w-32 bg-[#0f1220] rounded ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-24 bg-[#1a1f3a] rounded animate-pulse" />
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1220] border border-[#2a3050] rounded-lg p-4 animate-pulse"
              >
                <div className="h-20 bg-[#0f1220] rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
})
