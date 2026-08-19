import React from 'react';
import { Lightbulb, Info, AlertTriangle } from 'lucide-react';
import { DYNAMIC_TIPS } from '@/lib/practice-data';

import { GuidancePackage } from '@/lib/types';

interface DynamicTipsProps {
  taskType: 'task1' | 'task2';
  currentSectionId: string;
  essayType?: string; // For task 2 (opinion, causes, etc)
  wordCount: number;
  timeRemaining?: number; // In seconds
  guidance?: GuidancePackage | null;
  isLoadingGuidance?: boolean;
}

export function DynamicTips({ taskType, currentSectionId, essayType, wordCount, timeRemaining, guidance, isLoadingGuidance }: DynamicTipsProps) {
  
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

      {/* AI Guidance Package */}
      {isLoadingGuidance && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', opacity: 0.5 }}>
          <div style={{ height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', width: '60%' }} className="animate-pulse"></div>
          <div style={{ height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '100%' }} className="animate-pulse"></div>
        </div>
      )}

      {guidance && !isLoadingGuidance && (
        <div className="animate-fade-in-up" style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'rgba(167, 139, 250, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #a78bfa' }}>
             <h4 style={{ color: '#a78bfa', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               <Info size={14} /> Tone & Purpose
             </h4>
             <p style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}><strong>Tone:</strong> {guidance.determinedTone}</p>
             <p style={{ fontSize: '0.9rem' }}><strong>Type:</strong> {guidance.letterPurpose}</p>
          </div>

          <div>
             <h4 style={{ color: 'var(--color-primary)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
               Phrase Bank
             </h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               {guidance.phraseBank.map((pb, i) => (
                 <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                   <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{pb.context}</div>
                   <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontStyle: 'italic' }}>"{pb.phrase}"</div>
                 </div>
               ))}
             </div>
          </div>

          <div>
             <h4 style={{ color: '#06b6d4', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
               Recommended Linkers
             </h4>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
               {guidance.recommendedLinkers.map((linker, i) => (
                 <div key={i} title={linker.usage} style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', padding: '0.3rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 500 }}>
                   {linker.word}
                 </div>
               ))}
             </div>
          </div>

        </div>
      )}
    </div>
  );
}
