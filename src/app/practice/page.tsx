'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, PenTool, BookOpen } from 'lucide-react';
import { translations, Language } from '@/lib/i18n';

export default function PracticeHub() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-card)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={20} />
            <span style={{ fontWeight: 500 }}>{t.backToHome}</span>
          </Link>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginLeft: '1rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>{t.practiceTitle}</h1>
        </div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--color-border)', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)', outline: 'none' }}
        >
          <option value="en">English 🇬🇧</option>
          <option value="id">Indonesia 🇮🇩</option>
        </select>
      </header>

      <main style={{ flex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-text)' }}>Select Your Module</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{t.practiceDesc}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
          
          {/* Academic (Locked) */}
          <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', opacity: 0.7 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.6)', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Lock size={20} color="var(--color-text-muted)" />
                <span style={{ fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.comingSoon}</span>
              </div>
            </div>
            
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', filter: 'blur(2px)' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(167, 139, 250, 0.1)', borderRadius: 'var(--radius-md)', color: '#a78bfa', width: 'max-content' }}>
                <BookOpen size={24} />
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>{t.academicTitle}</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t.academicDesc}</p>
              <button className="btn-clay-secondary" disabled>Start Practice</button>
            </div>
          </div>

          {/* General Training (Active) */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.4)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)', width: 'max-content' }}>
              <PenTool size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.generalTitle}</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{t.generalDesc}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
              <Link href="/practice/general/task1" style={{ width: '100%' }}>
                <button className="btn-clay-secondary" style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{t.task1} (Letter)</span>
                  <span style={{ fontSize: '1.25rem' }}>→</span>
                </button>
              </Link>
              <Link href="/practice/general/task2" style={{ width: '100%' }}>
                <button className="btn-clay" style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{t.task2} (Essay)</span>
                  <span style={{ fontSize: '1.25rem' }}>→</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Speaking Practice (Locked) */}
          <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', opacity: 0.7 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.6)', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Lock size={20} color="var(--color-text-muted)" />
                <span style={{ fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.comingSoon}</span>
              </div>
            </div>
            
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', filter: 'blur(2px)' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(148, 163, 184, 0.1)', borderRadius: 'var(--radius-md)', color: '#94a3b8', width: 'max-content' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>Speaking Practice</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Simulated IELTS speaking test with real-time AI examiner feedback.</p>
              <button className="btn-clay-secondary" disabled>Start Practice</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
