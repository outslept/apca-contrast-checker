interface ComparisonSectionProps {
  apcaScore: number
  wcagScore: number
  className?: string
}

interface LevelResult {
  level: string
  color: string
}

function getWCAGLevel(ratio: number): LevelResult {
  if (ratio >= 7) return { level: 'AAA', color: '#34c759' }
  if (ratio >= 4.5) return { level: 'AA', color: '#007aff' }
  if (ratio >= 3) return { level: 'AA Large', color: '#ff9f0a' }
  return { level: 'Fail', color: '#ff3b30' }
}

function getAPCALevel(score: number): LevelResult {
  const absScore = Math.abs(score)
  if (absScore >= 90) return { level: 'Excellent', color: '#34c759' }
  if (absScore >= 75) return { level: 'Very Good', color: '#007aff' }
  if (absScore >= 60) return { level: 'Good', color: '#ff9f0a' }
  if (absScore >= 45) return { level: 'Fair', color: '#ff9500' }
  if (absScore >= 30) return { level: 'Poor', color: '#ff3b30' }
  return { level: 'Critical', color: '#ff3b30' }
}

function getComparisonNote(apcaScore: number, wcagScore: number): string {
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

function ComparisonSection({ apcaScore, wcagScore, className = '' }: ComparisonSectionProps) {
  const wcagLevel = getWCAGLevel(wcagScore)
  const apcaLevel = getAPCALevel(apcaScore)

  return (
    <div className={`bg-[#1c1c1e] rounded-3xl p-4 sm:p-6 h-full flex flex-col ${className}`}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-[14px] sm:text-[15px] font-semibold text-white tracking-[-0.02em]">Standards</h2>
        <p className="text-[10px] sm:text-[11px] text-[#8e8e93] mt-1">APCA vs WCAG 2.1</p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
        <div className="flex-1 p-3 sm:p-4 rounded-xl bg-[#2c2c2e] flex flex-col justify-center">
          <div className="text-center">
            <h3 className="text-[12px] sm:text-[13px] font-semibold text-white mb-1 sm:mb-2">APCA</h3>
            <div className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
              <span className="text-[#8e8e93] text-xs sm:text-sm">Lc</span>
              <span className="ml-1">
                {apcaScore > 0 ? '+' : ''}{apcaScore.toFixed(1)}
              </span>
            </div>
            <div
              className="inline-flex items-center px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-semibold"
              style={{
                backgroundColor: `${apcaLevel.color}20`,
                color: apcaLevel.color
              }}
            >
              {apcaLevel.level}
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 sm:p-4 rounded-xl bg-[#2c2c2e] flex flex-col justify-center">
          <div className="text-center">
            <h3 className="text-[12px] sm:text-[13px] font-semibold text-white mb-1 sm:mb-2">WCAG 2.1</h3>
            <div className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
              {wcagScore.toFixed(2)}<span className="text-[#8e8e93] text-xs sm:text-sm">:1</span>
            </div>
            <div
              className="inline-flex items-center px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-semibold"
              style={{
                backgroundColor: `${wcagLevel.color}20`,
                color: wcagLevel.color
              }}
            >
              {wcagLevel.level}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[#2c2c2e]/50">
        <p className="text-[9px] sm:text-[10px] text-[#8e8e93] leading-relaxed">
          {getComparisonNote(apcaScore, wcagScore)}
        </p>
      </div>
    </div>
  )
}

export default ComparisonSection
