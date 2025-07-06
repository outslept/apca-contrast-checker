import { useState } from "react"

interface TextPreviewProps {
  textColor: string
  bgColor: string
  className?: string
}

const sampleTexts = [
  { size: 'text-sm', weight: 'font-normal', label: '14px Regular', text: 'Small body text for captions, footnotes, and secondary information.' },
  { size: 'text-base', weight: 'font-normal', label: '16px Regular', text: 'Regular body text for main content and primary reading material.' },
  { size: 'text-lg', weight: 'font-medium', label: '18px Medium', text: 'Larger text for emphasis and important information.' },
  { size: 'text-xl', weight: 'font-semibold', label: '20px Semibold', text: 'Section headings and important information.' },
  { size: 'text-2xl', weight: 'font-bold', label: '24px Bold', text: 'Main headings and titles.' }
]

const defaultText = 'The quick brown fox jumps over the lazy dog. ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890'

function TextPreview({ textColor, bgColor, className = '' }: TextPreviewProps) {
  const [customText, setCustomText] = useState(defaultText)

  const resetText = () => setCustomText(defaultText)

  return (
    <div className={`bg-[#1c1c1e] rounded-3xl p-6 sm:p-8 ${className}`}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-[15px] sm:text-[17px] font-semibold text-white tracking-[-0.02em]">Live Preview</h2>
        <p className="text-[11px] sm:text-[13px] text-[#8e8e93] mt-1">Real-time text rendering with your color choices</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl space-y-6 sm:space-y-8" style={{ backgroundColor: bgColor }}>
        <div className="space-y-4 sm:space-y-5">
          {sampleTexts.map((sample, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-mono font-medium"
                  style={{ backgroundColor: textColor, color: bgColor, opacity: 0.9 }}
                >
                  {sample.label}
                </span>
              </div>
              <p
                className={`${sample.size} ${sample.weight} leading-relaxed`}
                style={{ color: textColor }}
              >
                {sample.text}
              </p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[11px] font-medium tracking-wider uppercase"
              style={{ color: textColor, opacity: 0.6 }}
            >
              Custom Text
            </span>
            <button
              onClick={resetText}
              className="text-[11px] font-medium px-3 py-1 rounded-lg hover:opacity-80 transition-opacity"
              style={{ color: textColor, backgroundColor: `${textColor}10` }}
            >
              Reset
            </button>
          </div>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-4 rounded-2xl resize-none focus:outline-none text-base leading-relaxed transition-all duration-200"
            style={{
              backgroundColor: `${textColor}05`,
              color: textColor,
              minHeight: '100px'
            }}
            placeholder="Type your own text to test readability and visual hierarchy..."
          />
        </div>
      </div>
    </div>
  )
}

export { TextPreview }
