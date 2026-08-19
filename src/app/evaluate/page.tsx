'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { translations, Language } from '@/lib/i18n';
import { EvaluationRequest, EvaluationResponse } from '@/lib/types';
import { getWordCount, getScoreColor } from '@/lib/utils';
import { Copy, ArrowLeft, Loader2, Target, Zap, BookOpen, PenTool, CheckCircle, ArrowRight, RotateCcw, Check } from 'lucide-react';

/* ─────── Loading Steps Config ─────── */
const LOADING_STEPS_EN = [
  { key: 'reading', label: 'Reading and parsing your essay...', icon: '📖', duration: 2000 },
  { key: 'words', label: 'Counting words & analyzing sentence structure...', icon: '🔤', duration: 2500 },
  { key: 'task', label: 'Evaluating Task Achievement...', icon: '🎯', duration: 3500 },
  { key: 'coherence', label: 'Analyzing Coherence & Cohesion...', icon: '🔗', duration: 3000 },
  { key: 'lexical', label: 'Assessing Lexical Resource...', icon: '📚', duration: 3000 },
  { key: 'grammar', label: 'Checking Grammatical Range & Accuracy...', icon: '✏️', duration: 3500 },
  { key: 'feedback', label: 'Generating detailed feedback & corrections...', icon: '💡', duration: 4000 },
  { key: 'revised', label: 'Writing your Band 7.0+ revised essay...', icon: '✨', duration: 5000 },
];

const LOADING_STEPS_ID = [
  { key: 'reading', label: 'Membaca dan mengurai esai Anda...', icon: '📖', duration: 2000 },
  { key: 'words', label: 'Menghitung kata & menganalisis struktur kalimat...', icon: '🔤', duration: 2500 },
  { key: 'task', label: 'Mengevaluasi Pencapaian Tugas...', icon: '🎯', duration: 3500 },
  { key: 'coherence', label: 'Menganalisis Koherensi & Kohesi...', icon: '🔗', duration: 3000 },
  { key: 'lexical', label: 'Menilai Sumber Leksikal...', icon: '📚', duration: 3000 },
  { key: 'grammar', label: 'Memeriksa Jangkauan & Akurasi Tata Bahasa...', icon: '✏️', duration: 3500 },
  { key: 'feedback', label: 'Menghasilkan umpan balik & koreksi terperinci...', icon: '💡', duration: 4000 },
  { key: 'revised', label: 'Menulis esai revisi Band 7.0+ Anda...', icon: '✨', duration: 5000 },
];

/* ─────── Adaptive Loading Component ─────── */
function LoadingOverlay({ language }: { language: Language }) {
  const steps = language === 'id' ? LOADING_STEPS_ID : LOADING_STEPS_EN;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let elapsed = 0;
    steps.forEach((step, index) => {
      if (index === 0) return; // First step shown immediately
      elapsed += steps[index - 1].duration;
      timers.push(setTimeout(() => setCurrentStep(index), elapsed));
    });
    return () => timers.forEach(clearTimeout);
  }, [steps]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '3rem', gap: '2rem',
    }}>
      {/* Spinner */}
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin" style={{ animationDuration: '2s' }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="213.6" strokeDashoffset="160" />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          {steps[currentStep].icon}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: 'linear-gradient(90deg, var(--color-primary), #a78bfa)',
            borderRadius: '2px', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            width: `${progress}%`,
          }} />
        </div>
      </div>

      {/* Steps */}
      <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {steps.map((step, i) => {
          const status = i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending';
          return (
            <div key={step.key} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)',
              background: status === 'active' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              transition: 'all 0.3s ease',
              opacity: status === 'pending' ? 0.35 : 1,
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: status === 'done' ? 'var(--color-success)' : status === 'active' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                ...(status === 'active' ? { boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)' } : {}),
              }}>
                {status === 'done' ? <Check size={12} color="white" /> :
                 status === 'active' ? <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} /> :
                 <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                }
              </div>
              <span style={{
                fontSize: '0.85rem', fontWeight: status === 'active' ? 600 : 400,
                color: status === 'active' ? 'var(--color-text)' : 'var(--color-text-muted)',
              }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────── Error State Component ─────── */
function ErrorState({ message, onRetry, language }: { message: string; onRetry: () => void; language: Language }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '3rem', gap: '1.5rem', textAlign: 'center',
    }} className="animate-fade-in">
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.75rem' }}>⚠️</span>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-danger)' }}>
          {language === 'id' ? 'Evaluasi Gagal' : 'Evaluation Failed'}
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', lineHeight: 1.5, fontSize: '0.9rem' }}>{message}</p>
      </div>
      <button className="btn-clay" onClick={onRetry} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RotateCcw size={16} />
        {language === 'id' ? 'Coba Lagi' : 'Try Again'}
      </button>
    </div>
  );
}

