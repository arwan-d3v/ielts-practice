'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Settings, Sparkles, CheckCircle, XCircle, ChevronRight, Book, AlertCircle } from 'lucide-react';
import { READING_PASSAGES, ReadingPassage } from '@/lib/reading-data';

type TimerMode = 'exam' | 'relaxed' | 'none';

export default function ReadingPractice() {
  // State
  const [passages, setPassages] = useState<ReadingPassage[]>(READING_PASSAGES);
  const [activePassageId, setActivePassageId] = useState<string>(READING_PASSAGES[0].id);
  
  // Timer State
  const [timerMode, setTimerMode] = useState<TimerMode>('exam');
  const [timeRemaining, setTimeRemaining] = useState<number>(1200); // 20 mins default for Exam
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // For Relaxed mode
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Answering State
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // AI Generate State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('Technology');
  const [aiDifficulty, setAiDifficulty] = useState('medium');

  const activePassage = passages.find(p => p.id === activePassageId) || passages[0];

  // Load generated passages from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ielts_reading_generated');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPassages([...READING_PASSAGES, ...parsed]);
        }
      } catch (e) {
        console.error('Failed to parse generated passages', e);
      }
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        if (timerMode === 'exam') {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current as NodeJS.Timeout);
              setIsTimerRunning(false);
              handleSubmit(); // Auto-submit when time is up
              return 0;
            }
            return prev - 1;
          });
        } else if (timerMode === 'relaxed') {
          setTimeElapsed((prev) => prev + 1);
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerMode]);

  // Format Time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartPassage = (id: string) => {
    setActivePassageId(id);
    setAnswers({});
    setIsSubmitted(false);
    setTimeRemaining(1200);
    setTimeElapsed(0);
    setIsTimerRunning(true);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsTimerRunning(false);
    let correct = 0;
    
    activePassage.questions.forEach(q => {
      const userAnswer = answers[q.id]?.toLowerCase().trim();
      const correctAnswer = q.correctAnswer.toLowerCase().trim();
      
      // Basic matching - could be more robust for short answer
      if (userAnswer === correctAnswer || (q.options && q.options.some(opt => opt.toLowerCase().includes(userAnswer) && opt.toLowerCase().includes(correctAnswer)))) {
        correct++;
      } else if (q.type === 'multiple-choice' || q.type === 'matching-info') {
         // handle "A", "B" etc matching "A. Option 1"
         if (correctAnswer.startsWith(userAnswer)) correct++;
      }
    });

    setScore({ correct, total: activePassage.questions.length });
    setIsSubmitted(true);
  };

  const generatePassage = async () => {
    setIsGenerating(true);
    setAiError('');
    try {
      const historyTitles = passages.map(p => p.title);
      
      const res = await fetch('/api/generate-passage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: aiTopic,
          difficulty: aiDifficulty,
          historyTitles 
        })
      });
      
      if (!res.ok) throw new Error('Failed to generate passage');
      
      const newPassage = await res.json();
      
      const updatedPassages = [...passages, newPassage];
      setPassages(updatedPassages);
      
      // Save generated ones to local storage (filter out hardcoded ones)
      const generatedOnly = updatedPassages.filter(p => p.id.startsWith('ai_'));
      localStorage.setItem('ielts_reading_generated', JSON.stringify(generatedOnly));
      
      setShowAiModal(false);
      handleStartPassage(newPassage.id);
      
    } catch (err: any) {
      setAiError(err.message || 'Error generating passage');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <header className="responsive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} />
            <span style={{ fontWeight: 500 }}>Home</span>
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} className="text-primary" /> Reading Practice
          </h1>
        </div>
        
        {/* Timer Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: 'var(--radius-md)' }}>
            <button 
              onClick={() => { setTimerMode('exam'); setIsTimerRunning(false); }}
              style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', borderRadius: '4px', border: 'none', background: timerMode === 'exam' ? 'var(--color-danger)' : 'transparent', color: timerMode === 'exam' ? 'white' : 'var(--color-text-muted)', cursor: 'pointer' }}
            >Exam</button>
            <button 
              onClick={() => { setTimerMode('relaxed'); setIsTimerRunning(false); }}
              style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', borderRadius: '4px', border: 'none', background: timerMode === 'relaxed' ? 'var(--color-warning)' : 'transparent', color: timerMode === 'relaxed' ? 'white' : 'var(--color-text-muted)', cursor: 'pointer' }}
            >Relaxed</button>
            <button 
              onClick={() => { setTimerMode('none'); setIsTimerRunning(false); }}
              style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', borderRadius: '4px', border: 'none', background: timerMode === 'none' ? 'var(--color-border)' : 'transparent', color: timerMode === 'none' ? 'white' : 'var(--color-text-muted)', cursor: 'pointer' }}
            >None</button>
          </div>
          
          {timerMode !== 'none' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: timerMode === 'exam' && timeRemaining < 300 ? 'var(--color-danger)' : 'white' }}>
              <Clock size={20} />
              {timerMode === 'exam' ? formatTime(timeRemaining) : formatTime(timeElapsed)}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area: 3 Columns */}
      <div className="responsive-layout">
        
        {/* Left Sidebar: Passage List */}
        <div className="sidebar-panel" style={{ borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem 1rem 1rem' }}>
            <button 
              onClick={() => setShowAiModal(true)}
              className="btn-clay"
              style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #a78bfa)', border: 'none', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold' }}
            >
              <Sparkles size={16} /> Generate New
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {passages.map(p => {
              const isActive = activePassageId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleStartPassage(p.id)}
                  style={{
                    padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left',
                    background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: p.difficulty === 'easy' ? '#10b981' : p.difficulty === 'medium' ? '#f59e0b' : '#ef4444', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {p.difficulty} • {p.topic}
                  </div>
                  <div style={{ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'white' : 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.3 }}>
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Passage Text */}
        <div className="main-panel" style={{ borderRight: '1px solid var(--color-border)', padding: '2rem', overflowY: 'auto', background: 'var(--color-bg-alt)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#e2e8f0' }}>{activePassage.title}</h1>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <span>{activePassage.wordCount} words</span>
                <span>•</span>
                <span style={{ color: activePassage.difficulty === 'easy' ? '#10b981' : activePassage.difficulty === 'medium' ? '#f59e0b' : '#ef4444', textTransform: 'capitalize' }}>{activePassage.difficulty} Difficulty</span>
              </div>
            </div>

            {!isTimerRunning && !isSubmitted && timerMode !== 'none' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
                <Book size={48} color="var(--color-text-muted)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ready to start?</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>The passage and questions will appear when you begin.</p>
                <button 
                  className="btn-primary" 
                  onClick={() => setIsTimerRunning(true)}
                  style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
                >
                  Start Reading
                </button>
              </div>
            ) : (
              <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>
                {activePassage.passage}
              </div>
            )}
          </div>
        </div>

        {/* Right: Questions Panel */}
        <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Questions</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{activePassage.questions.length} items to complete</p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {(!isTimerRunning && !isSubmitted && timerMode !== 'none') ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-muted)' }}>
                Start the timer to view questions.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {activePassage.questions.map((q, idx) => (
                  <div key={q.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${isSubmitted ? (answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? '#10b981' : '#ef4444') : '#3b82f6'}` }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{idx + 1}.</span>
                      <div>
                        <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'inline-block' }}>{q.type.replace('-', ' ')}</span>
                        <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{q.question}</p>
                      </div>
                    </div>

                    {!isSubmitted ? (
                      <div>
                        {q.options ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {q.options.map((opt, i) => (
                              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px', background: answers[q.id] === opt[0] ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}>
                                <input 
                                  type="radio" 
                                  name={q.id} 
                                  value={opt[0]} 
                                  checked={answers[q.id] === opt[0]}
                                  onChange={() => handleAnswerChange(q.id, opt[0])}
                                  style={{ accentColor: 'var(--color-primary)' }}
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        ) : (
                          <input 
                            type="text" 
                            placeholder="Type your answer..."
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            className="input-field"
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                          />
                        )}
                      </div>
                    ) : (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? '#10b981' : '#ef4444' }}>
                          {answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? <CheckCircle size={16} /> : <XCircle size={16} />}
                          <span style={{ fontWeight: 'bold' }}>{answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? 'Correct' : 'Incorrect'}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Your answer:</span> {answers[q.id] || <span style={{ fontStyle: 'italic' }}>None</span>}
                        </div>
                        <div style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Correct answer:</span> <span style={{ fontWeight: 'bold', color: '#10b981' }}>{q.correctAnswer}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                          <strong>Explanation:</strong> {q.explanation}
                          {q.paragraphRef && <div style={{ marginTop: '0.25rem', color: '#60a5fa' }}>📍 Found in {q.paragraphRef}</div>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action */}
          {(isTimerRunning || timerMode === 'none') && !isSubmitted && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}>
              <button 
                onClick={handleSubmit}
                className="btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                Submit Answers
              </button>
            </div>
          )}

          {isSubmitted && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', background: 'rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                Score: {score.correct} / {score.total}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                {Math.round((score.correct / score.total) * 100)}% Accuracy
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Generator Modal */}
      {showAiModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
          <div className="glass-panel animate-fade-in-up" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles className="text-primary" /> Generate Passage
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Create a unique IELTS reading passage using AI.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Topic</label>
                <input 
                  type="text" 
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. Artificial Intelligence, Climate Change, History of Rome"
                  className="input-field"
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Difficulty</label>
                <select 
                  value={aiDifficulty}
                  onChange={(e) => setAiDifficulty(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                >
                  <option value="easy">Easy (~500 words, simpler structure)</option>
                  <option value="medium">Medium (~700 words, standard IELTS)</option>
                  <option value="hard">Hard (~900 words, complex academic)</option>
                </select>
              </div>
            </div>

            {aiError && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} /> {aiError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowAiModal(false)}
                style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button 
                onClick={generatePassage}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate AI Passage'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
