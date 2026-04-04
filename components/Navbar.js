'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'



const NAV_LINKS = [
    { label: 'home', href: '/' },
    { label: 'projects', href: '/projects' },
]
const MORE_LINKS = [
    { label: 'Blog & Writings', href: '/blog' },
    { label: 'Resume', href: '/resume.pdf', external: true },
    { label: 'Interests', href: '/interests' },
]

function LogoSVG() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 160 160"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <g
                fill="none"
                stroke="var(--fg)"
                strokeWidth="12"
                strokeLinecap="square"
                shapeRendering="crispEdges"
                style={{ transition: 'stroke 0.4s ease' }}
            >
                {/* A */}
                <path d="M30 120 L60 40 L90 120" />
                <line x1="45" y1="85" x2="75" y2="85" />
                {/* S */}
                <path d="M130 50 Q110 40 100 60 Q100 75 120 80 Q140 85 130 105 Q120 120 100 110" />
            </g>
        </svg>
    )
}

export default function Navbar() {
    const [isDark, setIsDark] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [transitioning, setTransitioning] = useState(false)

    const rippleRef = useRef(null)
    const themeBtnRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }, [isDark])

    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('[data-more-wrapper]')) setMoreOpen(false)
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])

    //clicking sound
    const playSound = () => {
        const audio = new Audio('/sounds/click.mp3')
        audio.volume = 0.4
        audio.play().catch(() => { })
    }

    const handleThemeToggle = () => {
        if (transitioning) return
        const btn = themeBtnRef.current
        const ripple = rippleRef.current
        if (!btn || !ripple) return

        const { left, top, width, height } = btn.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const maxR = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        ) * 2.3

        Object.assign(ripple.style, {
            left: x + 'px', top: y + 'px',
            width: '0px', height: '0px',
            background: isDark ? '#ffffff' : '#0a0a0a',
            opacity: '1', transition: 'none',
        })

        setTransitioning(true)

        requestAnimationFrame(() => requestAnimationFrame(() => {
            Object.assign(ripple.style, {
                transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1), height 0.55s cubic-bezier(0.4,0,0.2,1)',
                width: maxR + 'px', height: maxR + 'px',
            })
        }))

        setTimeout(() => setIsDark(d => !d), 270)
        setTimeout(() => Object.assign(ripple.style, { transition: 'opacity 0.25s ease', opacity: '0' }), 480)
        setTimeout(() => {
            Object.assign(ripple.style, { width: '0', height: '0', transition: 'none' })
            setTransitioning(false)
        }, 760)
    }

    return (
        <>
            {/* ripple — uses .theme-ripple from globals.css */}
            <div ref={rippleRef} className="theme-ripple" />

            <div
                className={`grid-bg`}  /* grid texture from globals.css */
                style={{
                    position: 'sticky', top: 0, zIndex: 50,
                    background: 'var(--bg)',
                    boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none',
                    transition: 'background 0.4s ease, box-shadow 0.3s ease',
                }}
            >
                <nav style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    alignItems: 'center',
                    height: '56px',
                    borderBottom: '1px solid var(--border)',
                    transition: 'border-color 0.4s',
                }}>

                    {/* ── Logo ── */}
                    <Link href="/" style={cellStyle('right')}>
                        <LogoSVG />
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(0,0,0,0.09)', padding: '0 10px', userSelect: 'none', pointerEvents: 'none' }}>01</span>

                        {NAV_LINKS.map(({ label, href }) => (
                            <Link key={label} href={href} style={linkStyle()}>
                                {label}
                            </Link>
                        ))}

                        {/* More dropdowns*/}
                        <div data-more-wrapper style={{ position: 'relative', height: '100%' }}>
                            <div
                                onClick={() => setMoreOpen(o => !o)}
                                style={{
                                    ...linkStyle(),
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    cursor: 'pointer', userSelect: 'none',
                                    color: moreOpen ? 'var(--fg)' : 'var(--muted)',
                                    background: moreOpen ? 'var(--hover)' : 'transparent',
                                }}
                            >
                                more
                                <span style={{ fontSize: '7px', opacity: 0.4, transition: 'transform 0.2s', transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                            </div>

                            {moreOpen && (
                                <div style={{
                                    position: 'absolute', top: 'calc(100% + 1px)', left: 0,
                                    minWidth: '190px', background: 'var(--bg)',
                                    border: '1px solid var(--border)', borderTop: 'none',
                                    zIndex: 200, animation: 'dropIn 0.15s ease',
                                    overflow: 'hidden',
                                }}>
                                    {/* dropdown gets grid texture  */}
                                    <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundSize: '20px 20px' }} />
                                    {MORE_LINKS.map(({ label, href, external }) => (
                                        external
                                            ? <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setMoreOpen(false)}
                                                style={dropItemStyle()}
                                            >
                                                {label}
                                                <span style={{ fontSize: '10px', opacity: 0.4 }}>→</span>
                                            </a>
                                            : <Link
                                                key={label}
                                                href={href}
                                                onClick={() => setMoreOpen(false)}
                                                style={dropItemStyle()}
                                            >
                                                {label}
                                                <span style={{ fontSize: '10px', opacity: 0.4 }}>→</span>
                                            </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Actions ── */}
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>


                        {/*theme toggler button*/}
                        <button
                            ref={themeBtnRef}
                            onClick={() => {
                                handleThemeToggle()
                                playSound()
                            }}
                            disabled={transitioning}
                            aria-label="Toggle theme"
                            style={{ ...actionBtnStyle(), width: '52px', padding: 0, justifyContent: 'center' }}
                        >
                            <div style={{ position: 'relative', width: '22px', height: '22px' }}>
                                {/* sun — visible in light mode */}
                                <span style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '15px',
                                    opacity: isDark ? 0 : 1,
                                    transform: isDark ? 'rotate(90deg) scale(0.4)' : 'rotate(0deg) scale(1)',
                                    transition: 'opacity 0.3s ease, transform 0.4s ease',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">

                                        <path d="M21 12.8A9 9 0 1 1 11.2 3 
           7 7 0 0 0 21 12.8z"/>
                                    </svg>

                                </span>
                                {/* moon — visible in dark mode */}
                                <span style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '15px',
                                    opacity: isDark ? 1 : 0,
                                    transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.4)',
                                    transition: 'opacity 0.3s ease, transform 0.4s ease',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">

                                        <circle cx="12" cy="12" r="4" />
                                        <line x1="12" y1="1" x2="12" y2="3" />
                                        <line x1="12" y1="21" x2="12" y2="23" />
                                        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
                                        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
                                        <line x1="1" y1="12" x2="3" y2="12" />
                                        <line x1="21" y1="12" x2="23" y2="12" />
                                        <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
                                        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
                                    </svg>




                                </span>
                            </div>
                        </button>
                    </div>

                </nav>
            </div>

            <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        [data-more-wrapper] a:hover,
        [data-more-wrapper] div:first-child:hover {
          color: var(--fg) !important;
          background: var(--hover) !important;
        }
      `}</style>
        </>
    )
}

// ─── style helpers (keeps JSX readable) ───
function cellStyle(borderSide) {
    return {
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: '0 14px', height: '100%',
        borderRight: borderSide === 'right' ? '1px solid var(--border)' : 'none',
        cursor: 'pointer',
        transition: 'background 0.15s, border-color 0.4s',
    }
}

function linkStyle() {
    return {
        display: 'flex', alignItems: 'center',
        height: '100%', padding: '0 16px',
        fontFamily: 'DM Mono, monospace',
        fontSize: '11px', letterSpacing: '0.06em',
        color: 'var(--muted)',
        borderRight: '1px solid var(--border)',
        transition: 'color 0.15s, background 0.15s, border-color 0.4s',
        whiteSpace: 'nowrap',
    }
}

function dropItemStyle() {
    return {
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 14px',
        fontFamily: 'DM Mono, monospace', fontSize: '11px',
        color: 'var(--muted)',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'color 0.15s, background 0.15s, border-color 0.4s',
    }
}

function actionBtnStyle() {
    return {
        display: 'flex', alignItems: 'center', gap: '6px',
        height: '100%', padding: '0 12px',
        borderLeft: '1px solid var(--border)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '11px', color: 'var(--muted)',
        transition: 'color 0.15s, background 0.15s, border-color 0.4s',
    }
}