import { groups, groupNames } from '../data/groups'
import { usePrediction } from '../store/predictionContext'

export default function ThirdPlaceStage() {
  const { state, dispatch, thirdPlaceDone, language, t, teamLabel } = usePrediction()
  const { groupAdvances, thirdPlacePicks } = state

  const thirdPlaceTeams = groupNames.map(letter => {
    const advanced = groupAdvances[letter]
    const third = groups[letter].teams.find(team => !advanced.includes(team.name))
    return { ...third, group: letter }
  })

  function toggle(teamName) {
    dispatch({ type: 'TOGGLE_THIRD_PLACE', team: teamName })
  }

  return (
    <div className="px-3 sm:px-4 pb-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">{t('thirdPlaceTitle')}</h2>
        <p className="text-gray-400 text-sm mt-1">
          {t('thirdPlaceHelp', { count: 8 })}
          <span className="ml-3 text-gray-500">{thirdPlacePicks.length}/8 {t('selected')}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {thirdPlaceTeams.map(team => {
          const isSelected = thirdPlacePicks.includes(team.name)
          const isFull = thirdPlacePicks.length >= 8 && !isSelected

          return (
            <button
              key={team.name}
              onClick={() => !isFull && toggle(team.name)}
              disabled={isFull}
              className={[
                'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all',
                isSelected
                  ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/20'
                  : isFull
                  ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed border border-gray-800'
                  : 'bg-gray-900 border border-gray-700 text-gray-200 hover:bg-gray-800 hover:border-gray-600 cursor-pointer',
              ].join(' ')}
            >
              <span className="text-xl leading-none">{team.flag}</span>
              <div className="flex-1 text-left min-w-0">
                <div className="truncate">{teamLabel(team.name)}</div>
                <div className={`text-xs ${isSelected ? 'text-gray-700' : 'text-gray-500'}`}>
                  {language === 'zh' ? `${team.group} ${t('group')} ${t('thirdPlace')}` : `${t('group')} ${team.group} ${t('thirdPlace')}`}
                </div>
              </div>
              {isSelected && <span className="text-sm">✓</span>}
            </button>
          )
        })}
      </div>

      <div className="flex justify-center mt-8 gap-3 sm:gap-4 flex-wrap">
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', phase: 'groups' })}
          className="px-5 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm transition"
        >
          {t('backGroups')}
        </button>
        <button
          onClick={() => thirdPlaceDone && dispatch({ type: 'SET_PHASE', phase: 'bracket' })}
          disabled={!thirdPlaceDone}
          className={[
            'px-6 py-2 rounded-lg font-bold text-sm transition-all',
            thirdPlaceDone
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/30 cursor-pointer'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed',
          ].join(' ')}
        >
          {t('goBracket')}
        </button>
      </div>
    </div>
  )
}
