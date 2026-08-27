import Link from 'next/link';
import { PenTool, FileText, Edit3, BookOpen, Layers, Calendar, Book, Mic, Headphones, Lock, Printer, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem', textAlign: 'center', overflowY: 'auto' }}>
      <div className="animate-fade-in-up" style={{ maxWidth: '1100px', width: '100%' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          IELTS Quick Prepare
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          Your intensive, AI-powered toolkit to achieve Band 7.0+ in 14 days.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Writing Modules */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
                <PenTool size={24} />
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Task 1: Letter</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>General Training letter writing evaluation. Get feedback on tone, task achievement, and structure.</p>
            <Link href="/evaluate?task=task1" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary)' }}>Start Task 1</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid var(--color-success)' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <FileText size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Task 2: Essay</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Full essay evaluation. Detailed feedback on task response, coherence, vocabulary, and grammar.</p>
            <Link href="/evaluate?task=task2" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>Start Task 2</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid var(--color-warning)' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning)' }}>
              <Edit3 size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Practice Writing</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Guided writing practice with dynamic tips, structural templates, and real-time guidance.</p>
            <Link href="/practice" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' }}>Practice Hub</button>
            </Link>
          </div>

          {/* New Phase 1 Modules */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #8b5cf6' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 'var(--radius-md)', color: '#8b5cf6' }}>
              <BookOpen size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Vocabulary Builder</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Master 200+ advanced words. Flashcards and AI-generated daily word sets for rapid learning.</p>
            <Link href="/vocabulary" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>Learn Words</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #06b6d4' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: 'var(--radius-md)', color: '#06b6d4' }}>
              <Layers size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Language Toolkit</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Your essential reference for linking words, sentence formulas, and high-scoring phrase chunks.</p>
            <Link href="/toolkit" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>Open Toolkit</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #ec4899' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: 'var(--radius-md)', color: '#ec4899' }}>
              <Calendar size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>14-Day Study Plan</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Structured, intensive day-by-day plan to integrate all skills and maximize your score quickly.</p>
            <Link href="/study-plan" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>View Plan</button>
            </Link>
          </div>
          
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #14b8a6' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(20, 184, 166, 0.1)', borderRadius: 'var(--radius-md)', color: '#14b8a6' }}>
              <Book size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Reading Practice</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Tackle full reading passages with a real-time timer. Use AI to generate endless unique tests.</p>
            <Link href="/reading" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' }}>Start Reading</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #8b5cf6' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 'var(--radius-md)', color: '#a78bfa' }}>
              <BrainCircuit size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Grammar Builder</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Master Band 7.0+ sentence structures with formula tips and interactive adaptive quizzes.</p>
            <Link href="/grammar" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(139, 92, 246, 0.1)', color: '#c4b5fd' }}>Start Grammar</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #14b8a6' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(20, 184, 166, 0.1)', borderRadius: 'var(--radius-md)', color: '#14b8a6' }}>
              <BookOpen size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Contextual Reading</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Read AI-annotated IELTS essays. Hover over highlighted text to reveal grammar, vocab, and connector usage tips.</p>
            <Link href="/contextual-reading" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(20, 184, 166, 0.1)', color: '#5eead4' }}>Start Reading</button>
            </Link>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #f43f5e' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: 'var(--radius-md)', color: '#f43f5e' }}>
              <Printer size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Print Materials</h2>
            <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Export all study materials to A4 PDF. Vocabulary, connectors, formulas, and study plan — ready for hardcopy.</p>
            <Link href="/print-materials" style={{ width: '100%' }}>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>Print / Export PDF</button>
            </Link>
          </div>

          {/* Locked Modules */}
          <div className="glass-panel" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #94a3b8', overflow: 'hidden' }}>
            {/* Lock Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, color: 'white' }}>
              <Lock size={32} style={{ marginBottom: '0.5rem', color: '#cbd5e1' }} />
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>Coming Soon</span>
            </div>
            
            <div style={{ opacity: 0.5, display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(148, 163, 184, 0.1)', borderRadius: 'var(--radius-md)', color: '#94a3b8', width: 'fit-content' }}>
                <Mic size={24} />
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>Speaking Practice</h2>
              <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Real-time voice interaction with AI examiner. Part 1, 2, and 3 simulations.</p>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }} disabled>Locked</button>
            </div>
          </div>

          <div className="glass-panel" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', borderTop: '3px solid #94a3b8', overflow: 'hidden' }}>
            {/* Lock Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, color: 'white' }}>
              <Lock size={32} style={{ marginBottom: '0.5rem', color: '#cbd5e1' }} />
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>Coming Soon</span>
            </div>
            
            <div style={{ opacity: 0.5, display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(148, 163, 184, 0.1)', borderRadius: 'var(--radius-md)', color: '#94a3b8', width: 'fit-content' }}>
                <Headphones size={24} />
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>Listening Practice</h2>
              <p style={{ color: 'var(--color-text-muted)', flex: 1, fontSize: '0.9rem' }}>Audio playback with map labeling, multiple choice, and dictation exercises.</p>
              <button className="btn-clay" style={{ width: '100%', textAlign: 'center', background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }} disabled>Locked</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
