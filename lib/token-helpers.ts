export type Category = 'new-pairs' | 'final-stretch' | 'migrated' | string

export function getIconBorderColor(category: Category) {
  switch (category) {
    case 'new-pairs':
      return 'border-yellow-500'
    case 'final-stretch':
      return 'border-green-500'
    case 'migrated':
      return 'border-red-500'
    default:
      return 'border-gray-500'
  }
}

export function getHoverLabel(category: Category) {
  switch (category) {
    case 'new-pairs':
      return 'Bonding'
    case 'final-stretch':
      return 'Migrating'
    case 'migrated':
      return 'Migrated'
    default:
      return ''
  }
}

export function getIconColor(gradient: string) {
  const colors: Record<string, string> = {
    'from-blue-500 to-blue-600': 'bg-blue-500',
    'from-purple-400 to-pink-400': 'bg-purple-400',
    'from-amber-300 to-orange-400': 'bg-yellow-400',
    'from-green-400 to-emerald-500': 'bg-green-500',
    'from-yellow-400 to-orange-500': 'bg-yellow-400',
    'from-cyan-400 to-blue-500': 'bg-cyan-400',
    'from-lime-300 to-green-500': 'bg-lime-400',
    'from-pink-400 to-rose-500': 'bg-pink-400',
    'from-slate-400 to-slate-600': 'bg-gray-500',
    'from-red-400 to-red-600': 'bg-red-500',
    'from-red-500 to-orange-600': 'bg-red-500',
    'from-orange-400 to-amber-500': 'bg-orange-400',
    'from-yellow-500 to-yellow-600': 'bg-yellow-500',
  }
  return colors[gradient] || 'bg-gray-500'
}

export function getLabelValue(category: Category) {
  switch (category) {
    case 'new-pairs':
      return '6.44%'
    case 'final-stretch':
      return '50%'
    case 'migrated':
      return 'Migrated'
    default:
      return ''
  }
}
