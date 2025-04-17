import React from 'react'
import { useTheme } from './context/ThemeContext'

const App = ({ children }) => {
    const { dark, toggleTheme } = useTheme()

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <header className="flex justify-end p-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    {dark ? '☀️ Light' : '🌙 Dark'}
                </button>
            </header>
            <main>{children}</main>
        </div>
    )
}

export default App