import { usePrediction } from '../store/predictionContext'
import { groupNames } from '../data/groups'

export default function ProgressBar() {
  const { state, thirdPickCount, t } = usePrediction()
  const { phase, groupAdvances } = state

  if (phase !== 'groups') return null

  const filledGroups = groupNames.filter(g => groupAdvances[g].length >= 2).length
  const pct = Math.round(((filledGroups / 12) * 50) + ((thirdPickCount / 8) * 50))

  return (
    <div className="px-3 sm:px-4 pt-4 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
        <span>{t('progressTitle')}</span>
        <span className="font-mono">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${(filledGroups / 12) * 50}%` }}
        />
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(thirdPickCount / 8) * 50}%` }}
        />
      </div>
      <div className="flex text-xs text-gray-600 mt-0.5 gap-x-4 gap-y-1 flex-wrap">
        <span>{t('progressGroups')} {filledGroups}/12</span>
        <span>{t('progressThird')} {thirdPickCount}/8</span>
      </div>
    </div>
  )
}
