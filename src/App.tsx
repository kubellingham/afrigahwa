import { useMemo, useState } from 'react'
import { QUESTIONS } from './data/questions'
import { computeMatches } from './matcher'
import type { Match, Option } from './types'

type Screen = 'intro' | 'quiz' | 'results'

export default function App() {
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
        <span className="tagline">the African coffee matcher</span>
      </header>

      {screen === 'intro' && <Intro onStart={start} />}
      {screen === 'quiz' && (
        <Quiz
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
      {screen === 'results' && <Results answers={answers} onRestart={start} />}

      <footer className="footer">
        From Addis to Mzuzu — every cup here was grown in Africa. ☕
      </footer>
    </div>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <main className="card intro">
      <div className="intro-emoji" aria-hidden>
        🌍☕
      </div>
      <h1>Find your African coffee soulmate</h1>
      <p>
        Africa is where coffee was born — and no two origins taste alike. Answer{' '}
        {QUESTIONS.length} quick questions about how you like your cup, and
        we&rsquo;ll match you with the origin made for your palate, from
        Ethiopia&rsquo;s floral Yirgacheffe to Congo&rsquo;s brooding Kivu.
      </p>
      <button className="btn primary" onClick={onStart}>
        Start the tasting →
      </button>
    </main>
  )
}

function Quiz({
  answers,
  onAnswer,
  onBack,
}: {
  answers: Option[]
  onAnswer: (option: Option) => void
  onBack: () => void
}) {
  const index = answers.length
  const question = QUESTIONS[index]
  const progress = (index / QUESTIONS.length) * 100

  return (
    <main className="card quiz">
      <div className="progress" role="progressbar" aria-valuenow={index} aria-valuemin={0} aria-valuemax={QUESTIONS.length}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="step">
        Question {index + 1} of {QUESTIONS.length}
      </p>
      <h2>{question.prompt}</h2>
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
              <strong>{option.label}</strong>
              {option.detail && <small>{option.detail}</small>}
            </span>
          </button>
        ))}
      </div>
      <button className="btn ghost" onClick={onBack}>
        ← Back
      </button>
    </main>
  )
}

function Results({
  answers,
  onRestart,
}: {
  answers: Option[]
  onRestart: () => void
}) {
  const matches = useMemo(() => computeMatches(answers), [answers])
  const [best, ...rest] = matches
  const runnersUp = rest.slice(0, 2)

  return (
    <main className="results">
      <p className="results-kicker">Your match</p>
      <BestMatch match={best} />

      <p className="results-kicker secondary">Also worth a cup</p>
      <div className="runners-up">
        {runnersUp.map((match) => (
          <RunnerUp key={match.coffee.id} match={match} />
        ))}
      </div>

      <button className="btn primary" onClick={onRestart}>
        Retake the quiz
      </button>
    </main>
  )
}

function BestMatch({ match }: { match: Match }) {
  const { coffee, score } = match
  return (
    <section className="card best-match">
      <div className="match-head">
        <div>
          <h2>
            <span aria-hidden>{coffee.flag}</span> {coffee.name}
          </h2>
          <p className="origin">
            {coffee.country} · {coffee.process}
          </p>
        </div>
        <div className="score-badge">
          <span className="score-number">{score}%</span>
          <span className="score-label">match</span>
        </div>
      </div>

      <ul className="notes">
        {coffee.tastingNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <p className="description">{coffee.description}</p>

      <div className="brew-tip">
        <strong>How to brew it</strong>
        <p>{coffee.brewTips}</p>
      </div>
    </section>
  )
}

function RunnerUp({ match }: { match: Match }) {
  const { coffee, score } = match
  return (
    <section className="card runner-up">
      <div className="match-head">
        <h3>
          <span aria-hidden>{coffee.flag}</span> {coffee.name}
        </h3>
        <span className="score-small">{score}%</span>
      </div>
      <p className="origin">
        {coffee.country} · {coffee.process}
      </p>
      <ul className="notes">
        {coffee.tastingNotes.slice(0, 3).map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}
