import { useState, useEffect } from 'react'
// @ts-expect-error - no declaration file
import { calcAPCA } from 'apca-w3/src/apca-w3.js'
// @ts-expect-error - no declaration file
import { colorParsley } from 'colorparsley'
import { useColorStore } from './store/color'
import ColorSection from './components/ColorSection'
import ResultsSection from './components/ResultsSection'
import TextPreview from './components/TextPreview'
import ComparisonSection from './components/ComparisonSection'

function App() {
  const { textColor, bgColor } = useColorStore()
  const [contrastScore, setContrastScore] = useState(0)
  const [wcagScore, setWcagScore] = useState(0)

  useEffect(() => {
    try {
      const score = calcAPCA(textColor, bgColor)
      setContrastScore(score)

      const textRGB = colorParsley(textColor)
      const bgRGB = colorParsley(bgColor)

      const getLuminance = (rgb: number[]) => {
        const [r, g, b] = rgb.map(c => {
          c = c / 255
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }

      const textLum = getLuminance(textRGB)
      const bgLum = getLuminance(bgRGB)
      const lighter = Math.max(textLum, bgLum)
      const darker = Math.min(textLum, bgLum)

      setWcagScore((lighter + 0.05) / (darker + 0.05))

    } catch (error) {
      console.error('Error calculating contrast:', error)
      setContrastScore(0)
      setWcagScore(0)
    }
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
