'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 border border-border/50 dark:border-white/10 transition-all hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      <div
        className={`relative w-5 h-5 transition-transform duration-300 ${theme === 'dark' ? 'rotate-0' : 'rotate-180'}`}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-foreground/80" />
        ) : (
          <Sun className="w-5 h-5 text-foreground/80" />
        )}
      </div>
    </button>
  )
}

