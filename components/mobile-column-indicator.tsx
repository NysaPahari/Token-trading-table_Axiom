'use client'
import { memo, useEffect, useState } from 'react'

interface ColumnConfig {
  title: string
  tokens: any[]
  category: string
  isGradientAnimated?: boolean
}

interface MobileColumnIndicatorProps {
  columns: ColumnConfig[]
  containerRef: React.RefObject<HTMLDivElement>
}

function MobileColumnIndicatorComponent({
  columns,
  containerRef,
}: MobileColumnIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const columnWidth = container.offsetWidth
      const index = Math.round(scrollLeft / columnWidth)
      setActiveIndex(Math.min(index, columns.length - 1))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerRef, columns.length])

  const handleDotClick = (index: number) => {
    if (containerRef.current) {
      const columnWidth = containerRef.current.offsetWidth
      containerRef.current.scrollTo({
        left: index * columnWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 py-2">
      {columns.map((column, index) => (
        <button
          key={column.category}
          onClick={() => handleDotClick(index)}
          className={`h-2 rounded-full transition-all ${
            index === activeIndex
              ? 'bg-[#667AFF] w-6'
              : 'bg-gray-600 hover:bg-gray-500 w-2'
          }`}
          aria-label={`Go to ${column.title} column`}
        />
      ))}
    </div>
  )
}

export const MobileColumnIndicator = memo(MobileColumnIndicatorComponent)

