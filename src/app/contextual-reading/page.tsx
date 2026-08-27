'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, BrainCircuit, RefreshCw, Zap, Lightbulb, Link2 } from 'lucide-react';
import { AnnotatedText, SAMPLE_ANNOTATED_TEXT, Annotation } from '@/lib/annotated-data';
import { getAIBank, saveAIBank } from '@/lib/ai-bank';

export default function AnnotatedReadingPage() {
  const [texts, setTexts] = useState<AnnotatedText[]>([SAMPLE_ANNOTATED_TEXT]);
  const [activeTextId, setActiveTextId] = useState<string>(SAMPLE_ANNOTATED_TEXT.id);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const bank = getAIBank();
    if (bank.annotatedTexts && bank.annotatedTexts.length > 0) {
      setTexts([SAMPLE_ANNOTATED_TEXT, ...bank.annotatedTexts]);
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const bank = getAIBank();
      const history = bank.history.annotatedTopics || [];
      
      const res = await fetch('/api/generate-annotated', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history })
      });

      if (!res.ok) throw new Error('Failed to generate text');
      
      const data: AnnotatedText = await res.json();
      
      const updatedBank = { ...bank };
      updatedBank.annotatedTexts = [data, ...(updatedBank.annotatedTexts || [])];
      updatedBank.history.annotatedTopics = [data.topic, ...(updatedBank.history.annotatedTopics || [])];
      saveAIBank(updatedBank);
      
      setTexts([SAMPLE_ANNOTATED_TEXT, ...updatedBank.annotatedTexts]);
      setActiveTextId(data.id);
    } catch (error) {
      console.error(error);
      alert('Failed to generate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const activeText = texts.find(t => t.id === activeTextId) || texts[0];

  const renderAnnotatedText = (text: string, annotations: Annotation[]) => {
    // Basic string replacement to inject span tags. 
    // We sort annotations by length (longest first) to prevent partial word replacement bugs.
    const sortedAnnotations = [...annotations].sort((a, b) => b.textToHighlight.length - a.textToHighlight.length);
    
    let resultHTML = text;
    sortedAnnotations.forEach(anno => {
      let color = '#3b82f6'; // vocab
      let bg = 'rgba(59, 130, 246, 0.15)';
      if (anno.type === 'grammar') {
        color = '#10b981';
        bg = 'rgba(16, 185, 129, 0.15)';
      } else if (anno.type === 'connector') {
        color = '#a78bfa';
        bg = 'rgba(139, 92, 246, 0.15)';
      }

      const replacement = `<span 
        class="highlighted-term" 
        data-id="${anno.id}"
        style="background: ${bg}; color: ${color}; border-bottom: 2px solid ${color}; cursor: pointer; padding: 0.1rem 0.2rem; border-radius: 4px; transition: all 0.2s;"
      >${anno.textToHighlight}</span>`;
      
      // Simple replace (only first occurrence for safety)
      resultHTML = resultHTML.replace(anno.textToHighlight, replacement);
    });

    return (
      <div 
        dangerouslySetInnerHTML={{ __html: resultHTML }} 
        style={{ lineHeight: 1.8, fontSize: '1.1rem' }}
        onMouseOver={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('highlighted-term')) {
            const id = target.getAttribute('data-id');
            const found = annotations.find(a => a.id === id);
            if (found) setHoveredAnnotation(found);
          } else {
            setHoveredAnnotation(null);
          }
        }}
        onMouseLeave={() => setHoveredAnnotation(null)}
      />
    );
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', width: '100%' }}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Contextual Reading</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Hover over highlighted texts to reveal grammar, vocabulary, and connector insights.</p>
          </div>
          
          <div style={{ marginLeft: 'auto' }}>
             <button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="btn-clay"
                style={{ background: 'linear-gradient(145deg, #8b5cf6, #6d28d9)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                {isGenerating ? <RefreshCw size={18} className="spin" /> : <BrainCircuit size={18} />}
                {isGenerating ? 'Generating Essay...' : '+ Generate New Essay'}
              </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Sidebar / List */}
          <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Library</h3>
            {texts.map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTextId(t.id)}
                style={{
                  textAlign: 'left',
                  padding: '1rem',
                  background: activeTextId === t.id ? 'rgba(59, 130, 246, 0.15)' : 'rgba(0,0,0,0.1)',
                  border: `1px solid ${activeTextId === t.id ? '#3b82f6' : 'transparent'}`,
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.25rem' }}>{t.topic.toUpperCase()}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{t.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.difficulty}</div>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="glass-panel" style={{ flex: 1, minWidth: '400px', position: 'relative' }}>
             <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{activeText.title}</h2>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Topic: {activeText.topic}</span>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{activeText.difficulty}</span>
                </div>
             </div>

             <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Text Reader */}
                <div style={{ flex: 1, display: 'grid', gap: '1.5rem' }}>
                  {activeText.paragraphs.map((p, idx) => (
                    <div key={idx}>
                      {renderAnnotatedText(p.text, p.annotations)}
                    </div>
                  ))}
                </div>

                {/* Annotation Tooltip Panel */}
                <div style={{ width: '320px', flexShrink: 0 }}>
                  <div style={{ 
                    position: 'sticky', 
                    top: '2rem',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    minHeight: '300px'
                  }}>
                    {hoveredAnnotation ? (
                      <div className="animate-fade-in-up">
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          background: hoveredAnnotation.type === 'vocab' ? 'rgba(59, 130, 246, 0.2)' : hoveredAnnotation.type === 'grammar' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                          color: hoveredAnnotation.type === 'vocab' ? '#93c5fd' : hoveredAnnotation.type === 'grammar' ? '#6ee7b7' : '#c4b5fd',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          marginBottom: '1rem'
                        }}>
                          {hoveredAnnotation.type === 'vocab' && <BookOpen size={14} />}
                          {hoveredAnnotation.type === 'grammar' && <Zap size={14} />}
                          {hoveredAnnotation.type === 'connector' && <Link2 size={14} />}
                          {hoveredAnnotation.type}
                        </div>

                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>"{hoveredAnnotation.textToHighlight}"</h4>
                        
                        <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                          {hoveredAnnotation.meaning}
                        </p>

                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>STRUCTURE / FORMULA</div>
                          <div style={{ fontFamily: 'monospace', color: '#e2e8f0', fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                            {hoveredAnnotation.formulaOrUsage}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Lightbulb size={12} /> IELTS EXAM TIP
                          </div>
                          <p style={{ fontSize: '0.9rem', color: '#fef3c7', background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)', lineHeight: 1.5 }}>
                            {hoveredAnnotation.tips}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5, textAlign: 'center' }}>
                        <MousePointer2 size={40} style={{ marginBottom: '1rem' }} />
                        <p>Hover over the highlighted text in the paragraph to see the annotation details here.</p>
                      </div>
                    )}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MousePointer2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>
  );
}
