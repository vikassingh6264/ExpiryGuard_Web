import type { Mode } from '../types/gamification'
import { getAllModes } from '../services/modeService'

interface ModeSelectorProps {
  onModeSelect: (mode: Mode) => void
  currentMode?: Mode
}

export default function ModeSelector({ onModeSelect, currentMode }: ModeSelectorProps) {
  const modes = getAllModes()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Mode
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select the mode that best fits your use case
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {modes.map((modeConfig) => (
          <button
            key={modeConfig.mode}
            onClick={() => onModeSelect(modeConfig.mode)}
            className={`relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300 min-h-[44px] ${
              currentMode === modeConfig.mode
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-105 ring-4 ring-blue-300'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-lg hover:scale-102 border-2 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{modeConfig.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  {modeConfig.displayName}
                </h3>
                <p className={`text-sm mb-3 ${
                  currentMode === modeConfig.mode
                    ? 'text-white/90'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {modeConfig.dashboardLabels.emptyState}
                </p>
                <div className="flex flex-wrap gap-2">
                  {modeConfig.categories.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className={`text-xs px-2 py-1 rounded-full ${
                        currentMode === modeConfig.mode
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {category}
                    </span>
                  ))}
                  {modeConfig.categories.length > 3 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        currentMode === modeConfig.mode
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      +{modeConfig.categories.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {currentMode === modeConfig.mode && (
              <div className="absolute top-3 right-3 text-2xl">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
