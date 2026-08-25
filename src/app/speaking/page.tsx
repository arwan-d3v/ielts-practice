'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Lock } from 'lucide-react';

export default function SpeakingPracticeLocked() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-card)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} />
            <span style={{ fontWeight: 500 }}>Home</span>
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <Mic size={20} /> Speaking Practice
          </h1>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="glass-panel animate-fade-in-up" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', position: 'relative' }}>
            <Mic size={36} color="#94a3b8" />
            <div style={{ position: 'absolute', bottom: -5, right: -5, background: 'var(--color-bg-alt)', borderRadius: '50%', padding: '4px' }}>
              <Lock size={20} color="#cbd5e1" />
            </div>
          </div>
          
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Coming Soon</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            The Speaking Practice module is currently in development. It will feature real-time voice interaction with an AI examiner, covering Part 1, Part 2, and Part 3 of the IELTS speaking test.
          </p>
          
          <Link href="/">
            <button className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Return Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
