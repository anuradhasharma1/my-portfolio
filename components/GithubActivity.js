'use client'

import { useState, useEffect } from 'react'

const GITHUB_USERNAME = 'anuradhasharma1'

// group flat day array into weeks (columns of 7)
function groupIntoWeeks(days) {
    if (!Array.isArray(days) || days.length === 0) return []
    const weeks = []
    let week = []

    // pad start so first day lands on correct weekday
    const firstDay = new Date(days[0].date).getDay() // 0=Sun
    for (let i = 0; i < firstDay; i++) {
        week.push({ date: '', count: 0, _empty: true })
    }

    days.forEach(day => {
        week.push(day)
        if (week.length === 7) {
            weeks.push(week)
            week = []
        }
    })

    // push remaining days
    if (week.length > 0) {
        while (week.length < 7) week.push({ date: '', count: 0, _empty: true })
        weeks.push(week)
    }

    return weeks
}

// extract month label positions from weeks
function getMonthLabels(weeks) {
    const labels = []
    let lastMonth = null

    weeks.forEach((week, wi) => {
        const realDay = week.find(d => d.date && !d._empty)
        if (!realDay) return
        const month = new Date(realDay.date).toLocaleDateString('en-US', { month: 'short' })
        if (month !== lastMonth) {
            labels.push({ label: month, weekIndex: wi })
            lastMonth = month
        }
    })

    return labels
}

export default function GithubActivity() {
    const [weeks, setWeeks] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tooltip, setTooltip] = useState(null)
    const [isDark, setIsDark] = useState(false)

    // sync dark mode
    useEffect(() => {
        const check = () =>
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
        check()
        const obs = new MutationObserver(check)
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)

            .then(r => r.json())
            .then(data => {
                // API returns { contributions: [ { date, count } ], total: { ... } }
                const days = Array.isArray(data.contributions) ? data.contributions : []
                setWeeks(groupIntoWeeks(days))

                // total can be a number or an object like { lastYear: 123 }
                const t = data.total
                setTotal(typeof t === 'number' ? t : (t?.lastYear ?? t?.['2024'] ?? 0))
                setLoading(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }, [])

    

    const getColor = (count) => {
        const base = isDark ? '255,255,255' : '0,0,0'
        if (count === 0) return `rgba(${base},0.06)`
        if (count <= 2) return `rgba(${base},0.25)`
        if (count <= 5) return `rgba(${base},0.45)`
        if (count <= 9) return `rgba(${base},0.65)`
        return `rgba(${base},0.9)`
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
        })
    }

    const monthLabels = getMonthLabels(weeks)
    const CELL = 9  // px — cell size
    const GAP = 3  // px — gap between cells

    return (
        <section style={{ padding: '0 28px 56px' }}>

            {/* header */}
            <div style={{
                display: 'flex', alignItems: 'baseline',
                gap: '10px', marginBottom: '16px',
            }}>
                <p style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: 'var(--fg)',
                    margin: 0,
                    transition: 'color 0.4s',
                }}>GitHub Activity</p>

                {!loading && !error && (
                    <span style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '11px',
                        color: 'var(--muted)',
                        transition: 'color 0.4s',
                    }}>
                        {total} contributions in the last year
                    </span>
                )}
            </div>

            {/* graph box */}
            <div
                data-graph="true"
                style={{
                    border: '1px solid var(--border)',
                    padding: '16px 16px 12px',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    transition: 'border-color 0.4s',
                    position: 'relative',
                    display: 'block',
                    minWidth: '100%',
                }}
            >
                {loading && (
                    <p style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '11px',
                        color: 'var(--muted)',
                        margin: '16px 0',
                        transition: 'color 0.4s',
                    }}>
                        loading activity...
                    </p>
                )}

                {error && (
                    <p style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '11px',
                        color: 'var(--muted)',
                        margin: '16px 0',
                    }}>
                        could not load activity — check back later.
                    </p>
                )}

                {!loading && !error && weeks.length > 0 && (
                    <>
                        {/* month labels row */}
                        <div style={{
                            display: 'flex',
                            marginBottom: '5px',
                            paddingLeft: '0px',
                        }}>
                            {monthLabels.map(({ label, weekIndex }, i) => {
                                const nextIndex = monthLabels[i + 1]?.weekIndex ?? weeks.length
                                const widthPx = (nextIndex - weekIndex) * (CELL + GAP)
                                return (
                                    <div
                                        key={label + i}
                                        style={{
                                            fontFamily: 'DM Mono, monospace',
                                            fontSize: '9px',
                                            color: 'var(--muted)',
                                            opacity: 0.5,
                                            width: `${widthPx}px`,
                                            flexShrink: 0,
                                            transition: 'color 0.4s',
                                        }}
                                    >
                                        {label}
                                    </div>
                                )
                            })}
                        </div>

                        {/* week columns */}
                        <div style={{ display: 'flex', gap: `${GAP}px`, alignItems: 'flex-start' }}>
                            {weeks.map((week, wi) => (
                                <div
                                    key={wi}
                                    style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}
                                >
                                    {week.map((day, di) => (
                                        <div
                                            key={di}
                                            onMouseEnter={(e) => {
                                                if (day._empty || !day.date) return
                                                const cellRect = e.currentTarget.getBoundingClientRect()
                                                const graphRect = e.currentTarget
                                                    .closest('[data-graph]')
                                                    .getBoundingClientRect()
                                                setTooltip({
                                                    count: day.count,
                                                    date: formatDate(day.date),
                                                    x: cellRect.left - graphRect.left,
                                                    y: cellRect.top - graphRect.top - 36,
                                                })
                                            }}
                                            onMouseLeave={() => setTooltip(null)}
                                            style={{
                                                width: `${CELL}px`,
                                                height: `${CELL}px`,
                                                borderRadius: '1.5px',
                                                background: day._empty ? 'transparent' : getColor(day.count),
                                                cursor: day._empty ? 'default' : 'crosshair',
                                                transition: 'background 0.4s',
                                                flexShrink: 0,
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* tooltip */}
                        {tooltip && (
                            <div style={{
                                position: 'absolute',
                                left: `${tooltip.x}px`,
                                top: `${tooltip.y}px`,
                                background: 'var(--fg)',
                                color: 'var(--bg)',
                                fontFamily: 'DM Mono, monospace',
                                fontSize: '10px',
                                padding: '4px 8px',
                                pointerEvents: 'none',
                                whiteSpace: 'nowrap',
                                zIndex: 10,
                                transition: 'background 0.4s, color 0.4s',
                            }}>
                                {tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''} · {tooltip.date}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}