# Anuradha Sharma — Portfolio

> **Live →** [anuradhasharma.vercel.app](https://anuradhasharma.vercel.app)

Personal portfolio built from scratch . Every UI element handwritten in Next.js.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — animated hero, GitHub activity graph |
| `/projects` | All projects with live links + tech stack |
| `/blog` | Medium articles auto-fetched via RSS |
| `/interests` | Books I've read, shows I love |

---

## Features

- **Theme toggle** — full-screen ripple transition, dark/light with click sound
- **Animated dot grid** — mouse-reactive canvas animation on homepage
- **Typewriter hero** — cycles through roles with cursor blink
- **Avatar switcher** — two photos toggle with color-ring cycling
- **GitHub activity** — real contribution graph, no token needed, hover tooltips
- **Blog page** — auto-pulls latest Medium posts via RSS → JSON API
- **Interests page** — books and shows with cover images
- **Animated footer cat** — pixel art cat, hover to wake it up
- **Command palette ready** — `⌘K` slot in navbar

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript |
| Styling | CSS-in-JS + globals.css |
| Fonts | DM Mono · DM Sans |
| Icons | react-icons |
| Deployment | Vercel |
| APIs | GitHub Contributions API · Medium RSS |

---

## Run locally

```bash
git clone https://github.com/anuradhasharma1/portfolio
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project structure

```
app/
├── page.js                  # Home
├── projects/page.js         # Projects
├── blog/page.js             # Blog (Medium RSS)
├── interests/page.js        # Books & Shows
└── layout.js                # Root layout

components/
├── Navbar.js                # Sticky nav, theme toggle, ripple
├── GridDot.js               # Canvas dot animation
├── GridStrip.js             # Decorative grid header
├── Intro.js                 # Hero section
├── GithubActivity.js        # Contribution graph
├── ProjectCard.js           # Project card
└── Footer.js                # Footer with cat

data/
└── projects.js              # Project data

public/
├── img1.png, img2.png       # Avatar photos
├── resume.pdf               # Resume
├── sounds/                  # Click sounds
├── books/                   # Book covers
└── shows/                   # Show covers
```

---

## Projects

| Project | Stack | Live |
|---|---|---|
| MoodMap | Next.js · MongoDB · NextAuth · Gemini AI | [mood-map-beige.vercel.app](https://mood-map-beige.vercel.app) |
| Orbit Weight Scale | React · Vite · JavaScript | [mass-in-orbit.vercel.app](https://mass-in-orbit.vercel.app) |
| Study Tracker | React · Vite · Tailwind | [my-study-tracker-ten.vercel.app](https://my-study-tracker-ten.vercel.app) |

---

## Deploy

Deployed on Vercel. Push to `main` → auto-deploys.

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## License

MIT.  building my own portfolio it's more fun that way.

---

<div align="center">
<sub>built by <a href="https://github.com/anuradhasharma1">anuradha sharma</a> &nbsp;·&nbsp;</sub>
</div>