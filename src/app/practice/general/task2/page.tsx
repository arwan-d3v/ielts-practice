'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { translations, Language } from '@/lib/i18n';
import { STRUCTURE_GUIDE_TASK2, TASK2_PROMPTS } from '@/lib/practice-data';
import { GuidancePackage } from '@/lib/types';
import { getWordCount } from '@/lib/utils';
import { ArrowLeft, RefreshCw, Send, ChevronDown } from 'lucide-react';
import { StructureGuide } from '@/components/StructureGuide';
import { DynamicTips } from '@/components/DynamicTips';

type EssayType = 'opinion' | 'advantages' | 'causes' | 'discussion';

export default function Task2Practice() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const [essayType, setEssayType] = useState<EssayType>('opinion');
  const [prompt, setPrompt] = useState(TASK2_PROMPTS['opinion'][0].text);
  const [essay, setEssay] = useState('');
  
  // Real-time tracking
  const [currentSectionId, setCurrentSectionId] = useState('p1');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const wordCount = getWordCount(essay);

  // AI Guidance
  const [guidance, setGuidance] = useState<GuidancePackage | null>(null);
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);

  useEffect(() => {
    const fetchGuidance = async () => {
      setIsGeneratingGuide(true);
      setGuidance(null);
      try {
        const res = await fetch('/api/practice-guide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, taskType: 'task2' })
        });
        if (res.ok) {
          const data = await res.json();
          setGuidance(data);
        }
      } catch (e) {
        console.error('Failed to fetch guidance', e);
      } finally {
        setIsGeneratingGuide(false);
      }
    };
    fetchGuidance();
  }, [prompt]);

  // Time tracking (40 mins = 2400 seconds)
  const [timeRemaining, setTimeRemaining] = useState(2400);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Heuristic to detect section based on paragraphs
  useEffect(() => {
    const paragraphs = essay.split('\n').filter(line => line.trim().length > 0);
    const pCount = paragraphs.length;
    
    let newCompleted: string[] = [];
    let current = 'p1';

    if (pCount === 0) {
      current = 'p1';
    } else {
      const maxP = guidance ? guidance.structuralSkeleton.length : 4;
      const pIndex = Math.min(pCount + 1, maxP);
      current = `p${pIndex}`;
      for (let i = 1; i < pIndex; i++) newCompleted.push(`p${i}`);
    }

    setCurrentSectionId(current);
    setCompletedSections(newCompleted);
  }, [essay, guidance]);

  const generatePrompt = () => {
    const arr = TASK2_PROMPTS[essayType];
    const random = arr[Math.floor(Math.random() * arr.length)];
    setPrompt(random.text);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as EssayType;
    setEssayType(type);
    const arr = TASK2_PROMPTS[type];
    setPrompt(arr[0].text);
  };

  const handleSubmit = () => {
    sessionStorage.setItem('eval_essay', essay);
    sessionStorage.setItem('eval_question', prompt);
    router.push('/evaluate?task=task2');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-card)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/practice" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Back</span>
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Task 2 Essay Practice</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', fontSize: '1.1rem', color: timeRemaining <= 300 ? 'var(--color-danger)' : 'var(--color-text)', fontWeight: 'bold', background: timeRemaining <= 300 ? 'rgba(239, 68, 68, 0.1)' : 'transparent', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            ⏳ {formatTime(timeRemaining)}
          </div>
          <button onClick={handleSubmit} disabled={wordCount < 10} className="btn-clay" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            Submit <Send size={14} />
          </button>
        </div>
      </header>

      {/* Main Grid: 3 Columns */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left: Structure Guide (25%) */}
        <div style={{ flex: '0 0 25%', borderRight: '1px solid var(--color-border)', padding: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
          <StructureGuide 
            title={t.structureGuide}
            steps={guidance ? guidance.structuralSkeleton.map(s => ({ id: `p${s.paragraph}`, title: `Paragraph ${s.paragraph}`, description: s.focus, icon: '📝' })) : STRUCTURE_GUIDE_TASK2} 
            currentSectionId={currentSectionId} 
            completedSections={completedSections} 
          />
        </div>

        {/* Center: Canvas (50%) */}
        <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          
          <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem', borderTop: '3px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <select 
                  value={essayType}
                  onChange={handleTypeChange}
                  style={{ appearance: 'none', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: 'var(--color-primary)', padding: '0.25rem 1.5rem 0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
                >
                  <option value="opinion">Opinion (Agree/Disagree)</option>
                  <option value="advantages">Advantages & Disadvantages</option>
                  <option value="causes">Causes & Solutions</option>
                  <option value="discussion">Discuss Both Views</option>
                </select>
                <ChevronDown size={12} color="var(--color-primary)" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>

              <button onClick={generatePrompt} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
                <RefreshCw size={12} /> {t.generatePrompt}
              </button>
            </div>
            <p style={{ fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: 1.5, color: 'var(--color-text)' }}>{prompt}</p>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '12px', zIndex: 10 }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '9999px',
                background: wordCount < 250 ? 'rgba(245, 158, 11, 0.9)' : 'rgba(16, 185, 129, 0.9)',
                color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {wordCount} / 250 words
              </span>
            </div>
            <textarea 
              className="input-field" 
              style={{ flex: 1, resize: 'none', fontSize: '1rem', lineHeight: 1.6, padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="It is often argued that..."
            />
          </div>
        </div>

        {/* Right: Dynamic Tips (25%) */}
        <div style={{ flex: '0 0 25%', padding: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
          <DynamicTips 
            taskType="task2"
            currentSectionId={currentSectionId}
            essayType={essayType}
            wordCount={wordCount}
            timeRemaining={timeRemaining}
            guidance={guidance}
            isLoadingGuidance={isGeneratingGuide}
          />
        </div>

      </div>
    </div>
  );
}
