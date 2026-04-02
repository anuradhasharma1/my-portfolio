'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const ROLES = [
    'full stack developer',
    'fixing bugs i created',
    'just shipping stuff',
    'thinking in systems',
    'open to work'

]

const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/anuradhasharma1' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anuradha-sharmaa1/' },
    { label: 'Peerlist', href: 'https://peerlist.io/anuradha71440' },
    { label: 'Medium', href: 'https://medium.com/@anuradhasharma1' },
    { label: 'Mail', href: 'mailto:anuradhasharma71440@gmail.com' },
]

const AVATAR_COLORS = [
    { ring: '#e5e7eb', bg: 'transparent' },
    { ring: '#a5b4fc', bg: '#eef2ff' },
    { ring: '#6ee7b7', bg: '#ecfdf5' },
    { ring: '#fca5a5', bg: '#fef2f2' },
    { ring: '#fcd34d', bg: '#fffbeb' },
]

function playPop() {
    try {
        const audio = new Audio('/sounds/transition.mp3')
        audio.currentTime = 0
        audio.play().catch(() => { })
    } catch (e) { }
}

export default function Intro() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [colorIndex, setColorIndex] = useState(0)
    const [avatarToggle, setAvatarToggle] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        const current = ROLES[roleIndex]

        if (!deleting && displayed.length < current.length) {
            const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
            return () => clearTimeout(t)
        }
        if (!deleting && displayed.length === current.length) {
            const t = setTimeout(() => setDeleting(true), 2000)
            return () => clearTimeout(t)
        }
        if (deleting && displayed.length > 0) {
            const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
            return () => clearTimeout(t)
        }
        if (deleting && displayed.length === 0) {
            const t = setTimeout(() => {
                setDeleting(false)
                setRoleIndex(i => (i + 1) % ROLES.length)
            }, 200)
            return () => clearTimeout(t)
        }


    }, [displayed, deleting, roleIndex])

    const handleAvatarClick = () => {
        playPop()
        setColorIndex(i => (i + 1) % AVATAR_COLORS.length)
        setAvatarToggle(prev => !prev)
    }

    const color = AVATAR_COLORS[colorIndex]

    return (
        <section
            style={{
                padding: '48px 28px 64px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>

                {/* Avatar */}
                <div
                    onClick={handleAvatarClick}
                    title="click me"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexShrink: 0,
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        border: `1.5px solid ${color.ring}`,
                        background: color.bg,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.15s ease',
                        position: 'relative',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {/* Avatar 1 */}
                    <Image
                        src="/img1.png"
                        alt="avatar1"
                        fill
                        style={{
                            objectFit: 'cover',
                            position: 'absolute',
                            transition: 'all 0.4s ease',
                            opacity: avatarToggle ? 0 : 1,
                            transform: avatarToggle ? 'scale(0.8) rotate(10deg)' : 'scale(1)',
                        }}
                    />

                    {/* Avatar 2 */}
                    <Image
                        src="/img2.png"
                        alt="avatar2"
                        fill
                        style={{
                            objectFit: 'cover',
                            position: 'absolute',
                            transition: 'all 0.4s ease',
                            opacity: avatarToggle ? 1 : 0,
                            transform: avatarToggle ? 'scale(1)' : 'scale(0.8) rotate(-10deg)',
                        }}
                    />

                    {/* Glow */}

                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            boxShadow: avatarToggle
                                ? '0 0 20px #60a5fa'
                                : '0 0 12px rgba(255,255,255,0.2)',
                            transition: 'all 0.4s ease',
                            pointerEvents: 'none',
                        }}
                    />
                </div>

                {/* Name */}
                <div style={{ paddingTop: '2px' }}>
                    <p style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '11px',
                        color: 'var(--muted)',
                        margin: '0 0 6px',
                        letterSpacing: '0.04em',
                    }}>—</p>

                    <h1 style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '28px',
                        fontWeight: 500,
                        color: 'var(--fg)',
                        margin: '0 0 5px',
                    }}>
                        Anuradha Sharma
                    </h1>

                    <p style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '12px',
                        color: 'var(--muted)',
                        margin: 0,
                        minHeight: '18px',
                    }}>
                        {displayed}
                        <span style={{
                            display: 'inline-block',
                            width: '1px',
                            height: '12px',
                            background: 'var(--muted)',
                            marginLeft: '2px',
                            animation: 'blink 1s step-end infinite',
                        }} />
                    </p>
                </div>
            </div >

            {/* ── Status ── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                marginBottom: '24px',
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                color: 'var(--muted)',
                transition: 'color 0.4s',
            }}>
                <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    flexShrink: 0,
                    animation: 'pulse 2s ease infinite',
                }} />
                open to work · India
            </div>

            {/* ── Divider ── */}
            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px', transition: 'background 0.4s' }} />

            {/* ── About ── */}
            <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--fg)',
                margin: '0 0 5px'
            }}>
                About
            </p>
            <div style={{ marginBottom: '28px' }}>
                {[
                    '• I’m currently building my foundation in full stack development, learning by creating and figuring things out along the way.',
                    '• I’m especially interested in AI and LLMs, and I’m working towards building things that combine both — real-world products powered by intelligent systems.',
                    '• What drives me is curiosity — understanding how things work, how people interact with technology, and how ideas can turn into something meaningful.',
                    '• For me, growth isn’t just about skills or achievements. It’s about becoming more aware, more disciplined, and more aligned with what I’m doing.',
                    'Still learning. Still building. Still moving forward.'
                ].map((line, i) => (
                    <p key={i} style={{
                        display: 'flex',
                        gap: '10px',
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '12px',
                        color: 'var(--muted)',
                        lineHeight: 1.75,
                        margin: '0 0 4px',
                        transition: 'color 0.4s',
                    }}>
                        <span style={{ flexShrink: 0, opacity: 0.1 }}>·</span>
                        {line}
                    </p>
                ))}
            </div>

            {/* ── Divider ── */}
            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px', transition: 'background 0.4s' }} />

            {/* ── Connect ── */}
            <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--fg)',
                margin: '0 0 5px',
            }}> Connect</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {SOCIALS.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '5px 11px',
                            border: '1px solid var(--border)',
                            fontFamily: 'DM Mono, monospace',
                            fontSize: '11px',
                            color: 'var(--muted)',
                            textDecoration: 'none',
                            transition: 'color 0.15s, background 0.15s, border-color 0.4s',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--fg)'
                            e.currentTarget.style.background = 'var(--hover)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--muted)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        {label}
                        <span style={{ opacity: 0.8, fontSize: '9px' }}>↗</span>
                    </a>
                ))}

                {/* Resume */}
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '5px 11px',
                        border: '1px solid var(--fg)',
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '11px',
                        color: 'var(--fg)',
                        textDecoration: 'none',
                        transition: 'background 0.15s, color 0.15s, border-color 0.4s',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--fg)'
                        e.currentTarget.style.color = 'var(--bg)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--fg)'
                    }}
                >
                    Resume
                    <span style={{ fontSize: '9px' }}>↓</span>
                </a>
            </div>

            <style>{`
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `}</style>
        </section >

    )
}
