'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import GridStrip from '@/components/GridStrip'

export default function BlogPage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@anuradhasharma1')
            .then(res => res.json())
            .then(data => setPosts(data.items.slice(0, 6)))
    }, [])

    // extract image from content 
    const getImage = (post) => {
        const match = post.content?.match(/<img.*?src="(.*?)"/)
        return match ? match[1] : null
    }

    // basic genre detection
    const getGenre = (post) => {
        const text = post.title.toLowerCase()

        if (text.includes('ai') || text.includes('llm')) return 'AI'
        if (text.includes('react') || text.includes('frontend')) return 'Frontend'
        if (text.includes('backend') || text.includes('api')) return 'Backend'

        return 'General'
    }

    return (
        <>
            <GridStrip />

            <main style={{ padding: '40px 28px' }}>

                <h1 style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '26px',
                    marginBottom: '6px'
                }}>
                    Blogs
                </h1>
                <div style={{
                    height: '1px',
                    background: 'var(--border)',
                    marginBottom: '16px'
                }} />
                <p style={{
                    fontSize: '13px',
                    color: 'var(--muted)',
                    maxWidth: '520px',
                    lineHeight: 1.6,
                    marginBottom: '28px'
                }}>
                    A collection of my thoughts, learnings, and experiments — mostly around
                    building things, understanding systems, and figuring stuff out along the way.
                </p>


                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '18px'
                }}>
                    {posts.map((post, i) => {
                        const img = getImage(post)
                        const genre = getGenre(post)

                        return (
                            <a
                                key={i}
                                href={post.link}
                                target="_blank"
                                style={{
                                    border: '1px solid var(--border)',
                                    overflow: 'hidden',
                                    display: 'block',
                                    transition: '0.25s'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.background = 'var(--hover)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.background = 'transparent'
                                }}
                            >

                                {/* IMAGE */}
                                {img && (
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '16 / 9',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderBottom: '1px solid var(--border)'
                                    }}>
                                        <Image
                                            src={img}
                                            alt="cover"
                                            fill
                                            unoptimized
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                )}

                                {/* CONTENT */}
                                <div style={{ padding: '12px' }}>

                                    {/* GENRE */}
                                    <span style={{
                                        fontSize: '9px',
                                        fontFamily: 'DM Mono, monospace',
                                        color: 'var(--muted)',
                                        border: '1px solid var(--border)',
                                        padding: '2px 6px',
                                        display: 'inline-block',
                                        marginBottom: '6px'
                                    }}>
                                        {genre}
                                    </span>

                                    {/* TITLE */}
                                    <p style={{
                                        fontFamily: 'DM Mono, monospace',
                                        fontSize: '13px',
                                        marginBottom: '6px',
                                        lineHeight: 1.4
                                    }}>
                                        {post.title}
                                    </p>

                                    {/* DATE */}
                                    <p style={{
                                        fontSize: '10px',
                                        color: 'var(--muted)'
                                    }}>
                                        {new Date(post.pubDate).toDateString()}
                                    </p>

                                </div>

                            </a>
                        )
                    })}
                </div>

            </main>
        </>
    )
}