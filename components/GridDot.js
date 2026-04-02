'use client'

import { useEffect, useRef } from 'react'

const GAP = 24   // px between dots
const R = 1.5  // base dot radius
const PROXIMITY_RADIUS = 90

export default function GridDots() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: -999, y: -999 })
    const dotsRef = useRef([])
    const rafRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1

        function init() {
            const rect = canvas.parentElement.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            canvas.style.width = rect.width + 'px'
            canvas.style.height = rect.height + 'px'

            const cols = Math.ceil(canvas.width / (GAP * dpr)) + 1
            const rows = Math.ceil(canvas.height / (GAP * dpr)) + 1

            dotsRef.current = []
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    dotsRef.current.push({
                        x: c * GAP * dpr,
                        y: r * GAP * dpr,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.012 + Math.random() * 0.008,
                        t: Math.random() * Math.PI * 2,
                    })
                }
            }
        }

        function draw() {
            const { width: W, height: H } = canvas
            ctx.clearRect(0, 0, W, H)

            const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
            const offAlpha = isDark ? 0.06 : 0.08
            const onColor = isDark ? '255,255,255' : '0,0,0'
            const mx = mouseRef.current.x * dpr
            const my = mouseRef.current.y * dpr
            const pr = PROXIMITY_RADIUS * dpr

            dotsRef.current.forEach(d => {
                d.t += d.speed
                const pulse = (Math.sin(d.t + d.phase) + 1) / 2
                const dx = d.x - mx
                const dy = d.y - my
                const dist = Math.sqrt(dx * dx + dy * dy)
                const proximity = dist < pr ? 1 - dist / pr : 0
                const alpha = Math.min(offAlpha + pulse * 0.12 + proximity * 0.65, 0.9)
                const radius = R * dpr * (1 + proximity * 1.2)

                ctx.beginPath()
                ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${onColor},${alpha})`
                ctx.fill()
            })

            rafRef.current = requestAnimationFrame(draw)
        }

        function onMouseMove(e) {
            const rect = canvas.parentElement.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        function onMouseLeave() {
            mouseRef.current = { x: -999, y: -999 }
        }

        const parent = canvas.parentElement
        parent.addEventListener('mousemove', onMouseMove)
        parent.addEventListener('mouseleave', onMouseLeave)
        window.addEventListener('resize', init)

        init()
        rafRef.current = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(rafRef.current)
            parent.removeEventListener('mousemove', onMouseMove)
            parent.removeEventListener('mouseleave', onMouseLeave)
            window.removeEventListener('resize', init)
        }
    }, [])

    return (
        <div style={{
            position: 'relative',
            height: '120px',
            borderBottom: '1px solid var(--border)',
            overflow: 'hidden',
            transition: 'border-color 0.4s',
            
        }}>
            <canvas
                ref={canvasRef}
                style={{ display: 'block', width: '100%', height: '100%' }}
            />

            {/* left fade */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, bottom: 0,
                width: '100px',
                background: 'linear-gradient(to right, var(--bg), transparent)',
                pointerEvents: 'none',
            }} />

            {/* right fade */}
            <div style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0,
                width: '100px',
                background: 'linear-gradient(to left, var(--bg), transparent)',
                pointerEvents: 'none',
            }} />

        </div>
    )
}