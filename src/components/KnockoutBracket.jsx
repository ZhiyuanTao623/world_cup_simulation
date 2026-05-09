import { usePrediction } from '../store/predictionContext'
import { getTeamByName } from '../data/groups'
import { r32Pairings, r16Pairings, qfPairings, sfPairings, finalPairing, parseSlot } from '../data/bracket'
import Flag from './Flag'
import { FIFA_TICKETS_URL } from '../utils/ticketmaster'
import { formatDate } from '../i18n'

const BRACKET_H = 840
const CONN_W = 28

const LEFT_R32 = ['m73','m75','m74','m77','m81','m82','m83','m84']
const LEFT_R16 = ['m90','m89','m94','m93']
const LEFT_QF = ['m97','m98']
const LEFT_SF = ['m101']

const RIGHT_R32 = ['m76','m78','m79','m80','m86','m88','m85','m87']
const RIGHT_R16 = ['m91','m92','m95','m96']
const RIGHT_QF = ['m99','m100']
const RIGHT_SF = ['m102']

const allPairings = [...r32Pairings, ...r16Pairings, ...qfPairings, ...sfPairings, finalPairing]
const pairingById = Object.fromEntries(allPairings.map(pairing => [pairing.id, pairing]))

function resolveSlot(slot, groupAdvances, thirdPlacePicks) {
  const parsed = parseSlot(slot)
  if ('tp' in parsed) return thirdPlacePicks[parsed.tp] ?? null
  return groupAdvances[parsed.group]?.[parsed.rank] ?? null
}

function resolveMatch(pairing, groupAdvances, thirdPlacePicks, winners) {
  if ('home' in pairing) {
    return {
      home: resolveSlot(pairing.home, groupAdvances, thirdPlacePicks),
      away: resolveSlot(pairing.away, groupAdvances, thirdPlacePicks),
    }
  }
  return { home: winners[pairing.homeFrom] ?? null, away: winners[pairing.awayFrom] ?? null }
}

function TeamRow({ team, isWinner, onClick, teamLabel, t }) {
  const data = team ? getTeamByName(team) : null

  return (
    <button
      onClick={onClick}
      disabled={!team}
      className={[
        'w-full flex items-center gap-1.5 px-2 py-[5px] text-xs transition-all leading-none',
        team ? 'cursor-pointer' : 'cursor-default',
        isWinner
          ? 'bg-yellow-400/20 text-yellow-300 font-bold'
          : team ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600',
      ].join(' ')}
    >
      <Flag code={data?.code} name={team} className="w-5 h-auto rounded-sm flex-shrink-0" />
      <span className="truncate flex-1">{team ? teamLabel(team) : t('tbd')}</span>
      {isWinner && <span className="text-yellow-400 ml-auto">✓</span>}
    </button>
  )
}

