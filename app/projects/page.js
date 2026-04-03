import { Projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import GridStrip from '@/components/GridStrip'

export default function ProjectsPage() {
  return (
    <section>

      <GridStrip />

      <div style={{ padding: '32px 28px 48px' }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '30px',
          fontWeight: 500,
          marginBottom: '6px'
        }}>
          Projects
        </p>
       
        <p style={{
          fontSize: '15px',
          color: 'var(--muted)',
          marginBottom: '18px',
          maxWidth: '500px',
          lineHeight: 1.6,
          whiteSpace: 'nowrap'
        }}>
         Built from curiosity and a drive to learn — continuously improving and turning ideas into practical, real-world applications.
        </p>

        {/* GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {Projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

      </div>
    </section>
  )
}