import { PredictionProvider, usePrediction } from './store/predictionContext'
import ProgressBar from './components/ProgressBar'
import GroupStage from './components/GroupStage'
import KnockoutBracket from './components/KnockoutBracket'

function AppContent() {
  const { state, language, setLanguage, t } = usePrediction()

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">⚽</span>
          <div className="min-w-0">
            <h1 className="text-lg font-black text-white leading-tight">FIFA World Cup 2026</h1>
            <p className="text-xs text-yellow-400 font-medium truncate">{t('appTagline')}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-shrink-0">
            <div className="flex rounded-lg overflow-hidden border border-gray-700 bg-gray-950">
              {['zh', 'en'].map(option => (
                <button
                  key={option}
                  onClick={() => setLanguage(option)}
                  className={[
                    'px-2.5 py-1 text-xs font-bold transition',
                    language === option
                      ? 'bg-yellow-400 text-gray-950'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  ].join(' ')}
                >
                  {option === 'zh' ? '中' : 'EN'}
                </button>
              ))}
            </div>
            <span className={[
              'text-xs font-bold px-2 py-1 rounded',
              state.phase === 'groups' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-400/20 text-yellow-400',
            ].join(' ')}>
              {state.phase === 'groups' ? t('phaseGroups') : t('phaseBracket')}
            </span>
          </div>
        </div>
      </header>

      <ProgressBar />

      <main className="w-full max-w-7xl mx-auto mt-4 sm:mt-6 overflow-x-hidden">
        {state.phase === 'groups' && <GroupStage />}
        {state.phase === 'bracket' && <KnockoutBracket />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <PredictionProvider>
      <AppContent />
    </PredictionProvider>
  )
}
