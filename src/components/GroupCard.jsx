import { groups } from '../data/groups'
import { usePrediction } from '../store/predictionContext'
import Flag from './Flag'

const RANK_LABEL = ['1ST', '2ND', '3RD']

export default function GroupCard({ groupLetter }) {
  const { state, dispatch, thirdPickCount, language, t, teamLabel } = usePrediction()
  const { teams } = groups[groupLetter]
  const selected = state.groupAdvances[groupLetter]

  const thirdBlocked = selected.length < 3 && thirdPickCount >= 8

  function toggle(teamName) {
    dispatch({ type: 'TOGGLE_GROUP_ADVANCE', group: groupLetter, team: teamName })
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 flex flex-col gap-1.5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
          {language === 'zh' ? `${groupLetter} ${t('group')}` : `${t('group')} ${groupLetter}`}
        </span>
        <span className="text-xs text-gray-500 ml-auto">{selected.length}/3</span>
      </div>

      {teams.map(team => {
        const rank = selected.indexOf(team.name)
        const isSelected = rank !== -1
        const is3rd = rank === 2
        const wouldBe3rd = selected.length === 2 && !isSelected
        const isBlocked = !isSelected && (selected.length >= 3 || (wouldBe3rd && thirdBlocked))

        return (
          <button
            key={team.name}
            onClick={() => !isBlocked && toggle(team.name)}
            disabled={isBlocked}
            className={[
              'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 text-left w-full',
              isSelected && !is3rd ? 'bg-yellow-400 text-gray-900'
                : is3rd             ? 'bg-blue-500 text-white'
                : isBlocked         ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                :                     'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer',
            ].join(' ')}
          >
            <Flag code={team.code} name={team.name} className="w-6 h-auto rounded-sm flex-shrink-0" />
            <span className="flex-1 truncate text-xs">{teamLabel(team.name)}</span>
            {isSelected && (
              <span className={[
                'text-xs font-black shrink-0 px-1 py-0.5 rounded',
                is3rd ? 'bg-blue-700/50' : 'bg-yellow-600/30',
              ].join(' ')}>
                {RANK_LABEL[rank]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
