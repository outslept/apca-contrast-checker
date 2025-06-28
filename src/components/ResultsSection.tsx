interface ResultsSectionProps {
  contrastScore: number
}

interface ScoreStatus {
  level: string
  color: string
}

function getScoreStatus(score: number): ScoreStatus {
  const absScore = Math.abs(score)
  if (absScore >= 90) return { level: 'AAA+', color: '#34c759' }
  if (absScore >= 75) return { level: 'AAA', color: '#007aff' }
  if (absScore >= 60) return { level: 'AA+', color: '#ff9f0a' }
  if (absScore >= 45) return { level: 'AA', color: '#ff9500' }
  return { level: 'FAIL', color: '#ff3b30' }
}

function getContrastDirection(score: number): string {
  return score > 0 ? 'Dark on light' : 'Light on dark'
}

function ScoreVisualization({ score, color }: { score: number; color: string }) {
  const absScore = Math.abs(score)
  const maxScore = 106
  const percentage = Math.min((absScore / maxScore) * 100, 100)

  return (
    <div className="relative w-full h-2 bg-[#2c2c2e] rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}40`
        }}
      />
    </div>
  )
}

function ResultsSection({ contrastScore }: ResultsSectionProps) {
  const { level, color } = getScoreStatus(contrastScore)

  return (
    <div className="bg-[#1c1c1e] rounded-3xl p-4 sm:p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-[14px] sm:text-[15px] font-semibold text-white tracking-[-0.02em]">Contrast</h2>
          <p className="text-[10px] sm:text-[11px] text-[#8e8e93] mt-1">APCA measurement</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-[9px] sm:text-[10px] text-[#8e8e93] font-medium tracking-wide uppercase">{level}</span>
        </div>
      </div>

      <div className="text-center mb-3 sm:mb-4 flex-1 flex flex-col justify-center">
        <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-[-0.02em]">
          <span className="text-[#8e8e93] text-xl sm:text-2xl">Lc</span>
          <span className="ml-1">
            {contrastScore > 0 ? '+' : ''}{contrastScore.toFixed(1)}
          </span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-[#636366] italic mb-2">{getContrastDirection(contrastScore)}</p>
      </div>

      <div className="mt-auto">
        <ScoreVisualization score={contrastScore} color={color} />
        <div className="flex justify-between mt-2 text-[8px] text-[#636366]">
          <span>0</span>
          <span>30</span>
          <span>60</span>
          <span>90</span>
          <span>106</span>
        </div>
      </div>
    </div>
  )
}

export default ResultsSection
