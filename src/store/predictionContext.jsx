import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { groupNames } from '../data/groups'
import { formatText, teamNamesZh, translations } from '../i18n'

const STORAGE_KEY = 'wc2026_v5'
const LANGUAGE_KEY = 'wc2026_language'

const allMatchIds = [
  'm73','m74','m75','m76','m77','m78','m79','m80','m81','m82','m83','m84','m85','m86','m87','m88',
  'm89','m90','m91','m92','m93','m94','m95','m96',
  'm97','m98','m99','m100',
  'm101','m102',
  'm104',
]

function buildInitialState() {
  return {
    // groupAdvances[g] = array of team names in selection order:
    //   [0] = 1st place (advances directly)
    //   [1] = 2nd place (advances directly)
    //   [2] = 3rd place (advances if one of 8 best) — optional
    groupAdvances: Object.fromEntries(groupNames.map(g => [g, []])),
    winners: Object.fromEntries(allMatchIds.map(id => [id, null])),
    phase: 'groups', // 'groups' | 'bracket'
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_GROUP_ADVANCE': {
      const { group, team } = action
      const current = state.groupAdvances[group]

      // Deselect
      if (current.includes(team)) {
        return { ...state, groupAdvances: { ...state.groupAdvances, [group]: current.filter(t => t !== team) } }
      }

      // Already at max 3 for this group
      if (current.length >= 3) return state

      // Adding 3rd pick: enforce global limit of 8
      if (current.length === 2) {
        const thirdCount = Object.values(state.groupAdvances).filter(a => a.length === 3).length
        if (thirdCount >= 8) return state
      }

      return { ...state, groupAdvances: { ...state.groupAdvances, [group]: [...current, team] } }
    }
    case 'SET_WINNER':
      return { ...state, winners: { ...state.winners, [action.matchId]: action.team } }
    case 'SET_PHASE':
      return { ...state, phase: action.phase }
    case 'RESET':
      return buildInitialState()
    default:
      return state
  }
}

const PredictionContext = createContext(null)

export function PredictionProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || 'zh'
    } catch {
      return 'zh'
    }
  })

  const [state, dispatch] = useReducer(reducer, null, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...buildInitialState(), ...JSON.parse(saved) }
    } catch {}
    return buildInitialState()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function setLanguage(nextLanguage) {
    setLanguageState(nextLanguage)
    try {
      localStorage.setItem(LANGUAGE_KEY, nextLanguage)
    } catch {}
  }

  function t(key, values) {
    return formatText(translations[language][key] ?? translations.en[key] ?? key, values)
  }

  function teamLabel(name) {
    if (!name) return t('tbd')
    return language === 'zh' ? teamNamesZh[name] ?? name : name
  }

  const thirdPickCount = groupNames.filter(g => state.groupAdvances[g].length === 3).length
  const groupsDone =
    groupNames.every(g => state.groupAdvances[g].length >= 2) && thirdPickCount === 8

  // 3rd-place picks in group-letter order → maps to bracket slots TP0–TP7
  const thirdPlacePicks = groupNames
    .filter(g => state.groupAdvances[g].length === 3)
    .map(g => state.groupAdvances[g][2])

  return (
    <PredictionContext.Provider
      value={{ state, dispatch, groupsDone, thirdPickCount, thirdPlacePicks, language, setLanguage, t, teamLabel }}
    >
      {children}
    </PredictionContext.Provider>
  )
}

export function usePrediction() {
  return useContext(PredictionContext)
}
