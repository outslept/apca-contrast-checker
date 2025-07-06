import { useState, useEffect } from 'react'
import { calculateAPCAContrast, calculateWCAGContrast } from './lib/contrast'
import { useColorStore } from './store/color'
import { ColorSection } from './components/color-section'
import { ResultsSection } from './components/results-section'
import { TextPreview } from './components/text-preview'
import { ComparisonSection } from './components/comparison-section'

function App() {
  const { textColor, bgColor } = useColorStore()
  const [contrastScore, setContrastScore] = useState(0)
  const [wcagScore, setWcagScore] = useState(0)

  useEffect(() => {
    const calculateScores = async () => {
      try {
        const [apcaScore, wcagRatio] = await Promise.all([
          calculateAPCAContrast(textColor, bgColor),
          calculateWCAGContrast(textColor, bgColor)
        ])

        setContrastScore(apcaScore)
        setWcagScore(wcagRatio)
      } catch (error) {
        console.error('Error calculating contrast:', error)
        setContrastScore(0)
        setWcagScore(0)
      }
    }

    calculateScores()
  }, [textColor, bgColor])

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="lg:hidden p-4 sm:p-6 space-y-4 sm:space-y-6">
        <ColorSection />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <ResultsSection contrastScore={contrastScore} />
          <ComparisonSection apcaScore={contrastScore} wcagScore={wcagScore} />
        </div>
        <TextPreview textColor={textColor} bgColor={bgColor} />
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:p-6 lg:h-full">
        <ColorSection />
        <ResultsSection contrastScore={contrastScore} />
        <ComparisonSection apcaScore={contrastScore} wcagScore={wcagScore} />
        <div className="col-span-3">
          <TextPreview textColor={textColor} bgColor={bgColor} className="h-full" />
        </div>
      </div>
    </div>
  )
}

export default App
