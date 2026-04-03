'use client'

import Image from 'next/image'

export default function ProjectCard({ project }) {
    return (
        <div
            style={{
                border: '1px solid var(--border)',
                padding: '14px',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >


            {project.image && (
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '140px',
                    marginBottom: '10px',
                    border: '1px solid var(--border)',
                    overflow: 'hidden'
                }}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            )}


            <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '13px',
                marginBottom: '4px'
            }}>
                {project.title}
            </p>


            <p style={{
                fontSize: '11px',
                color: 'var(--muted)',
                marginBottom: '6px'
            }}>
                {project.desc}
            </p>


            {project.points && (
                <div style={{
                    marginBottom: '8px'
                }}>
                    {project.points.map((p, i) => (
                        <p key={i} style={{
                            fontSize: '10px',
                            color: 'var(--muted)',
                            lineHeight: 1.4
                        }}>
                            • {p}
                        </p>
                    ))}
                </div>
            )}


            <div style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
                marginBottom: '8px'
            }}>
                {project.tech.map((t, i) => (
                    <span key={i} style={{
                        fontSize: '9px',
                        border: '1px solid var(--border)',
                        padding: '2px 6px'
                    }}>
                        {t}
                    </span>
                ))}
            </div>


            <div style={{
                display: 'flex',
                gap: '10px',
                fontSize: '10px'
            }}>
                <a href={project.live} target="_blank">live ↗</a>
                <a href={project.github} target="_blank">code ↗</a>
            </div>

        </div>
    )
}