/* ─────── Empty State Component ─────── */
function EmptyState({ language }: { language: Language }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
      </div>
      <div>
        <p style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
          {language === 'id' ? 'Siap untuk mengevaluasi' : 'Ready to evaluate'}
        </p>
        <p style={{ fontSize: '0.9rem' }}>
          {language === 'id' ? 'Tempel esai Anda dan tekan tombol evaluasi.' : 'Paste your essay and press the evaluate button.'}
        </p>
      </div>
    </div>
  );
}

/* ─────── Main Content ─────── */
function EvaluateContent() {
  const searchParams = useSearchParams();
  const initialTask = searchParams.get('task') === 'task1' ? 'task1' : 'task2';
  
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const [taskType, setTaskType] = useState<'task1' | 'task2'>(initialTask);
  const [question, setQuestion] = useState('');
  const [essay, setEssay] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<EvaluationResponse | null>(null);
  const [showResults, setShowResults] = useState(false);
  const resultsPanelRef = useRef<HTMLDivElement>(null);

  const wordCount = getWordCount(essay);

  // Read from practice module (if any)
  useEffect(() => {
    const savedEssay = sessionStorage.getItem('eval_essay');
    const savedQuestion = sessionStorage.getItem('eval_question');
    
    if (savedEssay) {
      setEssay(savedEssay);
      sessionStorage.removeItem('eval_essay');
    }
    if (savedQuestion) {
      setQuestion(savedQuestion);
      sessionStorage.removeItem('eval_question');
    }
  }, []);

  // Stagger results animation
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setShowResults(true), 100);
      if (resultsPanelRef.current) resultsPanelRef.current.scrollTop = 0;
      return () => clearTimeout(timer);
    } else {
      setShowResults(false);
    }
  }, [result]);

  const handleEvaluate = useCallback(async () => {
    if (!essay.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setError('');
    setResult(null);
    setShowResults(false);
    setIsEvaluating(true);

    try {
      const payload: EvaluationRequest = { essay, taskType, question, language };
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'API Error');
      }

      const data: EvaluationResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || t.errorApi);
    } finally {
      setIsEvaluating(false);
    }
  }, [essay, taskType, question, language, t]);

  const handleRetry = useCallback(() => {
    setError('');
    handleEvaluate();
  }, [handleEvaluate]);

  const ScoreRing = ({ score, label, size = 80 }: { score: number; label: string; size?: number }) => {
    const color = getScoreColor(score);
    const radius = (size / 2) - 5;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray - (dashArray * (score / 9));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle 
              cx={size/2} cy={size/2} r={radius} 
              fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={dashArray} strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size > 60 ? '1.25rem' : '1rem', fontWeight: 'bold' }}>
            {score.toFixed(1)}
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: `${size + 20}px` }}>{label}</span>
      </div>
    );
  };

  const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
      <div style={{ padding: '0.4rem', background: `${color}15`, borderRadius: 'var(--radius-sm)', color, display: 'flex' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{title}</h3>
    </div>
  );

  const AnimatedSection = ({ children, index }: { children: React.ReactNode; index: number }) => (
    <div className={showResults ? 'animate-fade-in-up' : ''} style={{ animationDelay: `${index * 0.1}s` }}>
      {children}
    </div>
  );

  /* ── Render States for Right Panel ── */
  const renderRightPanel = () => {
    if (isEvaluating) return <LoadingOverlay language={language} />;
    if (error && !result) return <ErrorState message={error} onRetry={handleRetry} language={language} />;
    if (!result) return <EmptyState language={language} />;

    let sectionIndex = 0;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Overall Summary */}
        {result.overallSummary && (
          <AnimatedSection index={sectionIndex++}>
            <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
              <SectionHeader icon={<Target size={20} />} title={t.overallSummaryTitle} color="var(--color-primary)" />
              <p style={{ lineHeight: 1.7, fontSize: '1.05rem' }}>{result.overallSummary}</p>
            </div>
          </AnimatedSection>
        )}
        
        {/* Scores */}
        <AnimatedSection index={sectionIndex++}>
          <div className="glass-panel">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>{t.scoresTitle}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
              <ScoreRing score={result.scores.taskAchievement} label={taskType === 'task1' ? "Task Achievement" : "Task Response"} />
              <ScoreRing score={result.scores.coherenceCohesion} label="Coherence & Cohesion" />
              <ScoreRing score={result.scores.lexicalResource} label="Lexical Resource" />
              <ScoreRing score={result.scores.grammaticalRange} label="Grammatical Range" />
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getScoreColor(result.scores.overall) }}>{t.overallScore}: {result.scores.overall.toFixed(1)}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Band Gap Analysis */}
        {result.bandGapAnalysis && result.bandGapAnalysis.length > 0 && (
          <AnimatedSection index={sectionIndex++}>
            <div className="glass-panel">
              <SectionHeader icon={<Target size={20} />} title={t.bandGapTitle} color="#a78bfa" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.bandGapAnalysis.map((gap, i) => (
                  <div key={i} style={{ background: 'rgba(167, 139, 250, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #a78bfa' }}>
                    <h4 style={{ color: '#a78bfa', marginBottom: '0.75rem', fontWeight: 600 }}>{gap.criterion}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase' }}>{t.currentLevel}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{gap.currentLevel}</div>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase' }}>{t.band7Requires}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{gap.band7Requirement}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <ArrowRight size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--color-primary)' }}>{t.actionStep}:</strong> {gap.actionStep}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Weak Point Boosters */}
        {result.weakPointBoosters && result.weakPointBoosters.length > 0 && (
          <AnimatedSection index={sectionIndex++}>
            <div className="glass-panel" style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <SectionHeader icon={<Zap size={20} />} title={t.weakPointTitle} color="var(--color-warning)" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {result.weakPointBoosters.map((booster, i) => (
                  <div key={i} style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-warning)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{ background: getScoreColor(booster.score), color: 'white', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 'bold' }}>{booster.score.toFixed(1)}</span>
                      <h4 style={{ fontWeight: 600 }}>{booster.criterion}</h4>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-warning)', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase' }}>{t.strategy}</div>
                      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{booster.strategy}</p>
                    </div>
                    <div style={{ marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>📚 {t.miniLesson}</div>
                      <p style={{ color: 'var(--color-text)', lineHeight: 1.6, fontSize: '0.95rem' }}>{booster.miniLesson}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 600, marginBottom: '0.25rem' }}>❌ {t.before}</div>
                        <div style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>"{booster.exampleBefore}"</div>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, marginBottom: '0.25rem' }}>✅ {t.after}</div>
                        <div style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-text)' }}>"{booster.exampleAfter}"</div>
                      </div>
                    </div>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px dashed rgba(59, 130, 246, 0.3)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>✏️ {t.practicePrompt}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{booster.practicePrompt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Detailed Feedback */}
        <AnimatedSection index={sectionIndex++}>
          <div className="glass-panel">
            <SectionHeader icon={<BookOpen size={20} />} title={t.feedbackTitle} color="var(--color-primary)" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'taskAchievement', label: t.taskAchievement },
                { key: 'coherenceCohesion', label: t.coherenceCohesion },
                { key: 'lexicalResource', label: t.lexicalResource },
                { key: 'grammaticalRange', label: t.grammaticalRange },
              ].map(({ key, label }) => (
                <div key={key}>
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{label}</h4>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{result.feedback[key as keyof typeof result.feedback]}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Corrected Sentences */}
        {result.correctedSentences && result.correctedSentences.length > 0 && (
          <AnimatedSection index={sectionIndex++}>
            <div className="glass-panel">
              <SectionHeader icon={<PenTool size={20} />} title={t.correctedTitle} color="#f472b6" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.correctedSentences.map((item, i) => (
                  <div key={i} style={{ background: 'rgba(244, 114, 182, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ background: 'rgba(244, 114, 182, 0.2)', color: '#f472b6', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>{item.errorType}</span>
                    </div>
                    <div style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--color-danger)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-danger)', fontWeight: 500 }}>✗ </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{item.original}</span>
                    </div>
                    <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--color-success)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 500 }}>✓ </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>{item.corrected}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Grammar Errors & Vocab */}
        <AnimatedSection index={sectionIndex++}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-danger)' }}>{t.grammarErrors}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, listStyle: 'none' }}>
                {result.grammarErrors.map((err, i) => (
                  <li key={i} style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    {err.rule && <div style={{ marginBottom: '0.4rem' }}><span style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--color-danger)', padding: '0.1rem 0.4rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>{err.rule}</span></div>}
                    <div style={{ textDecoration: 'line-through', color: 'var(--color-danger)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>"{err.error}"</div>
                    {err.correction && <div style={{ color: 'var(--color-success)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>→ "{err.correction}"</div>}
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{err.explanation}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-success)' }}>{t.vocabAlternatives}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, listStyle: 'none' }}>
                {result.vocabularyAlternatives.map((voc, i) => (
                  <li key={i} style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>"{voc.original}"</span>
                      <span>→</span>
                      <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{voc.suggestion}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{voc.context}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Cohesive Devices */}
        {result.cohesiveDevices && result.cohesiveDevices.length > 0 && (
          <AnimatedSection index={sectionIndex++}>
            <div className="glass-panel">
              <SectionHeader icon={<BookOpen size={20} />} title={t.cohesiveTitle} color="#06b6d4" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {result.cohesiveDevices.map((device, i) => (
                  <div key={i} style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #06b6d4' }}>
                    <h4 style={{ color: '#06b6d4', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>{device.function}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                      {device.devices.map((d, j) => (
                        <span key={j} style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontSize: '0.8rem', color: '#06b6d4', fontWeight: 500 }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic', borderTop: '1px solid rgba(6, 182, 212, 0.15)', paddingTop: '0.5rem' }}>
                      "{device.exampleSentence}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Model Sentences */}
        {result.modelSentences && result.modelSentences.length > 0 && (
          <AnimatedSection index={sectionIndex++}>
            <div className="glass-panel">
              <SectionHeader icon={<CheckCircle size={20} />} title={t.modelSentencesTitle} color="var(--color-success)" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.modelSentences.map((model, i) => (
                  <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-success)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>{model.purpose}</div>
                    <div style={{ fontSize: '1rem', lineHeight: 1.5, marginBottom: '0.5rem', color: 'var(--color-text)', fontWeight: 500 }}>"{model.sentence}"</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>💡 {model.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Paragraph Breakdown */}
        <AnimatedSection index={sectionIndex++}>
          <div className="glass-panel">
            <SectionHeader icon={<BookOpen size={20} />} title={t.paragraphBreakdown} color="var(--color-primary)" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {result.paragraphBreakdown.map((p, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Original:</span>
                    <span style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>"{p.original}"</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Main Idea:</span>
                    <span style={{ fontSize: '0.95rem' }}>{p.mainIdea}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--color-warning)', fontWeight: 500, fontSize: '0.9rem' }}>Reason:</span>
                    <span style={{ fontSize: '0.95rem' }}>{p.reason}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--color-success)', fontWeight: 500, fontSize: '0.9rem' }}>Example:</span>
                    <span style={{ fontSize: '0.95rem' }}>{p.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Revised Essay */}
        <AnimatedSection index={sectionIndex++}>
          <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{t.revisedEssay}</h3>
              <button 
                onClick={() => navigator.clipboard.writeText(result.revisedEssay)}
                className="btn-clay-secondary"
                style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
              >
                <Copy size={16} /> {t.copyFeedback}
              </button>
            </div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              {result.revisedEssay}
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{ padding: '0.75rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-card)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{t.backToHome}</span>
          </Link>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginLeft: '1rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>{t.appTitle}</h1>
        </div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--color-border)', color: 'white', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', outline: 'none', fontSize: '0.85rem', fontFamily: 'inherit' }}
        >
          <option value="en">English 🇬🇧</option>
          <option value="id">Indonesia 🇮🇩</option>
        </select>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel: Form */}
        <div style={{
          flex: '0 0 38%', maxWidth: '38%', display: 'flex', flexDirection: 'column',
          borderRight: '1px solid var(--color-border)', overflow: 'hidden',
        }}>
          {/* Task toggle */}
          <div style={{ padding: '1rem 1.5rem 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-lg)' }}>
              <button 
                className={`btn-clay-secondary ${taskType === 'task1' ? 'active' : ''}`}
                onClick={() => setTaskType('task1')}
                style={{ flex: 1, textAlign: 'center', padding: '0.5rem', fontSize: '0.8rem' }}
              >
                {t.task1} — {t.task1Desc}
              </button>
              <button 
                className={`btn-clay-secondary ${taskType === 'task2' ? 'active' : ''}`}
                onClick={() => setTaskType('task2')}
                style={{ flex: 1, textAlign: 'center', padding: '0.5rem', fontSize: '0.8rem' }}
              >
                {t.task2} — {t.task2Desc}
              </button>
            </div>
          </div>

          {/* Scrollable form body */}
          <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Question field (compact) */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{t.questionLabel}</label>
              <textarea 
                className="input-field" 
                rows={2} 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="E.g., You recently organized a party..."
                style={{ resize: 'vertical', fontSize: '0.9rem' }}
              />
            </div>

            {/* Essay field (takes remaining space) */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', alignItems: 'center' }}>
                <label style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{t.essayLabel}</label>
                <span style={{
                  fontSize: '0.8rem', fontWeight: 600,
                  padding: '0.15rem 0.5rem', borderRadius: '9999px',
                  background: wordCount < (taskType === 'task1' ? 150 : 250) ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: wordCount < (taskType === 'task1' ? 150 : 250) ? 'var(--color-warning)' : 'var(--color-success)',
                }}>
                  {t.wordCount} {wordCount}{taskType === 'task1' ? '/150' : '/250'}
                </span>
              </div>
              <textarea 
                className="input-field" 
                style={{ flex: 1, minHeight: '180px', resize: 'none', fontSize: '0.9rem' }} 
                value={essay} 
                onChange={(e) => setEssay(e.target.value)}
                placeholder={t.essayPlaceholder}
              />
            </div>
          </div>

          {/* Submit button (fixed bottom) */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)', flexShrink: 0, background: 'var(--color-bg-card)' }}>
            {error && !isEvaluating && (
              <div style={{ color: 'var(--color-danger)', padding: '0.5rem 0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.85rem' }}>{error}</div>
            )}
            <button 
              className="btn-clay" 
              onClick={handleEvaluate} 
              disabled={isEvaluating}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem' }}
            >
              {isEvaluating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t.evaluating}
                </>
              ) : t.evaluateBtn}
            </button>
          </div>
        </div>

        {/* Right Panel: Results */}
        <div ref={resultsPanelRef} style={{ flex: '1 1 62%', overflowY: 'auto', background: 'rgba(0,0,0,0.15)', padding: result ? '2rem' : 0 }}>
          {renderRightPanel()}
        </div>
      </div>
    </div>
  );
}

export default function EvaluatePage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading evaluator...</div>}>
      <EvaluateContent />
    </Suspense>
  );
}
