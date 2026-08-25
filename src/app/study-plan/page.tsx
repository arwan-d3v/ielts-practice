'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CheckCircle, Circle, Trophy, Flame, ChevronDown, ChevronUp, Clock, Target, PlusCircle, Sparkles } from 'lucide-react';
import { STUDY_PLAN, DayPlan } from '@/lib/study-plan-data';

export default function StudyPlan() {
  const router = useRouter();
  const [plans, setPlans] = useState<DayPlan[]>(STUDY_PLAN);
  const [completedTasks, setCompletedTasks] = useState<Record<string, string[]>>({});
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  
  // Progress Stats
  const [streak, setStreak] = useState(0);
  
  // AI Tip state
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ielts_study_plan_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedTasks(parsed.completedTasks || {});
        setStreak(parsed.streak || 0);
        
        // Auto-expand the first day that is not fully completed
        const firstIncompleteDay = STUDY_PLAN.find(day => {
          const completedForDay = parsed.completedTasks?.[day.day.toString()] || [];
          return completedForDay.length < day.tasks.length;
        });
        
        if (firstIncompleteDay) {
          setExpandedDay(firstIncompleteDay.day);
        }
      } catch (e) {
        console.error('Failed to parse study plan progress', e);
      }
    }
  }, []);

  const saveProgress = (newCompletedTasks: Record<string, string[]>) => {
    setCompletedTasks(newCompletedTasks);
    
    // Calculate basic streak (simplistic version for demo: based on total tasks done vs days)
    // A real app would check dates of completion
    const totalDone = Object.values(newCompletedTasks).reduce((acc, tasks) => acc + tasks.length, 0);
    const newStreak = Math.floor(totalDone / 4) + 1; // dummy streak calculation
    setStreak(newStreak);
    
    localStorage.setItem('ielts_study_plan_progress', JSON.stringify({
      completedTasks: newCompletedTasks,
      streak: newStreak,
      lastActiveDate: new Date().toISOString()
    }));
  };

  const toggleTask = (dayNum: number, taskId: string) => {
    const dayStr = dayNum.toString();
    const currentDayTasks = completedTasks[dayStr] || [];
    
    let newDayTasks;
    if (currentDayTasks.includes(taskId)) {
      newDayTasks = currentDayTasks.filter(id => id !== taskId);
    } else {
      newDayTasks = [...currentDayTasks, taskId];
    }
    
    const newCompletedTasks = {
      ...completedTasks,
      [dayStr]: newDayTasks
    };
    
    saveProgress(newCompletedTasks);
  };

  const extendDay = (day: DayPlan) => {
    if (window.confirm(`Would you like to duplicate Day ${day.day} for extra practice?`)) {
      // Find the index of the day to extend
      const index = plans.findIndex(p => p.day === day.day);
      if (index !== -1) {
        const newPlans = [...plans];
        
        // Shift all subsequent days' numbers up by 1
        for (let i = index + 1; i < newPlans.length; i++) {
          newPlans[i] = { ...newPlans[i], day: newPlans[i].day + 1 };
        }
        
        // Create the extended day
        const extendedDay: DayPlan = {
          ...day,
          day: day.day + 1,
          title: `${day.title} (Extended)`,
          titleId: `${day.titleId} (Diperpanjang)`,
          tasks: day.tasks.map(t => ({ ...t, id: `${t.id}_ext` }))
        };
        
        // Insert it
        newPlans.splice(index + 1, 0, extendedDay);
        setPlans(newPlans);
        
        alert('Day extended! The schedule has been adjusted.');
      }
    }
  };

  const handleTaskClick = (modulePath: string, e: React.MouseEvent) => {
    // Only navigate if they didn't click the checkbox
    if (!(e.target as HTMLElement).closest('.checkbox-btn')) {
      router.push(modulePath);
    }
  };

  const generateAITip = async () => {
    setIsGeneratingTip(true);
    // Simulate AI generation for the prototype
    setTimeout(() => {
      const tips = [
        "Focus on using 'However' and 'Furthermore' in your Task 2 practice today. It will boost your Coherence score.",
        "Your reading accuracy is improving. Try to skim the passages faster today before looking at the questions.",
        "Don't forget to review the Vocabulary Builder flashcards to solidify yesterday's words.",
        "When writing Task 1, ensure you spend the first 3 minutes analyzing the data trends before writing."
      ];
      setAiTip(tips[Math.floor(Math.random() * tips.length)]);
      setIsGeneratingTip(false);
    }, 1500);
  };

  // Calculate totals
  const totalTasks = plans.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedTotal = Object.values(completedTasks).reduce((acc, tasks) => acc + tasks.length, 0);
  const progressPercent = Math.round((completedTotal / totalTasks) * 100) || 0;

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
            <Calendar size={20} className="text-primary" /> 14-Day Intensive Plan
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Flame size={18} className="text-warning" />
            <span style={{ fontWeight: 'bold', color: 'var(--color-warning)' }}>{streak} Day Streak</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', width: '150px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Completion</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--color-success)', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>
        </div>
      </header>

      <div className="responsive-layout" style={{ padding: '2rem', gap: '2rem' }}>
        
        {/* Left Sidebar: Stats & AI */}
        <div className="sidebar-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(167, 139, 250, 0.1))', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#a78bfa' }}>
              <Target size={18} /> Estimated Progress
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Writing Band</span>
                  <span style={{ fontWeight: 'bold' }}>~6.5 ➔ 7.0</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                  <div style={{ width: '60%', height: '100%', background: '#3b82f6' }}></div>
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Reading Accuracy</span>
                  <span style={{ fontWeight: 'bold' }}>~70% ➔ 85%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                  <div style={{ width: '45%', height: '100%', background: '#10b981' }}></div>
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Vocab Size</span>
                  <span style={{ fontWeight: 'bold' }}>+120 words</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                  <div style={{ width: '80%', height: '100%', background: '#c084fc' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles size={18} className="text-primary" /> AI Daily Brief
            </h3>
            
            {aiTip ? (
              <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                "{aiTip}"
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                {isGeneratingTip ? (
                  <span>Analyzing your progress...</span>
                ) : (
                  <>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Get a personalized tip based on your current progress and weaknesses.</p>
                    <button 
                      className="btn-clay" 
                      onClick={generateAITip}
                      style={{ padding: '0.75rem 1rem', width: '100%', fontSize: '0.9rem' }}
                    >
                      Generate Advice
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          
        </div>

        {/* Right Area: Timeline */}
        <div className="main-panel" style={{ maxWidth: '800px' }}>
          <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
            {/* Vertical timeline line */}
            <div style={{ position: 'absolute', left: 0, top: '20px', bottom: '20px', width: '2px', background: 'var(--color-border)' }}></div>

            {plans.map((day) => {
              const dayTasksCompleted = completedTasks[day.day.toString()] || [];
              const isFullyCompleted = dayTasksCompleted.length === day.tasks.length;
              const isExpanded = expandedDay === day.day;
              
              return (
                <div key={day.day} style={{ position: 'relative', marginBottom: '1.5rem' }} className="animate-fade-in-up">
                  {/* Timeline dot */}
                  <div style={{ 
                    position: 'absolute', left: '-1.5rem', top: '16px', transform: 'translateX(-50%)',
                    width: '16px', height: '16px', borderRadius: '50%', zIndex: 2,
                    background: isFullyCompleted ? 'var(--color-success)' : 'var(--color-bg)',
                    border: `3px solid ${isFullyCompleted ? 'var(--color-success)' : 'var(--color-border)'}`
                  }}></div>

                  <div className="glass-panel" style={{ 
                    padding: 0, overflow: 'hidden',
                    border: isExpanded ? `1px solid ${day.color}80` : '1px solid var(--color-border)',
                    boxShadow: isExpanded ? `0 0 15px ${day.color}20` : 'none',
                    transition: 'all 0.3s'
                  }}>
                    {/* Day Header */}
                    <button 
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      style={{ 
                        width: '100%', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: '40px', height: '40px', borderRadius: '8px', background: `${day.color}20`, color: day.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold'
                        }}>
                          {day.day}
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {day.title} {isFullyCompleted && <Trophy size={16} className="text-warning" />}
                          </h2>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <span>{day.theme}</span>
                            <span>•</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {day.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isFullyCompleted ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                          {dayTasksCompleted.length} / {day.tasks.length} Done
                        </span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {/* Tasks List */}
                    {isExpanded && (
                      <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {day.tasks.map(task => {
                            const isTaskDone = dayTasksCompleted.includes(task.id);
                            
                            return (
                              <div 
                                key={task.id}
                                onClick={(e) => handleTaskClick(task.module, e)}
                                style={{ 
                                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                                  background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)',
                                  cursor: 'pointer', transition: 'background 0.2s',
                                  borderLeft: `3px solid ${
                                    task.type === 'learn' ? '#3b82f6' : 
                                    task.type === 'practice' ? '#10b981' : 
                                    task.type === 'mock' ? '#f59e0b' : '#8b5cf6'
                                  }`
                                }}
                                className="hover:bg-white/5"
                              >
                                <button 
                                  className="checkbox-btn"
                                  onClick={(e) => { e.stopPropagation(); toggleTask(day.day, task.id); }}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isTaskDone ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                                >
                                  {isTaskDone ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </button>
                                
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', textTransform: 'uppercase' }}>
                                      {task.type} • {task.time}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>→ {task.moduleLabel}</span>
                                  </div>
                                  <p style={{ fontSize: '0.95rem', fontWeight: 500, color: isTaskDone ? 'var(--color-text-muted)' : 'white', textDecoration: isTaskDone ? 'line-through' : 'none' }}>
                                    {task.activity}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                          <button 
                            onClick={() => extendDay(day)}
                            style={{ 
                              background: 'transparent', border: '1px dashed var(--color-border)', 
                              color: 'var(--color-text-muted)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
                              display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            className="hover:border-primary hover:text-primary"
                          >
                            <PlusCircle size={14} /> Need more time on this? Extend Day {day.day}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
