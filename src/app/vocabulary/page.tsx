'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, BookOpen, CheckCircle, Sparkles, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { VOCAB_TOPICS, VocabWord } from '@/lib/vocab-data';

export default function VocabularyBuilder() {
  const [activeTopic, setActiveTopic] = useState(VOCAB_TOPICS[0].id);
  const [masteredWords, setMasteredWords] = useState<string[]>([]);
  const [reviewWords, setReviewWords] = useState<string[]>([]);
  
  // Flashcard state
  const [flashcardMode, setFlashcardMode] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Daily AI state
  const [dailyAiItems, setDailyAiItems] = useState<any>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiGeneratedTopic, setAiGeneratedTopic] = useState<any>(null);

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('ielts_vocab_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMasteredWords(parsed.masteredWords || []);
        setReviewWords(parsed.reviewWords || []);
      } catch (e) {
        console.error('Failed to parse vocab progress', e);
      }
    }
    
    // Load daily AI from today
    const today = new Date().toISOString().split('T')[0];
    const savedDaily = localStorage.getItem(`ielts_daily_vocab_${today}`);
    if (savedDaily) {
      try {
        setDailyAiItems(JSON.parse(savedDaily));
      } catch (e) {}
    }
    
    // Load AI Generated Topic (Saved to DB)
    const savedAiGen = localStorage.getItem('ielts_vocab_generated');
    if (savedAiGen) {
      try {
        setAiGeneratedTopic(JSON.parse(savedAiGen));
      } catch(e) {}
    }
  }, []);

  // Save progress
  const saveProgress = (mastered: string[], review: string[]) => {
    setMasteredWords(mastered);
    setReviewWords(review);
    localStorage.setItem('ielts_vocab_progress', JSON.stringify({
      masteredWords: mastered,
      reviewWords: review,
      totalWordsLearned: mastered.length
    }));
  };

  const handleMarkWord = (wordId: string, status: 'mastered' | 'review') => {
    let newMastered = [...masteredWords.filter(id => id !== wordId)];
    let newReview = [...reviewWords.filter(id => id !== wordId)];

    if (status === 'mastered') {
      newMastered.push(wordId);
    } else {
      newReview.push(wordId);
    }
    saveProgress(newMastered, newReview);
    
    // If in flashcard mode, auto-advance
    if (flashcardMode) {
      handleNextCard();
    }
  };

  const generateDailyVocab = async (forceNew = false) => {
    setIsGeneratingAi(true);
    setAiError('');
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Get all current known string words (hardcoded + previously AI generated) to avoid repetition
      const allTopics = aiGeneratedTopic ? [...VOCAB_TOPICS, aiGeneratedTopic] : VOCAB_TOPICS;
      const allKnownWords = allTopics.flatMap(t => t.words);
      
      const historyStrings = allKnownWords
        .filter(w => masteredWords.includes(w.id) || reviewWords.includes(w.id) || w.id.startsWith('ai_word_'))
        .map(w => w.word);
      
      const res = await fetch('/api/daily-vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date: today,
          history: forceNew ? [] : historyStrings 
        })
      });
      
      if (!res.ok) throw new Error('Failed to generate daily vocab');
      
      const data = await res.json();
      setDailyAiItems(data);
      localStorage.setItem(`ielts_daily_vocab_${today}`, JSON.stringify(data));
      
      // Save newly generated words into the AI DB as Flashcards
      if (data.words && data.words.length > 0) {
        const newAiWords = data.words.map((w: any, idx: number) => ({
          id: `ai_word_${Date.now()}_${idx}`,
          word: w.word,
          definition: w.definition,
          definitionId: w.definitionId || '',
          partOfSpeech: w.partOfSpeech || 'noun',
          ieltsLevel: 'C1',
          topic: w.topic || 'Daily AI',
          exampleFormal: w.exampleFormal || '',
          exampleInformal: w.exampleInformal || '',
          collocations: [],
          synonyms: w.synonyms || [],
          antonyms: w.antonyms || [],
          phraseUsage: '',
          dailySentence: w.exampleInformal || w.exampleFormal || ''
        }));
        
        setAiGeneratedTopic((prev: any) => {
          const updated = prev 
            ? { ...prev, words: [...prev.words, ...newAiWords] }
            : { id: 'ai_generated', name: 'AI Generated', icon: '🤖', color: '#ec4899', words: newAiWords };
          
          localStorage.setItem('ielts_vocab_generated', JSON.stringify(updated));
          return updated;
        });
      }
      
    } catch (err: any) {
      setAiError(err.message || 'Error connecting to AI');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const allTopics = aiGeneratedTopic && aiGeneratedTopic.words.length > 0 ? [...VOCAB_TOPICS, aiGeneratedTopic] : VOCAB_TOPICS;
  const currentTopicData = allTopics.find(t => t.id === activeTopic);
  const wordsToDisplay = currentTopicData?.words || [];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < wordsToDisplay.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const totalWords = allTopics.reduce((acc, topic) => acc + topic.words.length, 0);
  const progressPercent = Math.round((masteredWords.length / totalWords) * 100) || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <header className="responsive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} />
            <span style={{ fontWeight: 500 }}>Home</span>
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} className="text-primary" /> Vocabulary Builder
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Progress</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{masteredWords.length} / {totalWords} words</span>
          </div>
          <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--color-primary)', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>
      </header>

      {/* Main Content: 3 Columns */}
      <div className="responsive-layout">
        
        {/* Left: Topics Sidebar */}
        <div className="sidebar-panel" style={{ borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '1rem', paddingLeft: '0.5rem' }}>Topics</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {allTopics.map(topic => {
              const isActive = activeTopic === topic.id;
              const topicMasteredCount = topic.words.filter((w: VocabWord) => masteredWords.includes(w.id)).length;
              
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopic(topic.id);
                    setFlashcardMode(false);
                    setCurrentCardIndex(0);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                    background: isActive ? `${topic.color}20` : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? `${topic.color}40` : 'transparent',
                    color: isActive ? 'white' : 'var(--color-text-muted)',
                    cursor: 'pointer', transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span>{topic.icon}</span>
                    <span style={{ fontWeight: isActive ? 600 : 500 }}>{topic.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: isActive ? topic.color : 'inherit' }}>
                    {topicMasteredCount}/{topic.words.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Content Area */}
        <div className="main-panel" style={{ padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: currentTopicData?.color }}>{currentTopicData?.icon}</span>
              {currentTopicData?.name}
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
              <button 
                onClick={() => setFlashcardMode(false)}
                style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-sm)', background: !flashcardMode ? 'var(--color-primary)' : 'transparent', color: !flashcardMode ? 'white' : 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Grid View
              </button>
              <button 
                onClick={() => { setFlashcardMode(true); setCurrentCardIndex(0); setIsFlipped(false); }}
                style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-sm)', background: flashcardMode ? 'var(--color-primary)' : 'transparent', color: flashcardMode ? 'white' : 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Flashcards
              </button>
            </div>
          </div>

          {!flashcardMode ? (
            /* Grid View */
            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {wordsToDisplay.map((word: VocabWord) => {
                const isMastered = masteredWords.includes(word.id);
                const isReview = reviewWords.includes(word.id);
                
                return (
                  <div key={word.id} className="glass-panel" style={{ 
                    padding: '1.25rem', 
                    borderTop: `3px solid ${isMastered ? 'var(--color-success)' : isReview ? 'var(--color-warning)' : currentTopicData?.color}`,
                    display: 'flex', flexDirection: 'column', gap: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{word.word}</h3>
                      <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', textTransform: 'uppercase' }}>{word.partOfSpeech}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{word.definition}</p>
                    
                    <div style={{ flex: 1 }}></div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button 
                        onClick={() => handleMarkWord(word.id, 'mastered')}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: isMastered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', color: isMastered ? 'var(--color-success)' : 'white', border: `1px solid ${isMastered ? 'var(--color-success)' : 'transparent'}`, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                      >
                        <CheckCircle size={14} /> Got It
                      </button>
                      <button 
                        onClick={() => handleMarkWord(word.id, 'review')}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: isReview ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)', color: isReview ? 'var(--color-warning)' : 'white', border: `1px solid ${isReview ? 'var(--color-warning)' : 'transparent'}`, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                      >
                        <AlertCircle size={14} /> Review
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Flashcard View */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              {wordsToDisplay.length > 0 ? (
                <>
                  <div style={{ marginBottom: '2rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Card {currentCardIndex + 1} of {wordsToDisplay.length}
                  </div>
                  
                  <div 
                    className="glass-panel"
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{ 
                      width: '100%', maxWidth: '500px', height: '350px', cursor: 'pointer', 
                      perspective: '1000px', padding: 0, position: 'relative',
                      background: 'transparent', border: 'none'
                    }}
                  >
                    <div style={{ 
                      width: '100%', height: '100%', position: 'absolute', transformStyle: 'preserve-3d', transition: 'transform 0.6s',
                      transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'
                    }}>
                      
                      {/* Front */}
                      <div className="glass-panel" style={{ 
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        borderTop: `4px solid ${currentTopicData?.color}`
                      }}>
                        <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', textTransform: 'uppercase' }}>
                          {wordsToDisplay[currentCardIndex].partOfSpeech}
                        </span>
                        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                          {wordsToDisplay[currentCardIndex].word}
                        </h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Click to reveal definition</span>
                      </div>
                      
                      {/* Back */}
                      <div className="glass-panel" style={{ 
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                        transform: 'rotateX(180deg)', display: 'flex', flexDirection: 'column', 
                        padding: '2rem', borderTop: `4px solid ${currentTopicData?.color}`
                      }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: currentTopicData?.color }}>
                          {wordsToDisplay[currentCardIndex].word}
                        </h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{wordsToDisplay[currentCardIndex].definition}</p>
                        
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Formal Example</div>
                          <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>"{wordsToDisplay[currentCardIndex].exampleFormal}"</p>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                          {wordsToDisplay[currentCardIndex].synonyms && wordsToDisplay[currentCardIndex].synonyms.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Synonyms:</span>
                              {wordsToDisplay[currentCardIndex].synonyms.map((syn: string) => (
                                <span key={syn} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{syn}</span>
                              ))}
                            </div>
                          )}
                          {wordsToDisplay[currentCardIndex].antonyms && wordsToDisplay[currentCardIndex].antonyms.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Antonyms:</span>
                              {wordsToDisplay[currentCardIndex].antonyms.map((ant: string) => (
                                <span key={ant} style={{ fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{ant}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', width: '100%', maxWidth: '500px' }}>
                    <button 
                      onClick={() => handleMarkWord(wordsToDisplay[currentCardIndex].id, 'review')}
                      style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', border: '1px solid rgba(245, 158, 11, 0.3)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      <AlertCircle size={18} /> Need Review
                    </button>
                    <button 
                      onClick={() => handleMarkWord(wordsToDisplay[currentCardIndex].id, 'mastered')}
                      style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', border: '1px solid rgba(16, 185, 129, 0.3)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      <CheckCircle size={18} /> Got It
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
                    <button onClick={handlePrevCard} disabled={currentCardIndex === 0} style={{ background: 'transparent', border: 'none', color: currentCardIndex === 0 ? 'rgba(255,255,255,0.2)' : 'white', cursor: currentCardIndex === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ChevronLeft size={20} /> Prev
                    </button>
                    <button onClick={handleNextCard} disabled={currentCardIndex === wordsToDisplay.length - 1} style={{ background: 'transparent', border: 'none', color: currentCardIndex === wordsToDisplay.length - 1 ? 'rgba(255,255,255,0.2)' : 'white', cursor: currentCardIndex === wordsToDisplay.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Next <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--color-text-muted)' }}>No words found in this category.</div>
              )}
            </div>
          )}
        </div>

        {/* Right: Daily AI Words */}
        <div className="right-panel" style={{ borderLeft: '1px solid var(--color-border)', padding: '1.5rem', overflowY: 'auto', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa' }}>
              <Sparkles size={18} /> Daily AI Drill
            </h2>
            <button 
              onClick={() => generateDailyVocab(true)} 
              disabled={isGeneratingAi}
              title="Surprise me with new words"
              style={{ background: 'rgba(167, 139, 250, 0.1)', border: 'none', color: '#a78bfa', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <RefreshCw size={14} className={isGeneratingAi ? 'animate-spin' : ''} />
            </button>
          </div>

          {!dailyAiItems && !isGeneratingAi && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(167, 139, 250, 0.05)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(167, 139, 250, 0.3)' }}>
              <Sparkles size={32} color="#a78bfa" style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Get 10 unique words, phrases, and model sentences tailored for Band 7+ every day.</p>
              <button 
                className="btn-clay" 
                onClick={() => generateDailyVocab(false)}
                style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', border: 'none', width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
              >
                Generate Today's List
              </button>
            </div>
          )}

          {isGeneratingAi && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', gap: '1rem', color: 'var(--color-text-muted)' }}>
              <RefreshCw size={24} className="animate-spin" color="#a78bfa" />
              <span style={{ fontSize: '0.85rem' }}>Generating your daily drill...</span>
            </div>
          )}

          {aiError && (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              {aiError}
            </div>
          )}

          {dailyAiItems && !isGeneratingAi && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in-up">
              
              {/* AI Words */}
              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>4 New Words</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {dailyAiItems.words?.map((w: any, i: number) => (
                    <div key={i} style={{ background: 'rgba(167, 139, 250, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #a78bfa' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#e2e8f0' }}>{w.word}</span>
                        <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{w.partOfSpeech}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{w.definition}</p>
                      <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#cbd5e1' }}>"{w.exampleFormal}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Phrases */}
              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>3 Useful Phrases</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {dailyAiItems.phrases?.map((p: any, i: number) => (
                    <div key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #3b82f6' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#e2e8f0', display: 'block', marginBottom: '0.25rem' }}>"{p.phrase}"</span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{p.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Sentences */}
              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>3 Model Sentences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {dailyAiItems.sentences?.map((s: any, i: number) => (
                    <div key={i} style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #10b981' }}>
                      <span style={{ fontSize: '0.7rem', color: '#10b981', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{s.purpose}</span>
                      <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#e2e8f0' }}>"{s.sentence}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
