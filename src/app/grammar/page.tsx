'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, BrainCircuit, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { GRAMMAR_RULES, GrammarRule } from '@/lib/grammar-data';
import { getAIBank } from '@/lib/ai-bank';

interface QuizQuestion {
  id: string;
  type: string;
  topic: string;
  instruction: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function GrammarBuilderPage() {
  const [activeTab, setActiveTab] = useState<'library' | 'quiz'>('library');
  const [grammarRules, setGrammarRules] = useState<GrammarRule[]>(GRAMMAR_RULES);

  // Quiz States
  const [difficulty, setDifficulty] = useState(2); // 1 to 5
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load AI Bank grammar rules
    const bank = getAIBank();
    if (bank.grammar && bank.grammar.length > 0) {
      setGrammarRules([...GRAMMAR_RULES, ...bank.grammar.map(g => ({...g, id: g.id || `ai-${Math.random()}`}))]);
    }
  }, []);

  const generateQuiz = async () => {
    setIsGeneratingQuiz(true);
    setQuizQuestions([]);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);

    try {
      const res = await fetch('/api/generate-grammar-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficulty,
          topics: grammarRules.map(g => g.topic)
        })
      });

      if (!res.ok) throw new Error('Failed to generate quiz');
      const data = await res.json();
      if (data.questions) {
        setQuizQuestions(data.questions);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    const correct = selectedOption === quizQuestions[currentQuestionIdx].correctAnswer;
    if (correct) {
      setScore(s => s + 1);
      // Adaptive: Increase difficulty if they get it right
      if (difficulty < 5) setDifficulty(d => d + 1);
    } else {
      // Adaptive: Decrease difficulty if they get it wrong
      if (difficulty > 1) setDifficulty(d => d - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // End of quiz block
      alert(`Quiz block completed! You scored ${score}/${quizQuestions.length}. Difficulty is now level ${difficulty}.`);
      setQuizQuestions([]);
    }
  };

  const currentQ = quizQuestions[currentQuestionIdx];

  return (
    <div style={{ height: '100%', overflowY: 'auto', width: '100%' }}>
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Grammar Builder</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Advanced sentence structures and adaptive quizzes.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('library')}
          style={{
            padding: '0.75rem 1.5rem',
            background: activeTab === 'library' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookOpen size={18} /> Rules Library
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          style={{
            padding: '0.75rem 1.5rem',
            background: activeTab === 'quiz' ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BrainCircuit size={18} /> Adaptive Quiz
        </button>
      </div>

      {activeTab === 'library' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {grammarRules.map(rule => (
            <div key={rule.id} className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
              {rule.id.startsWith('ai-') && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, borderBottomLeftRadius: '8px' }}>
                  🤖 AI GENERATED
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#60a5fa' }}>{rule.topic}</h3>
                <span style={{ 
                  background: rule.difficulty === 'Expert' ? 'rgba(239, 68, 68, 0.15)' : rule.difficulty === 'Fundamental' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', 
                  color: rule.difficulty === 'Expert' ? '#ef4444' : rule.difficulty === 'Fundamental' ? '#10b981' : '#fbbf24',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>{rule.difficulty}</span>
              </div>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{rule.description}</p>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '3px solid #3b82f6' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>FORMULA / STRUCTURE</div>
                <div style={{ fontFamily: 'monospace', color: '#93c5fd', fontSize: '0.9rem' }}>{rule.formula}</div>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.5rem' }}>💡 USAGE TIP</div>
                <div style={{ fontSize: '0.9rem' }}>{rule.formulaTip}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '0.75rem' }}>EXAMPLES</div>
                {rule.examples.map((ex, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontStyle: 'italic' }}>"{ex.band7}"</span>
                    </div>
                    {ex.commonMistake && (
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#ef4444', fontSize: '0.9rem' }}>
                        <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ textDecoration: 'line-through' }}>{ex.commonMistake}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
            Go to the <b>Print Materials</b> page to generate more rules with AI.
          </p>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Adaptive Grammar Quiz</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Current Difficulty Level: <strong style={{ color: '#8b5cf6' }}>{difficulty} / 5</strong></p>
            </div>
            {quizQuestions.length === 0 && (
              <button 
                onClick={generateQuiz} 
                disabled={isGeneratingQuiz}
                className="btn-clay"
                style={{ background: 'linear-gradient(145deg, #8b5cf6, #6d28d9)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                {isGeneratingQuiz ? <RefreshCw size={18} className="spin" /> : <BrainCircuit size={18} />}
                {isGeneratingQuiz ? 'Generating...' : 'Start Quiz'}
              </button>
            )}
          </div>

          {quizQuestions.length > 0 && currentQ && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                <span>QUESTION {currentQuestionIdx + 1} OF {quizQuestions.length}</span>
                <span>TOPIC: {currentQ.topic.toUpperCase()}</span>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <p style={{ color: '#94a3b8', marginBottom: '1rem', fontStyle: 'italic' }}>{currentQ.instruction}</p>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500 }}>
                  {currentQ.sentence.split('[BLANK]').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span style={{ display: 'inline-block', width: '80px', borderBottom: '2px solid #8b5cf6', margin: '0 0.5rem' }}></span>}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrectAnswer = currentQ.correctAnswer === opt;
                  
                  let bgColor = 'rgba(255,255,255,0.05)';
                  let borderColor = 'rgba(255,255,255,0.1)';
                  
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      bgColor = 'rgba(16, 185, 129, 0.2)';
                      borderColor = '#10b981';
                    } else if (isSelected && !isCorrectAnswer) {
                      bgColor = 'rgba(239, 68, 68, 0.2)';
                      borderColor = '#ef4444';
                    }
                  } else if (isSelected) {
                    bgColor = 'rgba(139, 92, 246, 0.2)';
                    borderColor = '#8b5cf6';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        background: bgColor,
                        border: `2px solid ${borderColor}`,
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '1rem',
                        cursor: isAnswered ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {opt}
                      {isAnswered && isCorrectAnswer && <CheckCircle size={20} color="#10b981" />}
                      {isAnswered && isSelected && !isCorrectAnswer && <XCircle size={20} color="#ef4444" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered ? (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #8b5cf6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ color: '#c4b5fd', marginBottom: '0.5rem' }}>Explanation</h4>
                    <p style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{currentQ.explanation}</p>
                  </div>
                  <button onClick={handleNextQuestion} className="btn-clay" style={{ background: 'linear-gradient(145deg, #8b5cf6, #6d28d9)', marginLeft: '1rem', flexShrink: 0 }}>
                    {currentQuestionIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Block'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className="btn-clay"
                    style={{ background: 'linear-gradient(145deg, #8b5cf6, #6d28d9)', opacity: !selectedOption ? 0.5 : 1 }}
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          )}
          
          {quizQuestions.length === 0 && !isGeneratingQuiz && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '12px' }}>
              <BrainCircuit size={48} color="#8b5cf6" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Ready to test your grammar?</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                The AI will adapt to your skill level. Correct answers will increase the difficulty, while wrong answers will lower it.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
}
