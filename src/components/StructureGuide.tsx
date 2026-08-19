import React from 'react';
import { Check } from 'lucide-react';

interface GuideStep {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface StructureGuideProps {
  steps: GuideStep[];
  currentSectionId: string;
  completedSections: string[];
  title: string;
}

export function StructureGuide({ steps, currentSectionId, completedSections, title }: StructureGuideProps) {
  return (
    <div className="glass-panel" style={{ height: '100%', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
        {title}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {steps.map((step, index) => {
          const isCompleted = completedSections.includes(step.id);
          const isActive = currentSectionId === step.id;
          const isPending = !isCompleted && !isActive;
          
          return (
            <div key={step.id} style={{ display: 'flex', position: 'relative', paddingBottom: index === steps.length - 1 ? '0' : '1.5rem' }}>
              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute', left: '16px', top: '32px', bottom: '0', width: '2px',
                  background: isCompleted ? 'var(--color-success)' : 'var(--color-border)',
                  zIndex: 0
                }} />
              )}
              
              {/* Icon / Status Indicator */}
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                background: isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-primary)' : 'var(--color-bg)',
                border: `2px solid ${isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none',
                color: isCompleted || isActive ? 'white' : 'var(--color-text-muted)',
                transition: 'all 0.3s ease'
              }}>
                {isCompleted ? <Check size={16} /> : <span style={{ fontSize: '14px' }}>{step.icon}</span>}
              </div>
              
              {/* Content */}
              <div style={{ marginLeft: '1rem', flex: 1, opacity: isPending ? 0.6 : 1, transition: 'opacity 0.3s' }}>
                <h4 style={{ 
                  fontSize: '0.95rem', fontWeight: isActive ? 700 : 500, marginBottom: '0.25rem',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)'
                }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
