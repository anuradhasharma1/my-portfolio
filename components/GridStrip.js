'use client'

export default function GridStrip() {
  return (
    <div style={{
      width: '100%',
      height: '70px',
      borderBottom: '1px solid var(--border)',
      backgroundImage: `
        linear-gradient(var(--grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
      `,
      backgroundSize: '14px 14px', 
      backgroundPosition: '0 0',
    }} />
  )
}