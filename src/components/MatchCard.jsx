import { FIFA_TICKETS_URL } from '../utils/ticketmaster'
import { usePrediction } from '../store/predictionContext'
import { getTeamByName } from '../data/groups'
import Flag from './Flag'

const TM_MAIN = 'https://www.ticketmaster.com/2026-world-cup-tickets/artist/4067734'

export default function MatchCard({ matchId, homeTeam, awayTeam, venue, city, date, tmUrl, isFinal = false }) {
  const { state, dispatch } = usePrediction()
  const winner = state.winners[matchId]
  const isSpecificLink = tmUrl && tmUrl !== TM_MAIN

  function pick(team) {
    if (!team) return
    dispatch({ type: 'SET_WINNER', matchId, team })
  }

  return (
    <div className={[
      'bg-gray-900 border rounded-xl overflow-hidden w-48 flex-shrink-0 flex flex-col',
      isFinal ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' : 'border-gray-700',
    ].join(' ')}>
      {isFinal && (
        <div className="bg-yellow-400 text-gray-900 text-xs font-black text-center py-1 tracking-wider">
          🏆 FINAL
        </div>
      )}

      <TeamSlot team={homeTeam} isWinner={winner === homeTeam} onPick={() => pick(homeTeam)} />
      <div className="text-center text-gray-600 text-xs py-0.5 border-y border-gray-800 bg-gray-950/40">VS</div>
      <TeamSlot team={awayTeam} isWinner={winner === awayTeam} onPick={() => pick(awayTeam)} />

      <div className="px-2.5 pb-2.5 pt-2 flex flex-col gap-1.5 mt-auto">
        <div className="text-center leading-tight">
          <div className="text-gray-400 text-xs font-medium truncate" title={venue}>{venue}</div>
          <div className="text-gray-500 text-xs">{city}</div>
          <div className="text-gray-600 text-xs">{date}</div>
        </div>
        <a
          href={tmUrl || TM_MAIN}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs font-bold py-1.5 rounded-lg bg-[#026CDF] hover:bg-[#0258b8] text-white transition"
        >
          🎟 {isSpecificLink ? '直达购票' : '浏览场次'}
        </a>
        <a
          href={FIFA_TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs font-semibold py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition border border-gray-700/50"
        >
          ⚽ FIFA 官方
        </a>
      </div>
    </div>
  )
}

function TeamSlot({ team, isWinner, onPick }) {
  const teamData = team ? getTeamByName(team) : null
  return (
    <button
      onClick={onPick}
      disabled={!team}
      className={[
        'w-full flex items-center gap-2 px-2.5 py-2 transition-all',
        team ? 'cursor-pointer' : 'cursor-default',
        isWinner ? 'bg-yellow-400/20 text-yellow-300 font-bold'
          : team  ? 'text-gray-300 hover:bg-gray-800'
          :         'text-gray-700',
      ].join(' ')}
    >
      <Flag
        code={teamData?.code}
        name={team}
        className="w-6 h-auto rounded-sm flex-shrink-0"
      />
      <span className="flex-1 text-left text-xs truncate">{team || 'TBD'}</span>
      {isWinner && <span className="text-yellow-400 text-xs">✓</span>}
    </button>
  )
}
