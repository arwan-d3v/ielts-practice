'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, FileDown, Eye, CheckSquare, Square } from 'lucide-react';
import { VOCAB_TOPICS } from '@/lib/vocab-data';
import { CONNECTORS, FORMULAS, PHRASE_BANK } from '@/lib/toolkit-data';
import { STUDY_PLAN } from '@/lib/study-plan-data';
import { GRAMMAR_RULES } from '@/lib/grammar-data';
import { getAIBank, saveAIBank, getHistoryStrings, clearAIBankSection, AIBankStore } from '@/lib/ai-bank';
import styles from './print.module.css';

type SectionKey = 'vocabulary' | 'connectors' | 'grammar' | 'formulas' | 'phrases' | 'plan' | 'annotated';

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: 'vocabulary', label: 'Vocabulary', icon: '📚' },
  { key: 'connectors', label: 'Connectors', icon: '🔗' },
  { key: 'grammar', label: 'Grammar', icon: '🧩' },
  { key: 'formulas', label: 'Sentence Formulas', icon: '📐' },
  { key: 'phrases', label: 'Phrase Bank', icon: '💬' },
  { key: 'annotated', label: 'Contextual Reading', icon: '📖' },
  { key: 'plan', label: 'Study Plan', icon: '📅' },
];

export default function PrintMaterials() {
  const [activeSections, setActiveSections] = useState<Set<SectionKey>>(
    new Set(['vocabulary', 'connectors', 'grammar', 'formulas', 'phrases', 'plan'])
  );
  const [includeAiBank, setIncludeAiBank] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // AI Bank States
  const [aiBank, setAiBank] = useState<AIBankStore | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  React.useEffect(() => {
    setAiBank(getAIBank());
  }, []);

  const handleGenerate = async (section: keyof AIBankStore | 'annotated') => {
    if (section === 'history' || section === 'generationLog') return;
    setIsGenerating(section);
    try {
      let res;
      if (section === 'annotated') {
        res = await fetch('/api/generate-annotated', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: getHistoryStrings(section) })
        });
      } else {
        res = await fetch('/api/generate-bank', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section, history: getHistoryStrings(section) })
        });
      }

      if (!res.ok) throw new Error('Failed to generate');
      const data = await res.json();
      
      const currentBank = getAIBank();
      if (section === 'vocabulary' && data.words) {
        currentBank.vocabulary.push(...data.words);
        currentBank.history.words.push(...data.words.map((w: any) => w.word));
      } else if (section === 'connectors' && data.connectors) {
        currentBank.connectors.push(...data.connectors);
        currentBank.history.connectorWords.push(...data.connectors.map((c: any) => c.word));
      } else if (section === 'formulas' && data.formulas) {
        currentBank.formulas.push(...data.formulas);
      } else if (section === 'phrases' && data.phrases) {
        currentBank.phrases.push(...data.phrases);
        currentBank.history.phraseStrings.push(...data.phrases.map((p: any) => p.phrase));
      } else if (section === 'grammar' && data.grammar) {
        currentBank.grammar.push(...data.grammar);
        currentBank.history.grammarTopics.push(...data.grammar.map((g: any) => g.topic));
      } else if (section === 'annotated' && data.topic) {
        if (!currentBank.annotatedTexts) currentBank.annotatedTexts = [];
        if (!currentBank.history.annotatedTopics) currentBank.history.annotatedTopics = [];
        currentBank.annotatedTexts.unshift(data); // Add to beginning
        currentBank.history.annotatedTopics.push(data.topic);
      }
      
      saveAIBank(currentBank);
      setAiBank(currentBank);
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleClearAi = (section: keyof AIBankStore) => {
    if (confirm(`Clear all AI generated ${section}?`)) {
      const updated = clearAIBankSection(section);
      setAiBank(updated!);
    }
  };

  const toggleSection = (key: SectionKey) => {
    setActiveSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'learn': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' };
      case 'practice': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399' };
      case 'mock': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' };
      case 'review': return { bg: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' };
      default: return { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' };
    }
  };

  // Build TOC entries based on active sections
  const tocEntries: { num: string; label: string }[] = [];
  let sectionCounter = 0;
  
  const vocabCount = VOCAB_TOPICS.reduce((a, t) => a + t.words.length, 0) + (includeAiBank && aiBank ? aiBank.vocabulary.length : 0);
  const connCount = CONNECTORS.reduce((a, g) => a + g.connectors.length, 0) + (includeAiBank && aiBank ? aiBank.connectors.length : 0);
  const gramCount = GRAMMAR_RULES.length + (includeAiBank && aiBank && aiBank.grammar ? aiBank.grammar.length : 0);
  const formCount = FORMULAS.length + (includeAiBank && aiBank ? aiBank.formulas.length : 0);
  const phraseCount = PHRASE_BANK.length + (includeAiBank && aiBank ? aiBank.phrases.length : 0);

  if (activeSections.has('vocabulary')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `Daily Vocabulary Reference (${vocabCount} words)` }); }
  if (activeSections.has('connectors')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `Linking Words & Connectors (${connCount} connectors)` }); }
  if (activeSections.has('grammar')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `Grammar Builder (${gramCount} rules & formula tips)` }); }
  if (activeSections.has('formulas')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `Sentence Formulas (${formCount} templates)` }); }
  if (activeSections.has('phrases')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `Phrase Bank (${phraseCount} essential phrases)` }); }
  if (activeSections.has('annotated')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `Contextual Reading (${aiBank?.annotatedTexts?.length || 0} annotated texts)` }); }
  if (activeSections.has('plan')) { sectionCounter++; tocEntries.push({ num: `${sectionCounter}`, label: `14-Day Intensive Study Plan (${STUDY_PLAN.length} days, ${STUDY_PLAN.reduce((a, d) => a + d.tasks.length, 0)} tasks)` }); }

  let currentSection = 0;

  return (
    <div className={styles.printContainer} style={previewMode ? { background: 'white', color: '#1a1a1a' } : {}}>
      {/* ── Controls Bar ──────────────────────────────────── */}
      <div className={styles.controlsBar}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className={styles.controlsLeft}>
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={16} />
              Home
            </Link>
            <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>📄 Print Materials</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={styles.printBtnSecondary} onClick={() => setPreviewMode(!previewMode)}>
              <Eye size={16} />
              {previewMode ? 'Dark Mode' : 'Preview Print'}
            </button>
            <button className={styles.printBtnPrimary} onClick={handlePrint}>
              <Printer size={16} />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Section Toggles */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>INCLUDED SECTIONS:</div>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={activeSections.has(s.key) ? styles.sectionToggleActive : styles.sectionToggle}
              onClick={() => toggleSection(s.key)}
              title={`Toggle ${s.label}`}
            >
              {activeSections.has(s.key) ? <CheckSquare size={14} /> : <Square size={14} />}
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* AI Bank Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0.75rem', borderRadius: '8px', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a78bfa' }}>🤖 AI BANK EXTENSION:</div>
            <button 
              className={includeAiBank ? styles.sectionToggleActive : styles.sectionToggle}
              style={includeAiBank ? { borderColor: '#a78bfa', color: '#a78bfa', background: 'rgba(139, 92, 246, 0.2)' } : {}}
              onClick={() => setIncludeAiBank(!includeAiBank)}
            >
              {includeAiBank ? <CheckSquare size={14} /> : <Square size={14} />} Include in Print
            </button>
          </div>
          
          <div style={{ width: '1px', height: '24px', background: 'rgba(139, 92, 246, 0.3)' }}></div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => handleGenerate('vocabulary')} disabled={isGenerating === 'vocabulary'} className={styles.sectionToggle} style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#a78bfa' }}>
              {isGenerating === 'vocabulary' ? 'Generating...' : '+ Vocab'} ({aiBank?.vocabulary.length || 0})
            </button>
            <button onClick={() => handleGenerate('connectors')} disabled={isGenerating === 'connectors'} className={styles.sectionToggle} style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#a78bfa' }}>
              {isGenerating === 'connectors' ? 'Generating...' : '+ Connectors'} ({aiBank?.connectors.length || 0})
            </button>
            <button onClick={() => handleGenerate('grammar')} disabled={isGenerating === 'grammar'} className={styles.sectionToggle} style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#a78bfa' }}>
              {isGenerating === 'grammar' ? 'Generating...' : '+ Grammar'} ({aiBank?.grammar?.length || 0})
            </button>
            <button onClick={() => handleGenerate('formulas')} disabled={isGenerating === 'formulas'} className={styles.sectionToggle} style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#a78bfa' }}>
              {isGenerating === 'formulas' ? 'Generating...' : '+ Formulas'} ({aiBank?.formulas.length || 0})
            </button>
            <button onClick={() => handleGenerate('phrases')} disabled={isGenerating === 'phrases'} className={styles.sectionToggle} style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#a78bfa' }}>
              {isGenerating === 'phrases' ? 'Generating...' : '+ Phrases'} ({aiBank?.phrases.length || 0})
            </button>
            <button onClick={() => handleGenerate('annotated')} disabled={isGenerating === 'annotated'} className={styles.sectionToggle} style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#a78bfa' }}>
              {isGenerating === 'annotated' ? 'Generating...' : '+ Reading'} ({aiBank?.annotatedTexts?.length || 0})
            </button>
          </div>
        </div>
      </div>

      {/* ── Printable Area ────────────────────────────────── */}
      <div className={styles.printArea} ref={printRef} style={previewMode ? { background: 'white', color: '#1a1a1a' } : {}}>

        {/* ═══ COVER PAGE ═══ */}
        <div className={styles.coverPage}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📘</div>
          <h1 className={styles.coverTitle} style={previewMode ? { WebkitTextFillColor: '#1e40af', color: '#1e40af' } : {}}>
            IELTS Quick Prepare
          </h1>
          <p className={styles.coverSubtitle} style={previewMode ? { color: '#475569' } : {}}>
            Complete Study Materials — Band 7.0+ in 14 Days
          </p>
          <div className={styles.coverMeta} style={previewMode ? { color: '#64748b' } : {}}>
            <p>General Training Module</p>
            <p>Vocabulary • Connectors • Sentence Formulas • Phrase Bank • Study Plan</p>
            <p style={{ marginTop: '1rem' }}>Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* ═══ TABLE OF CONTENTS ═══ */}
        <div className={`${styles.tocSection} ${styles.pageBreakBefore}`}>
          <h2 className={styles.tocTitle} style={previewMode ? { color: '#1a1a1a', borderBottomColor: '#1e40af' } : {}}>
            📋 Table of Contents
          </h2>
          <ul className={styles.tocList}>
            {tocEntries.map((entry) => (
              <li key={entry.num} className={styles.tocItem} style={previewMode ? { color: '#1a1a1a', borderBottomColor: '#e2e8f0' } : {}}>
                <span className={styles.tocNumber} style={previewMode ? { color: '#1e40af' } : {}}>{entry.num}.</span>
                <span className={styles.tocLabel}>{entry.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ═══ SECTION 1: VOCABULARY ═══ */}
        {activeSections.has('vocabulary') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                📚 Daily Vocabulary Reference
              </h2>
              <p className={styles.sectionDescription} style={previewMode ? { color: '#64748b' } : {}}>
                High-frequency academic words organized by IELTS topic. Each word includes definitions, examples, synonyms, antonyms, and tips for higher band scores.
              </p>
            </div>

            {(includeAiBank && aiBank && aiBank.vocabulary.length > 0 ? 
              [...VOCAB_TOPICS, { id: 'ai-gen', name: '🤖 AI Generated', icon: '✨', color: '#a78bfa', words: aiBank.vocabulary }] 
              : VOCAB_TOPICS
            ).map((topic) => (
              <div key={topic.id}>
                <div
                  className={styles.topicHeader}
                  style={{
                    borderLeftColor: topic.color,
                    background: previewMode ? '#f1f5f9' : `${topic.color}10`,
                  }}
                >
                  <span className={styles.topicIcon}>{topic.icon}</span>
                  <span className={styles.topicName} style={previewMode ? { color: '#1a1a1a' } : {}}>{topic.name}</span>
                  <span className={styles.topicCount} style={previewMode ? { color: '#64748b' } : {}}>
                    {topic.words.length} words
                  </span>
                </div>

                {topic.words.map((word) => (
                  <div key={word.id || word.word} className={styles.wordCard} style={previewMode ? { background: 'white', borderColor: '#cbd5e1' } : {}}>
                    {/* Word Header */}
                    <div className={styles.wordHeader}>
                      <span className={styles.wordName} style={previewMode ? { color: '#1e40af' } : {}}>{word.word}</span>
                      <span className={styles.badgePos} style={previewMode ? { background: '#ede9fe', color: '#6d28d9' } : {}}>{word.partOfSpeech}</span>
                      <span className={styles.badgeLevel} style={previewMode ? { background: '#d1fae5', color: '#065f46' } : {}}>{word.ieltsLevel}</span>
                    </div>

                    {/* Definition */}
                    <div className={styles.wordDefinition}>
                      <div className={styles.defEn} style={previewMode ? { color: '#1a1a1a' } : {}}>{word.definition}</div>
                      <div className={styles.defId} style={previewMode ? { color: '#64748b' } : {}}>{word.definitionId}</div>
                    </div>

                    {/* Examples */}
                    <div className={styles.exampleBox} style={{
                      borderLeftColor: '#3b82f6',
                      background: previewMode ? '#f8fafc' : 'rgba(0,0,0,0.15)'
                    }}>
                      <div className={styles.exampleLabel} style={{ color: previewMode ? '#1e40af' : '#60a5fa' }}>✏️ Formal Example</div>
                      <div className={styles.exampleText} style={previewMode ? { color: '#334155' } : {}}>{word.exampleFormal}</div>
                    </div>
                    <div className={styles.exampleBox} style={{
                      borderLeftColor: '#10b981',
                      background: previewMode ? '#f8fafc' : 'rgba(0,0,0,0.15)'
                    }}>
                      <div className={styles.exampleLabel} style={{ color: previewMode ? '#065f46' : '#34d399' }}>💬 Informal Example</div>
                      <div className={styles.exampleText} style={previewMode ? { color: '#334155' } : {}}>{word.exampleInformal}</div>
                    </div>

                    {/* Grid: Synonyms, Antonyms, Collocations, Phrase Usage */}
                    <div className={styles.wordGrid} style={{ marginTop: '0.75rem' }}>
                      <div className={styles.wordField} style={previewMode ? { background: '#f8fafc', border: '1px solid #e2e8f0' } : {}}>
                        <div className={styles.fieldLabel} style={previewMode ? { color: '#64748b' } : {}}>Synonyms</div>
                        <div className={styles.fieldValue} style={previewMode ? { color: '#1a1a1a' } : {}}>{word.synonyms.length > 0 ? word.synonyms.join(', ') : '—'}</div>
                      </div>
                      <div className={styles.wordField} style={previewMode ? { background: '#f8fafc', border: '1px solid #e2e8f0' } : {}}>
                        <div className={styles.fieldLabel} style={previewMode ? { color: '#64748b' } : {}}>Antonyms</div>
                        <div className={styles.fieldValue} style={previewMode ? { color: '#1a1a1a' } : {}}>{word.antonyms.length > 0 ? word.antonyms.join(', ') : '—'}</div>
                      </div>
                      <div className={styles.wordField} style={previewMode ? { background: '#f8fafc', border: '1px solid #e2e8f0' } : {}}>
                        <div className={styles.fieldLabel} style={previewMode ? { color: '#64748b' } : {}}>Collocations</div>
                        <div className={styles.fieldValue} style={previewMode ? { color: '#1a1a1a' } : {}}>{word.collocations.join(', ')}</div>
                      </div>
                      <div className={styles.wordField} style={previewMode ? { background: '#f8fafc', border: '1px solid #e2e8f0' } : {}}>
                        <div className={styles.fieldLabel} style={previewMode ? { color: '#64748b' } : {}}>Daily Sentence</div>
                        <div className={styles.fieldValue} style={previewMode ? { color: '#1a1a1a' } : {}}>{word.dailySentence}</div>
                      </div>
                    </div>

                    {/* Higher Band Tip */}
                    <div className={styles.tipBox} style={previewMode ? { background: '#fffbeb', borderColor: '#fbbf24' } : {}}>
                      <div className={styles.tipLabel} style={previewMode ? { color: '#b45309' } : {}}>🎯 Higher Band Usage</div>
                      <div className={styles.tipText} style={previewMode ? { color: '#1a1a1a' } : {}}>
                        Use the phrase &quot;{word.phraseUsage}&quot; in your writing to demonstrate advanced vocabulary control.
                      </div>
                    </div>

                    {/* Common Mistake */}
                    {word.commonMistake && (
                      <div className={styles.mistakeBox} style={previewMode ? { background: '#fef2f2', borderColor: '#fca5a5' } : {}}>
                        <div className={styles.mistakeLabel} style={previewMode ? { color: '#dc2626' } : {}}>⚠️ Common Mistake</div>
                        <div className={styles.tipText} style={previewMode ? { color: '#1a1a1a' } : {}}>{word.commonMistake}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ═══ SECTION 2: CONNECTORS ═══ */}
        {activeSections.has('connectors') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                🔗 Linking Words & Connectors
              </h2>
              <p className={styles.sectionDescription} style={previewMode ? { color: '#64748b' } : {}}>
                Essential connectors for achieving coherence in IELTS Writing and Speaking. Organized by function with band-level indicators.
              </p>
            </div>

            {(includeAiBank && aiBank && aiBank.connectors.length > 0 ? 
              [...CONNECTORS, { id: 'ai-gen', function: '🤖 AI Generated', description: 'Dynamically generated connectors', icon: '✨', color: '#a78bfa', connectors: aiBank.connectors }] 
              : CONNECTORS
            ).map((group) => (
              <div key={group.id} className={styles.connectorGroup}>
                <div
                  className={styles.connectorGroupHeader}
                  style={{
                    borderLeftColor: group.color,
                    background: previewMode ? '#f1f5f9' : `${group.color}10`,
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{group.icon}</span>
                  <span className={styles.connectorGroupName} style={previewMode ? { color: '#1a1a1a' } : {}}>{group.function}</span>
                  <span className={styles.connectorGroupDesc} style={previewMode ? { color: '#64748b' } : {}}>{group.description}</span>
                </div>

                {group.connectors.map((conn, idx) => (
                  <div key={idx} className={styles.connectorCard} style={previewMode ? { background: 'white', borderColor: '#cbd5e1' } : {}}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <span className={styles.connectorWord} style={previewMode ? { color: '#1e40af' } : {}}>{conn.word}</span>
                      <span className={styles.badgeLevel} style={previewMode ? { background: '#d1fae5', color: '#065f46' } : {}}>{conn.level}</span>
                    </div>
                    <div className={styles.connectorMeta}>
                      {conn.isForWriting && <span className={styles.forWriting} style={previewMode ? { background: '#dbeafe', color: '#1e40af' } : {}}>✏️ Writing</span>}
                      {conn.isForSpeaking && <span className={styles.forSpeaking} style={previewMode ? { background: '#d1fae5', color: '#065f46' } : {}}>🗣️ Speaking</span>}
                    </div>
                    <div className={styles.connectorUsage} style={previewMode ? { color: '#64748b' } : {}}>{conn.usage}</div>

                    {conn.isForWriting && (
                      <div className={styles.exampleBox} style={{
                        borderLeftColor: '#3b82f6',
                        background: previewMode ? '#f8fafc' : 'rgba(0,0,0,0.15)',
                        marginBottom: '0.5rem'
                      }}>
                        <div className={styles.exampleLabel} style={{ color: previewMode ? '#1e40af' : '#60a5fa' }}>Writing Example</div>
                        <div className={styles.exampleText} style={previewMode ? { color: '#334155' } : {}}>{conn.exampleWriting}</div>
                      </div>
                    )}
                    {conn.isForSpeaking && (
                      <div className={styles.exampleBox} style={{
                        borderLeftColor: '#10b981',
                        background: previewMode ? '#f8fafc' : 'rgba(0,0,0,0.15)'
                      }}>
                        <div className={styles.exampleLabel} style={{ color: previewMode ? '#065f46' : '#34d399' }}>Speaking Example</div>
                        <div className={styles.exampleText} style={previewMode ? { color: '#334155' } : {}}>{conn.exampleSpeaking}</div>
                      </div>
                    )}
                    {conn.commonMistake && (
                      <div className={styles.mistakeBox} style={previewMode ? { background: '#fef2f2', borderColor: '#fca5a5' } : {}}>
                        <div className={styles.mistakeLabel} style={previewMode ? { color: '#dc2626' } : {}}>⚠️ Common Mistake</div>
                        <div className={styles.tipText} style={previewMode ? { color: '#1a1a1a' } : {}}>{conn.commonMistake}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ═══ SECTION: GRAMMAR BUILDER ═══ */}
        {activeSections.has('grammar') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                🧩 Grammar Builder
              </h2>
              <p className={styles.sectionDescription} style={previewMode ? { color: '#64748b' } : {}}>
                Advanced sentence structures and formula tips for Band 7.0+.
              </p>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
            {(includeAiBank && aiBank && aiBank.grammar && aiBank.grammar.length > 0 ? 
              [...GRAMMAR_RULES, ...aiBank.grammar.map(g => ({...g, id: g.id || `ai-${Math.random()}`, topic: `🤖 ${g.topic}`}))] 
              : GRAMMAR_RULES
            ).map((rule) => (
              <div key={rule.id} className={styles.formulaCard} style={previewMode ? { background: 'white', borderColor: '#cbd5e1' } : {}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span className={styles.formulaName} style={previewMode ? { color: '#1a1a1a' } : {}}>{rule.topic}</span>
                  <span className={styles.suitabilityBadge} style={{ 
                    background: rule.difficulty === 'Expert' ? 'rgba(239, 68, 68, 0.15)' : rule.difficulty === 'Fundamental' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', 
                    color: rule.difficulty === 'Expert' ? '#ef4444' : rule.difficulty === 'Fundamental' ? '#10b981' : '#fbbf24' 
                  }}>
                    {rule.difficulty}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: previewMode ? '#475569' : 'var(--color-text-muted)' }}>
                  {rule.description}
                </p>

                <div className={styles.formulaTemplate} style={previewMode ? { background: '#eff6ff', borderColor: '#93c5fd', color: '#1a1a1a' } : {}}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3b82f6', marginBottom: '0.25rem' }}>FORMULA / STRUCTURE</div>
                  {rule.formula}
                </div>

                <div className={styles.tipBox} style={previewMode ? { background: '#fffbeb', borderColor: '#fbbf24' } : {}}>
                  <div className={styles.tipLabel}>💡 Usage Tip</div>
                  <div className={styles.tipText} style={previewMode ? { color: '#1a1a1a' } : {}}>{rule.formulaTip}</div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  {rule.examples.map((ex, idx) => (
                    <div key={idx} style={{ marginBottom: '0.5rem' }}>
                      <div className={styles.exampleBox} style={previewMode ? { background: '#f8fafc', borderLeftColor: '#3b82f6' } : {}}>
                        <div className={styles.exampleLabel} style={{ color: '#10b981' }}>BAND 7.0+ EXAMPLE</div>
                        <div className={styles.exampleText} style={previewMode ? { color: '#1a1a1a' } : {}}>"{ex.band7}"</div>
                      </div>
                      
                      {ex.commonMistake && (
                        <div className={styles.mistakeBox} style={previewMode ? { background: '#fef2f2', borderColor: '#fca5a5' } : {}}>
                          <div className={styles.mistakeLabel}>❌ COMMON MISTAKE</div>
                          <div className={styles.exampleText} style={previewMode ? { color: '#1a1a1a', textDecoration: 'line-through' } : { textDecoration: 'line-through' }}>"{ex.commonMistake}"</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* ═══ SECTION: SENTENCE FORMULAS ═══ */}
        {activeSections.has('formulas') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                📐 Sentence Formulas
              </h2>
              <p className={styles.sectionDescription} style={previewMode ? { color: '#64748b' } : {}}>
                Ready-to-use sentence templates for writing and speaking. Fill in the brackets to create high-scoring sentences.
              </p>
            </div>

            {(includeAiBank && aiBank && aiBank.formulas.length > 0 ? 
              [...FORMULAS, ...aiBank.formulas.map(f => ({...f, id: f.id || `ai-${Math.random()}`, name: `🤖 ${f.name}`}))] 
              : FORMULAS
            ).map((formula) => (
              <div key={formula.id} className={styles.formulaCard} style={previewMode ? { background: 'white', borderColor: '#cbd5e1' } : {}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span className={styles.formulaName} style={previewMode ? { color: '#1a1a1a' } : {}}>{formula.name}</span>
                  <span className={styles.badgeLevel} style={previewMode ? { background: '#d1fae5', color: '#065f46' } : {}}>{formula.bandLevel}</span>
                  <span className={styles.badgePos} style={previewMode ? { background: '#ede9fe', color: '#6d28d9' } : {}}>{formula.skill}</span>
                </div>
                <div className={styles.formulaCategory} style={previewMode ? { color: '#64748b' } : {}}>
                  Category: {formula.category.replace('-', ' ')}
                </div>

                {/* Template */}
                <div className={styles.formulaTemplate} style={previewMode ? { background: '#eff6ff', borderColor: '#93c5fd', color: '#1a1a1a' } : {}}>
                  {formula.formula}
                </div>

                {/* Filled Example */}
                <div className={styles.exampleBox} style={{
                  borderLeftColor: '#3b82f6',
                  background: previewMode ? '#f8fafc' : 'rgba(0,0,0,0.15)',
                  marginBottom: '0.75rem'
                }}>
                  <div className={styles.exampleLabel} style={{ color: previewMode ? '#1e40af' : '#60a5fa' }}>✅ Example (Filled)</div>
                  <div className={styles.exampleText} style={previewMode ? { color: '#334155' } : {}}>{formula.filledExample}</div>
                </div>

                {/* Formal & Informal Versions */}
                <div className={styles.wordGrid}>
                  <div className={styles.wordField} style={previewMode ? { background: '#f8fafc', border: '1px solid #e2e8f0' } : {}}>
                    <div className={styles.fieldLabel} style={previewMode ? { color: '#64748b' } : {}}>Formal Version</div>
                    <div className={styles.fieldValue} style={previewMode ? { color: '#1a1a1a' } : {}}>{formula.formalVersion}</div>
                  </div>
                  <div className={styles.wordField} style={previewMode ? { background: '#f8fafc', border: '1px solid #e2e8f0' } : {}}>
                    <div className={styles.fieldLabel} style={previewMode ? { color: '#64748b' } : {}}>Informal Version</div>
                    <div className={styles.fieldValue} style={previewMode ? { color: '#1a1a1a' } : {}}>{formula.informalVersion}</div>
                  </div>
                </div>

                {/* When to Use */}
                <div className={styles.tipBox} style={previewMode ? { background: '#fffbeb', borderColor: '#fbbf24' } : {}}>
                  <div className={styles.tipLabel} style={previewMode ? { color: '#b45309' } : {}}>📌 When to Use</div>
                  <div className={styles.tipText} style={previewMode ? { color: '#1a1a1a' } : {}}>{formula.whenToUse}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ SECTION 4: PHRASE BANK ═══ */}
        {activeSections.has('phrases') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                💬 Phrase Bank
              </h2>
              <p className={styles.sectionDescription} style={previewMode ? { color: '#64748b' } : {}}>
                Ready-made phrases for every part of the IELTS exam. Memorize these to boost fluency and accuracy.
              </p>
            </div>

            {(includeAiBank && aiBank && aiBank.phrases.length > 0 ? 
              [...PHRASE_BANK, ...aiBank.phrases.map(p => ({...p, id: p.id || `ai-${Math.random()}`, phrase: `🤖 ${p.phrase}`}))] 
              : PHRASE_BANK
            ).map((phrase) => (
              <div key={phrase.id} className={styles.phraseCard} style={previewMode ? { background: 'white', borderColor: '#cbd5e1' } : {}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span className={styles.phraseText} style={previewMode ? { color: '#1e40af' } : {}}>{phrase.phrase}</span>
                  <span className={styles.badgeLevel} style={previewMode ? { background: '#d1fae5', color: '#065f46' } : {}}>{phrase.bandLevel}</span>
                  <span className={styles.badgePos} style={previewMode ? { background: '#ede9fe', color: '#6d28d9' } : {}}>{phrase.register}</span>
                </div>
                <div className={styles.phraseMeaning} style={previewMode ? { color: '#64748b' } : {}}>
                  {phrase.meaning} — <em>{phrase.meaningId}</em>
                </div>
                <div style={{ fontSize: '0.78rem', color: previewMode ? '#64748b' : 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  Section: {phrase.section} • Skill: {phrase.skill}
                </div>

                {/* Example in Context */}
                <div className={styles.phraseContext} style={previewMode ? { background: '#f8fafc', borderLeftColor: '#3b82f6', color: '#334155' } : {}}>
                  &quot;{phrase.exampleInContext}&quot;
                </div>

                {/* Alternatives */}
                {phrase.alternatives.length > 0 && (
                  <div>
                    <div className={styles.fieldLabel} style={{ marginTop: '0.5rem', ...(previewMode ? { color: '#64748b' } : {}) }}>Alternatives</div>
                    <div className={styles.alternativesList}>
                      {phrase.alternatives.map((alt, i) => (
                        <span key={i} className={styles.alternativeChip} style={previewMode ? { background: '#ede9fe', color: '#6d28d9' } : {}}>
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ SECTION: CONTEXTUAL READING ═══ */}
        {activeSections.has('annotated') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>Contextual Reading</h2>
              <p className={styles.sectionSubtitle} style={previewMode ? { color: '#475569' } : {}}>
                Annotated IELTS essays showing advanced grammar, vocabulary, and connectors in action.
              </p>
            </div>

            <div className={styles.phraseList}>
              {(!aiBank?.annotatedTexts || aiBank.annotatedTexts.length === 0) ? (
                <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
                  <p>No annotated texts generated yet. Use the "+ Reading" button above to generate some!</p>
                </div>
              ) : (
                aiBank.annotatedTexts.map((annoText) => (
                  <div key={annoText.id} style={{ marginBottom: '40mm', pageBreakInside: 'avoid' }}>
                    <div style={{ background: previewMode ? '#f1f5f9' : '#1e293b', padding: '1rem', borderRadius: '8px 8px 0 0', borderBottom: previewMode ? '2px solid #e2e8f0' : '2px solid #334155' }}>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, color: previewMode ? '#1e40af' : '#60a5fa' }}>{annoText.title}</h3>
                      <div style={{ fontSize: '0.8rem', color: previewMode ? '#64748b' : '#94a3b8', marginTop: '0.25rem' }}>Topic: {annoText.topic} | {annoText.difficulty}</div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem', background: previewMode ? 'white' : '#0f172a', borderWidth: '0 1px 1px 1px', borderStyle: 'solid', borderColor: previewMode ? '#e2e8f0' : '#1e293b', borderRadius: '0 0 8px 8px' }}>
                      {/* Left Column: The Essay Text */}
                      <div style={{ flex: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                        {annoText.paragraphs.map((p, idx) => {
                           const sortedAnnos = [...p.annotations].sort((a, b) => b.textToHighlight.length - a.textToHighlight.length);
                           let res = p.text;
                           sortedAnnos.forEach((a, i) => {
                             res = res.replace(a.textToHighlight, `<strong style="border-bottom: 2px solid #1e40af; color: #1e40af;">${a.textToHighlight} <sup>[${idx+1}.${i+1}]</sup></strong>`);
                           });
                           return (
                             <p key={idx} dangerouslySetInnerHTML={{ __html: res }} style={{ marginBottom: '1rem' }} />
                           );
                        })}
                      </div>

                      {/* Right Column: Explanations */}
                      <div style={{ flex: 2, borderLeft: previewMode ? '1px dashed #cbd5e1' : '1px dashed #334155', paddingLeft: '1.5rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: previewMode ? '#475569' : '#94a3b8' }}>Annotations & Notes</h4>
                        {annoText.paragraphs.map((p, idx) => (
                          <div key={idx} style={{ marginBottom: '1.5rem' }}>
                            {p.annotations.map((a, i) => (
                              <div key={a.id} style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                                <div style={{ fontWeight: 'bold', color: previewMode ? '#1e40af' : '#60a5fa', marginBottom: '0.2rem' }}>
                                  [{idx+1}.${i+1}] {a.textToHighlight}
                                  <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: previewMode ? '#64748b' : '#94a3b8', marginLeft: '0.5rem', textTransform: 'uppercase' }}>({a.type})</span>
                                </div>
                                <div style={{ marginBottom: '0.2rem' }}><strong>Meaning:</strong> {a.meaning}</div>
                                <div style={{ marginBottom: '0.2rem' }}><strong>Formula:</strong> <span style={{ fontFamily: 'monospace', color: previewMode ? '#334155' : '#cbd5e1' }}>{a.formulaOrUsage}</span></div>
                                <div style={{ color: previewMode ? '#b45309' : '#fbbf24', fontStyle: 'italic', background: previewMode ? '#fef3c7' : 'rgba(245, 158, 11, 0.1)', padding: '0.4rem', borderRadius: '4px', marginTop: '0.3rem' }}>
                                  💡 {a.tips}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ═══ SECTION 5: 14-DAY STUDY PLAN ═══ */}
        {activeSections.has('plan') && (
          <div>
            <div className={`${styles.sectionHeader} ${styles.pageBreakBefore}`}>
              <div className={styles.sectionNumber} style={previewMode ? { color: '#1e40af' } : {}}>
                Section {++currentSection}
              </div>
              <h2 className={styles.sectionTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                📅 14-Day Intensive Study Plan
              </h2>
              <p className={styles.sectionDescription} style={previewMode ? { color: '#64748b' } : {}}>
                Your day-by-day structured plan. Use the checkboxes to track your progress when studying from the printed copy.
              </p>
            </div>

            {STUDY_PLAN.map((day) => {
              const typeColors = {
                learn: { bg: previewMode ? '#dbeafe' : 'rgba(59, 130, 246, 0.15)', color: previewMode ? '#1e40af' : '#60a5fa' },
                practice: { bg: previewMode ? '#d1fae5' : 'rgba(16, 185, 129, 0.15)', color: previewMode ? '#065f46' : '#34d399' },
                mock: { bg: previewMode ? '#fef3c7' : 'rgba(245, 158, 11, 0.15)', color: previewMode ? '#b45309' : '#fbbf24' },
                review: { bg: previewMode ? '#ede9fe' : 'rgba(139, 92, 246, 0.15)', color: previewMode ? '#6d28d9' : '#a78bfa' },
              };

              return (
                <div key={day.day} className={styles.planDayCard} style={previewMode ? { background: 'white', borderColor: '#cbd5e1' } : {}}>
                  <div className={styles.planDayHeader} style={previewMode ? { borderBottomColor: '#e2e8f0' } : {}}>
                    <div
                      className={styles.planDayNumber}
                      style={{
                        background: previewMode ? '#f1f5f9' : `${day.color}20`,
                        color: previewMode ? '#1e40af' : day.color,
                      }}
                    >
                      {day.day}
                    </div>
                    <div>
                      <div className={styles.planDayTitle} style={previewMode ? { color: '#1a1a1a' } : {}}>
                        {day.icon} {day.title}
                      </div>
                      <div className={styles.planDayTheme} style={previewMode ? { color: '#64748b' } : {}}>{day.theme}</div>
                    </div>
                    <span className={styles.planDayTime} style={previewMode ? { color: '#64748b' } : {}}>
                      ⏱ {day.estimatedTime}
                    </span>
                  </div>

                  <ul className={styles.planTaskList}>
                    {day.tasks.map((task) => {
                      const tc = typeColors[task.type] || getTypeColor(task.type);
                      return (
                        <li key={task.id} className={styles.planTask}>
                          <div className={styles.planTaskCheckbox} style={previewMode ? { borderColor: '#94a3b8' } : {}}></div>
                          <span className={styles.planTaskTime} style={previewMode ? { color: '#64748b' } : {}}>{task.time}</span>
                          <span
                            className={styles.planTaskType}
                            style={{ background: tc.bg, color: tc.color }}
                          >
                            {task.type}
                          </span>
                          <span className={styles.planTaskActivity} style={previewMode ? { color: '#1a1a1a' } : {}}>{task.activity}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ FOOTER ═══ */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem 0',
          borderTop: previewMode ? '2px solid #e2e8f0' : '2px solid var(--color-border)',
          textAlign: 'center',
          color: previewMode ? '#94a3b8' : 'var(--color-text-muted)',
          fontSize: '0.85rem',
        }}>
          <p style={{ marginBottom: '0.25rem' }}>IELTS Quick Prepare — Complete Study Materials</p>
          <p>Generated on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} • For personal study use only</p>
        </div>
      </div>
    </div>
  );
}
