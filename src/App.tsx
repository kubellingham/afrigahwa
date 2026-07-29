import { useMemo, useState } from 'react'
import { QUESTIONS } from './data/questions'
import { computeMatches } from './matcher'
import { GRIND_OPTIONS, UI, t, whatsappMessage } from './i18n'
import { WHATSAPP_NUMBER } from './config'
import type { Lang, Match, Option } from './types'

type Screen = 'intro' | 'quiz' | 'results'

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [screen, setScreen] = useState<Screen>('intro')
  const [answers, setAnswers] = useState<Option[]>([])

  const start = () => {
    setAnswers([])
    setScreen('quiz')
  }

  return (
    <div className="app">
      <header className="masthead">
        <span className="brand">
          Afri<em>gahwa</em>
        </span>
        <span className="tagline">{t(UI.tagline, lang)}</span>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            className={lang === 'sw' ? 'active' : ''}
            onClick={() => setLang('sw')}
          >
            SW
          </button>
        </div>
      </header>

      {screen === 'intro' && <Intro lang={lang} onStart={start} />}
      {screen === 'quiz' && (
        <Quiz
          lang={lang}
          answers={answers}
          onAnswer={(option) => {
            const next = [...answers, option]
            setAnswers(next)
            if (next.length === QUESTIONS.length) setScreen('results')
          }}
          onBack={() => {
            if (answers.length === 0) setScreen('intro')
            else setAnswers(answers.slice(0, -1))
          }}
        />
      )}
      {screen === 'results' && (
        <Results lang={lang} answers={answers} onRestart={start} />
      )}

      <footer className="footer">{t(UI.footer, lang)}</footer>
    </div>
  )
}

function Intro({ lang, onStart }: { lang: Lang; onStart: () => void }) {
  return (
    <main className="card intro">
      <div className="intro-emoji" aria-hidden>
        🇹🇿☕
      </div>
      <h1>{t(UI.introTitle, lang)}</h1>
      <p>{t(UI.introBody, lang)}</p>
      <button className="btn primary" onClick={onStart}>
        {t(UI.start, lang)}
      </button>
    </main>
  )
}

function Quiz({
  lang,
  answers,
  onAnswer,
  onBack,
}: {
  lang: Lang
  answers: Option[]
  onAnswer: (option: Option) => void
  onBack: () => void
}) {
  const index = answers.length
  const question = QUESTIONS[index]
  const progress = (index / QUESTIONS.length) * 100
  const step = t(UI.questionOf, lang)
    .replace('{i}', String(index + 1))
    .replace('{n}', String(QUESTIONS.length))

  return (
    <main className="card quiz">
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={index}
        aria-valuemin={0}
        aria-valuemax={QUESTIONS.length}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="step">{step}</p>
      <h2>{t(question.prompt, lang)}</h2>
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option.id}
            className="option"
            onClick={() => onAnswer(option)}
          >
            <span className="option-emoji" aria-hidden>
              {option.emoji}
            </span>
            <span className="option-text">
              <strong>{t(option.label, lang)}</strong>
              {option.detail && <small>{t(option.detail, lang)}</small>}
            </span>
          </button>
        ))}
      </div>
      <button className="btn ghost" onClick={onBack}>
        {t(UI.back, lang)}
      </button>
    </main>
  )
}

function Results({
  lang,
  answers,
  onRestart,
}: {
  lang: Lang
  answers: Option[]
  onRestart: () => void
}) {
  const matches = useMemo(() => computeMatches(answers), [answers])
  const [best, ...rest] = matches
  const runnersUp = rest.slice(0, 2)

  return (
    <main className="results">
      <p className="results-kicker">{t(UI.yourMatch, lang)}</p>
      <BestMatch lang={lang} match={best} />

      <p className="results-kicker secondary">{t(UI.alsoWorth, lang)}</p>
      <div className="runners-up">
        {runnersUp.map((match) => (
          <RunnerUp key={match.coffee.id} lang={lang} match={match} />
        ))}
      </div>

      <button className="btn ghost restart" onClick={onRestart}>
        {t(UI.retake, lang)}
      </button>
    </main>
  )
}

function BestMatch({ lang, match }: { lang: Lang; match: Match }) {
  const { coffee, score } = match
  const [grindId, setGrindId] = useState(GRIND_OPTIONS[0].id)
  const grind = GRIND_OPTIONS.find((g) => g.id === grindId) ?? GRIND_OPTIONS[0]

  const message = whatsappMessage(
    lang,
    coffee.name,
    t(coffee.zone, lang),
    coffee.tastingNotes[lang].join(', '),
    t(grind.label, lang),
  )
  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`

  return (
    <section className="card best-match">
      <div className="match-head">
        <div>
          <h2>
            <span aria-hidden>{coffee.emoji}</span> {coffee.name}
          </h2>
          <p className="origin">
            {t(coffee.zone, lang)} · {coffee.variety} · {t(coffee.process, lang)}
          </p>
        </div>
        <div className="score-badge">
          <span className="score-number">{score}%</span>
          <span className="score-label">{t(UI.matchLabel, lang)}</span>
        </div>
      </div>

      <ul className="notes">
        {coffee.tastingNotes[lang].map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <p className="description">{t(coffee.description, lang)}</p>

      <div className="brew-tip">
        <strong>{t(UI.howToBrew, lang)}</strong>
        <p>{t(coffee.brewTips, lang)}</p>
      </div>

      <div className="order-block">
        <p className="grind-title">{t(UI.grindTitle, lang)}</p>
        <div className="grind-options" role="group" aria-label={t(UI.grindTitle, lang)}>
          {GRIND_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`grind ${option.id === grindId ? 'active' : ''}`}
              onClick={() => setGrindId(option.id)}
            >
              {t(option.label, lang)}
            </button>
          ))}
        </div>
        <a
          className="btn whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden>💬</span> {t(UI.whatsappCta, lang)}
        </a>
      </div>
    </section>
  )
}

function RunnerUp({ lang, match }: { lang: Lang; match: Match }) {
  const { coffee, score } = match
  return (
    <section className="card runner-up">
      <div className="match-head">
        <h3>
          <span aria-hidden>{coffee.emoji}</span> {coffee.name}
        </h3>
        <span className="score-small">{score}%</span>
      </div>
      <p className="origin">
        {t(coffee.zone, lang)} · {coffee.variety}
      </p>
      <ul className="notes">
        {coffee.tastingNotes[lang].slice(0, 3).map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}
