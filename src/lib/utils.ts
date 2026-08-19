export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

export function getScoreColor(score: number): string {
  if (score >= 7.0) return 'var(--color-success)';
  if (score >= 6.0) return 'var(--color-warning)';
  return 'var(--color-danger)';
}
