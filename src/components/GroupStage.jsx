import { groupNames } from '../data/groups'
import { usePrediction } from '../store/predictionContext'
import GroupCard from './GroupCard'

export default function GroupStage() {
  const { state, groupsDone, thirdPickCount, dispatch, t } = usePrediction()

  const filledGroups = groupNames.filter(g => state.groupAdvances[g].length >= 2).length
  const thirdRemaining = 8 - thirdPickCount

  return (
    <div className="px-3 sm:px-4 pb-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t('groupStageTitle')}</h2>
        <p className="text-gray-400 text-sm mt-1">{t('groupStageHelp')}</p>
      </div>

      <div className="flex items-center justify-center gap-x-6 gap-y-2 mb-6 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" />
          <span className="text-gray-300">
            {t('groupsFilled')}: <span className="font-bold text-white">{filledGroups}</span>/12
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
          <span className="text-gray-300">
            {t('thirdPicked')}: <span className="font-bold text-white">{thirdPickCount}</span>/8
            {thirdPickCount < 8 && (
              <span className="text-gray-500 ml-1">({t('remaining')} {thirdRemaining})</span>
            )}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {groupNames.map(letter => (
          <GroupCard key={letter} groupLetter={letter} />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-4 flex-col items-center">
        {!groupsDone && (
          <p className="text-gray-500 text-sm text-center">
            {filledGroups < 12
              ? t('incompleteGroups', { count: 12 - filledGroups })
              : t('incompleteThird', { count: 8 - thirdPickCount })}
          </p>
        )}
        <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="px-5 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm transition"
          >
            {t('reset')}
          </button>
          <button
            onClick={() => groupsDone && dispatch({ type: 'SET_PHASE', phase: 'bracket' })}
            disabled={!groupsDone}
            className={[
              'px-6 py-2 rounded-lg font-bold text-sm transition-all',
              groupsDone
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/30 cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed',
            ].join(' ')}
          >
            {t('goBracket')}
          </button>
        </div>
      </div>
    </div>
  )
}
