import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', overflowY: 'auto' }}>
      <div className="animate-fade-in-up" style={{ maxWidth: '900px', width: '100%' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master Your IELTS Writing
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          Get instant, examiner-level feedback on your Task 1 letters and Task 2 essays. AI-powered evaluation targeting Band 7.0+.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Task 1: Letter</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1 }}>General Training letter writing evaluation. Get feedback on tone, task achievement, and structure.</p>
            <Link href="/evaluate?task=task1" style={{ width: '100%' }}>
              <button className="btn-clay-secondary" style={{ width: '100%', textAlign: 'center' }}>Start Task 1</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Task 2: Essay</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1 }}>Full essay evaluation. Detailed feedback on task response, coherence, vocabulary, and grammar.</p>
            <Link href="/evaluate?task=task2" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center' }}>Start Task 2</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Practice Writing</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1 }}>Guided writing practice with dynamic tips, structural templates, and real-time guidance.</p>
            <Link href="/practice" style={{ width: '100%' }}>
              <button className="btn-clay-secondary" style={{ width: '100%', textAlign: 'center', borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>Practice Hub</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
