import { useEffect, useMemo, useRef, useState } from 'react'
import { COFFEES } from './data/coffees'
import { QUESTIONS } from './data/questions'
import { ALTITUDES, PTS, TZ_PATH } from './data/geo'
import { computeMatches } from './matcher'
import {
  ATTR_LABELS,
  GRIND_OPTIONS,
  STEPS,
  UI,
  matchMessage,
  regionMessage,
  t,
} from './i18n'
import { WHATSAPP_NUMBER } from './config'
import { ATTRIBUTES, type Attribute, type Coffee, type Lang } from './types'

type Screen = 'home' | 'quiz' | 'results' | 'regions'

function waUrl(message: string): string {
  const num = WHATSAPP_NUMBER.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  return num
    ? `https://wa.me/${num}?text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`
}

function parseHash(): { answers: number[] | null; lang: Lang | null } {
  const m = location.hash.match(/m=([\d.]+)/)
  const l = location.hash.match(/l=(en|sw)/)
  let answers: number[] | null = null
  if (m) {
    const idxs = m[1].split('.').map(Number)
    if (
      idxs.length === QUESTIONS.length &&
      idxs.every(
        (v, i) => Number.isInteger(v) && v >= 0 && v < QUESTIONS[i].options.length,
      )
    ) {
      answers = idxs
    }
  }
  return { answers, lang: l ? (l[1] as Lang) : null }
}

function clearHash() {
  try {
    history.replaceState(null, '', location.pathname + location.search)
  } catch {
    /* ignore */
  }
}

function setHash(answers: number[], lang: Lang) {
  try {
    history.replaceState(null, '', `#m=${answers.join('.')}&l=${lang}`)
  } catch {
    /* ignore */
  }
}

