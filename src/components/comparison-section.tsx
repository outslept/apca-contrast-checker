import { getWCAGLevel, getAPCALevel, getComparisonNote } from '../lib/eval'

interface ComparisonSectionProps {
  apcaScore: number
  wcagScore: number
  className?: string
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

export { ComparisonSection };
