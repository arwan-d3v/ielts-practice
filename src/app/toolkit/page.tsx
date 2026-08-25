'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MessageSquare, Layers, HelpCircle, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import { CONNECTORS, FORMULAS, PHRASE_BANK } from '@/lib/toolkit-data';

export default function LanguageToolkit() {
  const [activeTab, setActiveTab] = useState<'connectors' | 'formulas' | 'phrases'>('connectors');
  
  // Accordion state for Connectors
  const [expandedConnector, setExpandedConnector] = useState<string | null>(CONNECTORS[0]?.id || null);
  
  // Accordion state for Formulas
  const [expandedFormulaCat, setExpandedFormulaCat] = useState<string | null>('opinion');
  
  const formulaCategories = Array.from(new Set(FORMULAS.map(f => f.category)));
  
  return (
    <div className="responsive-layout">
      {/* Header */}
      <header className="responsive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} />
            <span style={{ fontWeight: 500 }}>Home</span>
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} className="text-primary" /> Language Toolkit
          </h1>
        </div>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-lg)' }}>
          <button 
            onClick={() => setActiveTab('connectors')}
            style={{ 
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
              background: activeTab === 'connectors' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              color: activeTab === 'connectors' ? '#60a5fa' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'connectors' ? 'bold' : 'normal',
              display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
            }}
          >
            <BookOpen size={16} /> Connectors
          </button>
          <button 
            onClick={() => setActiveTab('formulas')}
            style={{ 
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
              background: activeTab === 'formulas' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              color: activeTab === 'formulas' ? '#34d399' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'formulas' ? 'bold' : 'normal',
              display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
            }}
          >
            <Zap size={16} /> Formulas
          </button>
          <button 
            onClick={() => setActiveTab('phrases')}
            style={{ 
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
              background: activeTab === 'phrases' ? 'rgba(167, 139, 250, 0.2)' : 'transparent',
              color: activeTab === 'phrases' ? '#c084fc' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'phrases' ? 'bold' : 'normal',
              display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
            }}
          >
            <MessageSquare size={16} /> Phrase Bank
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-panel" style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* TAB 1: Connectors */}
          {activeTab === 'connectors' && (
            <div className="animate-fade-in-up">
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Linking Words & Connectors</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>Essential transitional devices to improve your Coherence & Cohesion score. Aim for a mix of simple and advanced connectors.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {CONNECTORS.map(group => {
                  const isExpanded = expandedConnector === group.id;
                  
                  return (
                    <div key={group.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                      <button 
                        onClick={() => setExpandedConnector(isExpanded ? null : group.id)}
                        style={{ 
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                          padding: '1.25rem', background: isExpanded ? `${group.color}10` : 'transparent', 
                          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: isExpanded ? group.color : 'white' }}>{group.function}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{group.description}</p>
                          </div>
                        </div>
                        <div style={{ color: 'var(--color-text-muted)' }}>
                          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                          {group.connectors.map((c, i) => (
                            <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: group.color }}>{c.word}</span>
                                <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{c.level}</span>
                              </div>
                              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{c.usage}</p>
                              
                              {c.isForWriting && (
                                <div style={{ marginBottom: '0.75rem' }}>
                                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>✍️ Writing Example</div>
                                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>"{c.exampleWriting}"</p>
                                </div>
                              )}
                              
                              {c.isForSpeaking && (
                                <div style={{ marginBottom: '0.5rem' }}>
                                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>🗣️ Speaking Example</div>
                                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>"{c.exampleSpeaking}"</p>
                                </div>
                              )}

                              {c.commonMistake && (
                                <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--color-danger)' }}>
                                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', color: 'var(--color-danger)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    <HelpCircle size={12} /> Watch out
                                  </div>
                                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{c.commonMistake}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Formulas */}
          {activeTab === 'formulas' && (
            <div className="animate-fade-in-up">
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Sentence Formulas</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>Plug-and-play sentence structures that guarantee grammatical range and accuracy.</p>
              </div>

              <div className="responsive-layout" style={{ gap: '2rem', overflow: 'visible' }}>
                {/* Categories Sidebar */}
                <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {formulaCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setExpandedFormulaCat(cat)}
                      style={{ 
                        padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', textAlign: 'left',
                        background: expandedFormulaCat === cat ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        color: expandedFormulaCat === cat ? '#34d399' : 'var(--color-text-muted)',
                        fontWeight: expandedFormulaCat === cat ? 'bold' : 'normal',
                        textTransform: 'capitalize'
                      }}
                    >
                      {cat.replace('-', ' ')}
                    </button>
                  ))}
                </div>

                {/* Formulas List */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {FORMULAS.filter(f => f.category === expandedFormulaCat).map((formula, idx) => (
                    <div key={idx} className="glass-panel" style={{ borderLeft: '4px solid #34d399' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formula.name}</h3>
                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{formula.bandLevel}</span>
                      </div>
                      
                      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontFamily: 'monospace', color: '#6ee7b7', fontSize: '1rem', lineHeight: 1.5 }}>
                        {formula.formula}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Example in Action</span>
                          <p style={{ fontSize: '0.95rem', marginTop: '0.25rem' }}>{formula.filledExample}</p>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Formal (Writing)</span>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', fontStyle: 'italic' }}>"{formula.formalVersion}"</p>
                          </div>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Informal (Speaking)</span>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', fontStyle: 'italic' }}>"{formula.informalVersion}"</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                          <HelpCircle size={16} className="text-primary" />
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}><strong>When to use:</strong> {formula.whenToUse}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Phrase Bank */}
          {activeTab === 'phrases' && (
            <div className="animate-fade-in-up">
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Lexical Phrase Bank</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>High-level chunks of language organized by task and function. Learning phrases is faster than learning single words.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {PHRASE_BANK.map((entry, idx) => (
                  <div key={idx} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '3px solid #c084fc' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(192, 132, 252, 0.1)', color: '#c084fc', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold', display: 'inline-block', marginBottom: '0.5rem' }}>
                        {entry.section}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>"{entry.phrase}"</h3>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Function</span>
                      <p style={{ fontSize: '0.9rem' }}>{entry.meaning}</p>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Example</span>
                      <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>{entry.exampleInContext}</p>
                    </div>
                    
                    {entry.alternatives && entry.alternatives.length > 0 && (
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Alternatives</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                          {entry.alternatives.map((alt, i) => (
                            <span key={i} style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>• {alt}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
