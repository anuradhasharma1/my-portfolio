import GridStrip from "@/components/GridStrip"
import Image from "next/image"

//data
const BOOKS = [
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    note: 'the journey is the point.',
    cover: '/books/alchemist.jpg',
  },
  {
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    note: 'raw, honest, and powerful.',
    cover: '/books/anne-frank.jpg',
  },
  {
    title: 'Surrounded by Idiots',
    author: 'Thomas Erikson',
    note: 'understanding people hits different.',
    cover: '/books/surrounded.jpg',
  },
  {
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    note: 'fun, clever and comforting.',
    cover: '/books/osman.jpg',
  },
  {
    title: 'The Unfair Advantage',
    author: 'Ash Ali & Hasan Kubba',
    note: 'use what you have.',
    cover: '/books/unfair.jpg',
  },
]

const SHOWS = [
  {
    title: 'The Dinosaurs',
    note: 'realistic dino documentary (Netflix).',
    cover: '/shows/dino.jpg',
  },
  {
    title: 'Manifest',
    note: 'mystery + fate.',
    cover: '/shows/manifest.jpg',
  },
  {
    title: 'The Mentalist',
    note: 'observation game strong.',
    cover: '/shows/mentalist.jpg',
  },
  {
    title: 'Dark',
    note: 'mind = blown.',
    cover: '/shows/dark.jpg',
  },
  {
    title: 'You',
    note: 'creepy but addictive.',
    cover: '/shows/you.jpg',
  },
  {
    title: 'The Paper',
    note: 'office chaos + comedy vibes.',
    cover: '/shows/the paper.jpg',
  },
  {
    title: 'Alice in Borderland',
    note: 'survival chaos.',
    cover: '/shows/alice.webp',
  },
]

export const metadata = {
  title: 'Interests · Anuradha Sharma',
}

export default function InterestsPage() {
  return (
    <>
      <GridStrip />

      <main style={{ padding: '40px 20px ', width: '100%' }}>

        <h1 style={{ ...mono(25), marginBottom: '40px' }}>Interests</h1>

        <Divider />

        <div style={container}>

          {/* LEFT — BOOKS */}
          <div style={column}>
            <SectionLabel label="Books I love.." index="01" />

            {BOOKS.map((book, i) => (
              <div key={i} className="card" style={card}>

                <div style={imgWrapper}>
                  <Image src={book.cover} alt={book.title} fill style={{ objectFit: "contain" }} />
                </div>

                <div>
                  <p style={title}>{book.title}</p>
                  <p style={sub}>— {book.author}</p>
                  <p style={desc}>{book.note}</p>
                </div>

              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div style={dividerVertical}></div>

          {/* RIGHT — SHOWS */}
          <div style={column}>
            <SectionLabel label="All Time Fav Shows" index="02" />

            {SHOWS.map((show, i) => (
              <div key={i} className="card" style={card}>

                <div style={imgWrapper}>
                  <Image src={show.cover} alt={show.title} fill style={{ objectFit: "contain" }} />
                </div>

                <div>
                  <p style={title}>{show.title}</p>
                  <p style={desc}>{show.note}</p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </main>
    </>
  )
}



const grid = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
}

const container = {
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  gap: '16px',
  
}

const column = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}

const dividerVertical = {
  width: '1px',
  background: 'var(--border)',
  margin: '0 10px'
}

const card = {
  display: 'flex',
  gap: '16px',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  overflow: 'hidden',
  padding: '12px',
}

const imgWrapper = {
  position: 'relative',
  width: '80px',   
  height: '100px',
  flexShrink: 0,
}

const tag = {
  ...mono(9),
  opacity: 0.4,
  marginBottom: '6px',
}

const title = {
  ...mono(12, false, 500),
  marginBottom: '4px',
}

const sub = {
  ...mono(10),
  opacity: 0.5,
}

const desc = {
  ...mono(10),
  opacity: 0.6,
}

function SectionLabel({ label, index }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
      <span style={{ ...mono(9), opacity: 0.3 }}>{index}</span>
      <p style={{ ...mono(13, false, 500) }}>{label}</p>
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'var(--border)',
        margin: '0 0 48px',
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  )
}

function mono(size, muted = false, weight = 400) {
  return {
    fontFamily: 'DM Mono, monospace',
    fontSize: `${size}px`,
    fontWeight: weight,
    color: muted ? 'var(--muted)' : 'var(--fg)',
  }
}