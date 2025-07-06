export interface LevelResult {
  level: string
  color: string
}

export function getWCAGLevel(ratio: number): LevelResult {
  if (ratio >= 7) return { level: 'AAA', color: '#34c759' }
  if (ratio >= 4.5) return { level: 'AA', color: '#007aff' }
  if (ratio >= 3) return { level: 'AA Large', color: '#ff9f0a' }
  return { level: 'Fail', color: '#ff3b30' }
}

export function getAPCALevel(score: number): LevelResult {
  const absScore = Math.abs(score)
  if (absScore >= 90) return { level: 'Excellent', color: '#34c759' }
  if (absScore >= 75) return { level: 'Very Good', color: '#007aff' }
  if (absScore >= 60) return { level: 'Good', color: '#ff9f0a' }
  if (absScore >= 45) return { level: 'Fair', color: '#ff9500' }
  if (absScore >= 30) return { level: 'Poor', color: '#ff3b30' }
  return { level: 'Critical', color: '#ff3b30' }
}

export function getContrastDirection(score: number): string {
  return score > 0 ? 'Dark on light' : 'Light on dark'
}

export function getComparisonNote(apcaScore: number, wcagScore: number): string {
  const absApca = Math.abs(apcaScore)
  const wcagLevel = getWCAGLevel(wcagScore).level

  if (wcagLevel === 'Fail' && absApca < 45) {
    return 'Both standards recommend avoiding this combination'
  }
  if (wcagLevel !== 'Fail' && absApca >= 60) {
    return 'Both standards approve this combination'
  }
  if (wcagLevel === 'Fail' && absApca >= 60) {
    return 'APCA is more permissive than WCAG'
  }
  if (wcagLevel !== 'Fail' && absApca < 45) {
    return 'WCAG is more permissive than APCA'
  }
  return 'Mixed results between standards'
}