function topAttributes(coffee: Coffee, n: number): Attribute[] {
  return [...ATTRIBUTES]
    .sort((a, b) => coffee.profile[b] - coffee.profile[a])
    .slice(0, n)
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [screen, setScreen] = useState<Screen>('home')
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    const { answers: restored, lang: restoredLang } = parseHash()
    if (restoredLang) setLang(restoredLang)
    if (restored) {
      setAnswers(restored)
      setScreen('results')
    }
  }, [])

  const stateRef = useRef({ screen, answers, lang })
  stateRef.current = { screen, answers, lang }

  const pick = (idx: number) => {
    const { answers: current, lang: l } = stateRef.current
    const next = [...current, idx]
    setAnswers(next)
    if (next.length === QUESTIONS.length) {
      setHash(next, l)
      setScreen('results')
    }
  }

  const back = () => {
    const { answers: current } = stateRef.current
    if (current.length === 0) {
      clearHash()
      setScreen('home')
    } else {
      setAnswers(current.slice(0, -1))
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { screen: s, answers: a } = stateRef.current
      if (s !== 'quiz' || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const q = QUESTIONS[a.length]
      if (!q) return
      const k = e.key.toLowerCase()
      let idx = -1
      if (k >= 'a' && k <= 'd') idx = k.charCodeAt(0) - 97
      else if (k >= '1' && k <= '4') idx = Number(k) - 1
      if (idx >= 0 && idx < q.options.length) pick(idx)
      else if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goHome = () => {
    clearHash()
    setScreen('home')
  }
  const goRegions = () => {
    clearHash()
    setScreen('regions')
  }
  const startQuiz = () => {
    clearHash()
    setAnswers([])
    setScreen('quiz')
  }

  const matcherActive = screen === 'home' || screen === 'quiz' || screen === 'results'

  return (
    <>
      <div className="stripe" aria-hidden />
      <div className="shell">
        <header className="masthead">
          <button className="brand" onClick={goHome}>
            Afrigahwa<span>.</span>
          </button>
          <span className="roasted">{t(UI.roasted, lang)}</span>
          <nav className="nav">
            <button
              className={`nav-btn ${matcherActive ? 'active' : ''}`}
              onClick={goHome}
            >
              {t(UI.navMatcher, lang)}
            </button>
            <button
              className={`nav-btn ${screen === 'regions' ? 'active' : ''}`}
              onClick={goRegions}
            >
              {t(UI.navRegions, lang)}
            </button>
          </nav>
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

        {screen === 'home' && (
          <Home lang={lang} onStart={startQuiz} onRegions={goRegions} />
        )}
        {screen === 'quiz' && (
          <Quiz lang={lang} answers={answers} onPick={pick} onBack={back} />
        )}
        {screen === 'results' && (
          <Results
            lang={lang}
            answers={answers}
            onRestart={startQuiz}
            onRegions={goRegions}
          />
        )}
        {screen === 'regions' && <Regions lang={lang} onStart={startQuiz} />}

        <footer className="footer">
          <span>{t(UI.footer, lang)}</span>
          <a
            href={waUrl(t(UI.wholesaleMsg, lang))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(UI.wholesale, lang)}
          </a>
        </footer>
      </div>
    </>
  )
}

function Home({
  lang,
  onStart,
  onRegions,
}: {
  lang: Lang
  onStart: () => void
  onRegions: () => void
}) {
  return (
    <main className="home">
      <div className="hero-grid">
        <div>
          <p className="kicker">{t(UI.tagline, lang)}</p>
          <h1 className="hero-title">{t(UI.heroTitle, lang)}</h1>
          <p className="hero-body">{t(UI.heroBody, lang)}</p>
          <div className="cta-row">
            <button className="btn-dark" onClick={onStart}>
              {t(UI.start, lang)}
            </button>
            <span className="hero-meta">{t(UI.heroMeta, lang)}</span>
          </div>
        </div>
        <div className="region-index">
          <p className="index-kicker">{t(UI.regionsKicker, lang)}</p>
          <div className="index-list">
            {COFFEES.map((coffee) => (
              <button key={coffee.id} className="index-row" onClick={onRegions}>
                <span className="index-name">
                  {coffee.name}{' '}
                  {coffee.variety === 'Robusta' && <em>robusta</em>}
                </span>
                <span className="index-alt">{ALTITUDES[coffee.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="steps-grid">
        {STEPS[lang].map((text, i) => (
          <div key={i}>
            <span className="step-num">0{i + 1}</span>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

function Quiz({
  lang,
  answers,
  onPick,
  onBack,
}: {
  lang: Lang
  answers: number[]
  onPick: (idx: number) => void
  onBack: () => void
}) {
  const qi = answers.length
  const question = QUESTIONS[Math.min(qi, QUESTIONS.length - 1)]
  const step = t(UI.questionOf, lang)
    .replace('{i}', String(qi + 1))
    .replace('{n}', String(QUESTIONS.length))

  return (
    <main className="quiz">
      <div className="segs">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`seg ${i < qi ? 'done' : i === qi ? 'current' : ''}`}
          />
        ))}
      </div>
      <div className="q-anim" key={qi}>
        <p className="kicker">{step}</p>
        <h2 className="q-title">{t(question.prompt, lang)}</h2>
        <div className="opts">
          {question.options.map((option, i) => (
            <button key={option.id} className="opt" onClick={() => onPick(i)}>
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="opt-text">
                <strong>{t(option.label, lang)}</strong>
                {option.detail && <span>{t(option.detail, lang)}</span>}
              </span>
              <span aria-hidden>→</span>
            </button>
          ))}
        </div>
        <button className="back-link" onClick={onBack}>
          {t(UI.back, lang)}
        </button>
        <p className="kbd-hint">{t(UI.kbdHint, lang)}</p>
      </div>
    </main>
  )
}

function Results({
  lang,
  answers,
  onRestart,
  onRegions,
}: {
  lang: Lang
  answers: number[]
  onRestart: () => void
  onRegions: () => void
}) {
  const matches = useMemo(
    () => computeMatches(answers.map((idx, i) => QUESTIONS[i].options[idx])),
    [answers],
  )
  const [best, ...rest] = matches
  const coffee = best.coffee
  const runnersUp = rest.slice(0, 2)

  const [grindId, setGrindId] = useState(GRIND_OPTIONS[0].id)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const grind = GRIND_OPTIONS.find((g) => g.id === grindId) ?? GRIND_OPTIONS[0]
  const notes = coffee.tastingNotes[lang].join(', ')
  const whatsappUrl = waUrl(
    matchMessage(lang, coffee.name, t(coffee.zone, lang), notes, t(grind.label, lang)),
  )

  const share = () => {
    const url = `${location.href.split('#')[0]}#m=${answers.join('.')}&l=${lang}`
    const done = () => {
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2200)
    }
    try {
      navigator.clipboard.writeText(url).then(done, done)
    } catch {
      done()
    }
  }

  const top3 = topAttributes(coffee, 3)
  const [bx, by] = PTS[coffee.id]
  const [dx, dy] = PTS.dar
  const labelRight = bx > 150

  return (
    <main className="results">
      <p className="kicker fade" style={{ animationDelay: '0s' }}>
        {t(UI.yourMatch, lang)}
      </p>
      <div className="result-head fade" style={{ animationDelay: '.06s' }}>
        <div>
          <h2 className="result-name">{coffee.name}</h2>
          <p className="result-origin">
            {t(coffee.zone, lang)} · {coffee.variety} · {t(coffee.process, lang)} ·{' '}
            {ALTITUDES[coffee.id]}
          </p>
        </div>
        <div className="result-score">
          <span className="score-num">{best.score}%</span>
          <span className="score-label">{t(UI.matchLabel, lang)}</span>
        </div>
      </div>
      <p className="notes-line fade" style={{ animationDelay: '.12s' }}>
        {coffee.tastingNotes[lang].join(' — ')}
      </p>
      <p className="result-desc fade" style={{ animationDelay: '.18s' }}>
        {t(coffee.description, lang)}
      </p>

      <div className="detail-grid fade" style={{ animationDelay: '.24s' }}>
        <div>
          <p className="label">{t(UI.tasteProfile, lang)}</p>
          <div className="bars">
            {ATTRIBUTES.map((attr, i) => (
              <div key={attr} className="bar-row">
                <span className="bar-label">{t(ATTR_LABELS[attr], lang)}</span>
                <span className="bar-track">
                  <span
                    className={`bar-fill ${top3.includes(attr) ? 'hot' : ''}`}
                    style={{
                      width: `${coffee.profile[attr] * 10}%`,
                      animationDelay: `${0.25 + i * 0.06}s`,
                    }}
                  />
                </span>
                <span className="bar-val">{coffee.profile[attr]}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="label">{t(UI.where, lang)}</p>
          <svg viewBox="-8 12 316 316" className="tz-map" aria-label="Map of Tanzania">
            <path d={TZ_PATH} fill="#efe5d0" stroke="#2a1a1044" strokeWidth="1" />
            <rect x={dx - 1.7} y={dy - 1.7} width="3.5" height="3.5" fill="#2a1a1077" />
            <text x={dx - 6} y={dy + 13} textAnchor="end" className="map-city">
              Dar es Salaam
            </text>
            <circle cx={bx} cy={by} r="6" fill="#c97f2b" />
            <circle
              cx={bx}
              cy={by}
              r="6"
              fill="none"
              stroke="#c97f2b"
              strokeWidth="1.5"
              className="map-pulse"
            />
            <text
              x={labelRight ? bx - 13 : bx + 13}
              y={by + 5}
              textAnchor={labelRight ? 'end' : 'start'}
              className="map-region"
            >
              {coffee.name}
            </text>
          </svg>
          <p className="map-alt">
            {ALTITUDES[coffee.id]} · {t(coffee.zone, lang)}
          </p>
        </div>
      </div>

      <div className="brew-callout fade" style={{ animationDelay: '.3s' }}>
        <strong>{t(UI.howToBrew, lang)}</strong>
        <p>{t(coffee.brewTips, lang)}</p>
      </div>

      <div className="order-block fade" style={{ animationDelay: '.36s' }}>
        <p className="label">{t(UI.grindTitle, lang)}</p>
        <div className="grinds" role="group" aria-label={t(UI.grindTitle, lang)}>
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
        <div className="order-actions">
          <a
            className="btn-wa"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(UI.whatsappCta, lang)}
          </a>
          <button className="btn-share" onClick={share}>
            {copied ? t(UI.copied, lang) : t(UI.share, lang)}
          </button>
        </div>
      </div>

      <div className="runners fade" style={{ animationDelay: '.42s' }}>
        <p className="label">{t(UI.alsoWorth, lang)}</p>
        <div className="runners-grid">
          {runnersUp.map((match) => (
            <div key={match.coffee.id} className="runner">
              <div className="runner-head">
                <span className="runner-name">{match.coffee.name}</span>
                <span className="runner-score">{match.score}%</span>
              </div>
              <p className="runner-origin">
                {t(match.coffee.zone, lang)} · {match.coffee.variety}
              </p>
              <p className="runner-notes">
                {match.coffee.tastingNotes[lang].slice(0, 3).join(' — ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="result-links fade" style={{ animationDelay: '.48s' }}>
        <button onClick={onRestart}>{t(UI.retake, lang)}</button>
        <button className="accent" onClick={onRegions}>
          {t(UI.browseAll, lang)}
        </button>
      </div>
    </main>
  )
}

function Regions({ lang, onStart }: { lang: Lang; onStart: () => void }) {
  return (
    <main className="regions">
      <p className="kicker">{t(UI.regionsKicker, lang)}</p>
      <h2 className="regions-title">{t(UI.regionsTitle, lang)}</h2>
      <p className="regions-intro">{t(UI.regionsIntro, lang)}</p>
      <div className="regions-grid">
        {COFFEES.map((coffee) => {
          const top3 = topAttributes(coffee, 3)
          const [x, y] = PTS[coffee.id]
          return (
            <div key={coffee.id} className="region-card">
              <div className="region-head">
                <h3>
                  {coffee.name}{' '}
                  {coffee.variety === 'Robusta' && <em>robusta</em>}
                </h3>
                <span className="region-alt">{ALTITUDES[coffee.id]}</span>
              </div>
              <p className="region-meta">
                {coffee.variety} · {t(coffee.process, lang)} · {t(coffee.zone, lang)}
              </p>
              <div className="region-body">
                <svg viewBox="-8 12 316 316" className="mini-map" aria-hidden>
                  <path d={TZ_PATH} fill="#efe5d0" stroke="#2a1a1033" strokeWidth="1.5" />
                  <circle cx={x} cy={y} r="11" fill="#c97f2b" />
                </svg>
                <div className="region-detail">
                  <p className="region-notes">
                    {coffee.tastingNotes[lang].join(' — ')}
                  </p>
                  <div className="region-bars">
                    {top3.map((attr) => (
                      <div key={attr} className="bar-row small">
                        <span className="bar-label">{t(ATTR_LABELS[attr], lang)}</span>
                        <span className="bar-track">
                          <span
                            className="bar-fill hot static"
                            style={{ width: `${coffee.profile[attr] * 10}%` }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="region-desc">{t(coffee.description, lang)}</p>
              <p className="region-brew">
                <strong>{t(UI.brewLabel, lang)}</strong> — {t(coffee.brewTips, lang)}
              </p>
              <a
                href={waUrl(
                  regionMessage(
                    lang,
                    coffee.name,
                    t(coffee.zone, lang),
                    coffee.tastingNotes[lang].join(', '),
                  ),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="region-ask"
              >
                {t(UI.askLabel, lang)}
              </a>
            </div>
          )
        })}
      </div>
      <div className="regions-cta">
        <button className="btn-dark" onClick={onStart}>
          {t(UI.notSure, lang)}
        </button>
        <span className="hero-meta">{t(UI.heroMeta, lang)}</span>
      </div>
    </main>
  )
}
