import React from 'react';
import { Lightbulb, Info, AlertTriangle } from 'lucide-react';
import { DYNAMIC_TIPS } from '@/lib/practice-data';

interface DynamicTipsProps {
  taskType: 'task1' | 'task2';
  currentSectionId: string;
  essayType?: string; // For task 2 (opinion, causes, etc)
  wordCount: number;
  timeRemaining?: number; // In seconds
}

export function DynamicTips({ taskType, currentSectionId, essayType, wordCount, timeRemaining }: DynamicTipsProps) {
  
  // Resolve which tips to show based on section
  let activeTips: string[] = [];
  
  if (taskType === 'task1') {
    if (currentSectionId === 'greeting') activeTips = DYNAMIC_TIPS.task1.greeting;
    else if (currentSectionId === 'intro') activeTips = DYNAMIC_TIPS.task1.intro;
    else if (currentSectionId.startsWith('body')) activeTips = DYNAMIC_TIPS.task1.body;
    else if (currentSectionId === 'closing') activeTips = DYNAMIC_TIPS.task1.closing;
    else if (currentSectionId === 'signoff') activeTips = DYNAMIC_TIPS.task1.signoff;
  } else if (taskType === 'task2') {
    if (currentSectionId === 'intro') activeTips = DYNAMIC_TIPS.task2.intro;
    else if (currentSectionId.startsWith('body')) activeTips = DYNAMIC_TIPS.task2.body;
    else if (currentSectionId === 'conclusion') activeTips = DYNAMIC_TIPS.task2.conclusion;
  }

  // Emergency Time Warning
  const isEmergencyTime = timeRemaining !== undefined && timeRemaining > 0 && timeRemaining <= 300; // 5 mins left
  const showEmergencyWarning = taskType === 'task2' && isEmergencyTime && currentSectionId !== 'conclusion';

  return (
    <div className="glass-panel" style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Lightbulb size={18} color="var(--color-warning)" />
        Dynamic Tips
      </h3>
      
      {showEmergencyWarning && (
        <div className="animate-fade-in-up" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            <AlertTriangle size={16} /> 5 Minutes Left!
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
            If you haven't finished your body paragraphs, <strong>STOP</strong> and write your conclusion now. An essay without a conclusion is capped at Band 5!
          </p>
        </div>
      )}

      {/* Word Count Hint */}
      {(taskType === 'task1' && wordCount > 0 && wordCount < 150) && (
        <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-warning)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>
            Aim for at least 150 words. You are currently at {wordCount}.
          </p>
        </div>
      )}
      {(taskType === 'task2' && wordCount > 0 && wordCount < 250) && (
        <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-warning)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>
            Aim for at least 250 words. You are currently at {wordCount}.
          </p>
        </div>
      )}

      {/* Section Tips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          Current Focus
        </div>
        {activeTips.map((tip, idx) => (
          <div key={idx} className="animate-fade-in" style={{ 
            background: 'rgba(59, 130, 246, 0.08)', padding: '1rem', 
            borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem',
            borderLeft: '3px solid var(--color-primary)'
          }}>
            <Info size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.9rem', lineHeight: 1.4, color: 'var(--color-text)' }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