function BracketMatchCard({
  id,
  groupAdvances,
  thirdPlacePicks,
  winners,
  dispatch,
  language,
  t,
  teamLabel,
  isFinal = false,
}) {
  const pairing = pairingById[id]
  const { home, away } = resolveMatch(pairing, groupAdvances, thirdPlacePicks, winners)
  const winner = winners[id]
  const tmMain = 'https://www.ticketmaster.com/2026-world-cup-tickets/artist/4067734'
  const isSpecific = pairing.tmUrl !== tmMain

  function pick(team) {
    if (team) dispatch({ type: 'SET_WINNER', matchId: id, team })
  }

  return (
    <div
      className={[
        'flex-shrink-0 rounded-lg overflow-hidden border flex flex-col',
        isFinal
          ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 bg-gray-900'
          : 'border-gray-700 bg-gray-900',
      ].join(' ')}
      style={{ width: 'var(--card-w)' }}
    >
      {isFinal && (
        <div className="bg-yellow-400 text-gray-900 text-[10px] font-black text-center py-0.5 tracking-widest">
          {t('final').toUpperCase()}
        </div>
      )}
      <TeamRow team={home} isWinner={winner === home} onClick={() => pick(home)} teamLabel={teamLabel} t={t} />
      <div className="h-px bg-gray-800" />
      <TeamRow team={away} isWinner={winner === away} onClick={() => pick(away)} teamLabel={teamLabel} t={t} />
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-950/50 border-t border-gray-800">
        <span className="text-gray-600 text-[9px] truncate flex-1 leading-tight">
          {pairing.city} · {formatDate(pairing.date, language)}
        </span>
        <a
          href={pairing.tmUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={isSpecific ? t('ticketSpecific') : t('ticketGeneral')}
          className="text-[#026CDF] hover:text-blue-300 transition text-sm flex-shrink-0"
        >
          🎟
        </a>
        <a
          href={FIFA_TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={t('fifaTickets')}
          className="text-gray-600 hover:text-white transition text-sm flex-shrink-0"
        >
          ⚽
        </a>
      </div>
    </div>
  )
}

function BracketColumn({ ids, ...cardProps }) {
  return (
    <div className="flex flex-col justify-around flex-shrink-0" style={{ height: 'var(--bracket-h)' }}>
      {ids.map(id => (
        <BracketMatchCard key={id} id={id} {...cardProps} />
      ))}
    </div>
  )
}

function Connectors({ count, side = 'right' }) {
  const lines = []

  for (let i = 0; i < count; i++) {
    const top = ((4 * i + 1) / (4 * count)) * BRACKET_H
    const bot = ((4 * i + 3) / (4 * count)) * BRACKET_H
    const mid = ((2 * i + 1) / (2 * count)) * BRACKET_H
    const x0 = side === 'right' ? 0 : CONN_W
    const x1 = side === 'right' ? CONN_W : 0

    lines.push(
      <line key={`v${i}`} x1={x0} y1={top} x2={x0} y2={bot} stroke="#374151" strokeWidth="1.5" />,
      <line key={`h${i}`} x1={x0} y1={mid} x2={x1} y2={mid} stroke="#374151" strokeWidth="1.5" />,
    )
  }

  return (
    <svg
      viewBox={`0 0 ${CONN_W} ${BRACKET_H}`}
      preserveAspectRatio="none"
      className="flex-shrink-0"
      style={{ width: 'var(--connector-w)', height: 'var(--bracket-h)' }}
    >
      {lines}
    </svg>
  )
}

function HorzConnector() {
  return (
    <svg
      viewBox={`0 0 ${CONN_W} ${BRACKET_H}`}
      preserveAspectRatio="none"
      className="flex-shrink-0"
      style={{ width: 'var(--connector-w)', height: 'var(--bracket-h)' }}
    >
      <line x1={0} y1={BRACKET_H / 2} x2={CONN_W} y2={BRACKET_H / 2} stroke="#374151" strokeWidth="1.5" />
    </svg>
  )
}

function getRoundLabels(t, language) {
  const round32Range = language === 'zh' ? '6月28日-7月3日' : 'Jun 28-Jul 3'
  const round16Range = language === 'zh' ? '7月4日-7日' : 'Jul 4-7'
  const qfRange = language === 'zh' ? '7月9日-11日' : 'Jul 9-11'
  const sfRange = language === 'zh' ? '7月14日-15日' : 'Jul 14-15'

  const left = [
    `${t('round32')} (${round32Range})`,
    `${t('round16')} (${round16Range})`,
    `${t('quarterFinal')} (${qfRange})`,
    `${t('semiFinal')} (${sfRange})`,
  ]

  return {
    left,
    right: [...left].reverse(),
    final: `${t('final')} (${formatDate('Jul 19', language)})`,
  }
}

function HeaderRow({ t, language }) {
  const labels = getRoundLabels(t, language)

  return (
    <div className="flex items-end pb-2 min-w-max px-3 sm:px-4 gap-0">
      {labels.left.map((label, i) => (
        <div key={`l${i}`} className="flex flex-shrink-0">
          <div style={{ width: 'var(--card-w)' }} className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">{label}</div>
          <div style={{ width: 'var(--connector-w)' }} />
        </div>
      ))}
      <div style={{ width: 'var(--card-w)' }} className="text-center text-[10px] font-bold text-yellow-500 uppercase tracking-wider truncate">
        {labels.final}
      </div>
      {labels.right.map((label, i) => (
        <div key={`r${i}`} className="flex flex-shrink-0">
          <div style={{ width: 'var(--connector-w)' }} />
          <div style={{ width: 'var(--card-w)' }} className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function KnockoutBracket() {
  const { state, dispatch, thirdPlacePicks, language, t, teamLabel } = usePrediction()
  const { groupAdvances, winners } = state
  const champion = winners[finalPairing.id]
  const championData = champion ? getTeamByName(champion) : null

  const cardProps = { groupAdvances, thirdPlacePicks, winners, dispatch, language, t, teamLabel }

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between mb-4 px-3 sm:px-4 max-w-7xl mx-auto flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">{t('bracketTitle')}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{t('bracketHelp')}</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', phase: 'groups' })}
          className="text-sm text-gray-400 hover:text-white px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          ← {t('backGroups')}
        </button>
      </div>

      {champion && (
        <div className="text-center mb-6 mx-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl max-w-xs mx-auto">
          <Flag code={championData?.code} name={champion} className="w-14 h-auto rounded mx-auto mb-1 shadow" />
          <div className="text-yellow-400 font-black text-lg">{teamLabel(champion)}</div>
          <div className="text-gray-400 text-xs">{t('championLabel')}</div>
        </div>
      )}

      <div className="bracket-stage overflow-x-auto pb-4">
        <HeaderRow t={t} language={language} />

        <div className="flex items-stretch min-w-max px-3 sm:px-4 gap-0" style={{ height: 'var(--bracket-h)' }}>
          <BracketColumn ids={LEFT_R32} {...cardProps} />
          <Connectors count={4} side="right" />
          <BracketColumn ids={LEFT_R16} {...cardProps} />
          <Connectors count={2} side="right" />
          <BracketColumn ids={LEFT_QF} {...cardProps} />
          <Connectors count={1} side="right" />
          <BracketColumn ids={LEFT_SF} {...cardProps} />
          <HorzConnector />

          <div className="flex items-center justify-center flex-shrink-0" style={{ width: 'var(--card-w)' }}>
            <BracketMatchCard id="m104" {...cardProps} isFinal />
          </div>

          <HorzConnector />
          <BracketColumn ids={RIGHT_SF} {...cardProps} />
          <Connectors count={1} side="left" />
          <BracketColumn ids={RIGHT_QF} {...cardProps} />
          <Connectors count={2} side="left" />
          <BracketColumn ids={RIGHT_R16} {...cardProps} />
          <Connectors count={4} side="left" />
          <BracketColumn ids={RIGHT_R32} {...cardProps} />
        </div>
      </div>
    </div>
  )
}
