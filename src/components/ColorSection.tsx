import { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { createPortal } from 'react-dom'
import { useColorStore } from '../store/color'

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  const [showPicker, setShowPicker] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        pickerRef.current && !pickerRef.current.contains(target)
      ) {
        setShowPicker(false)
      }
    }

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPicker])

  const getPickerPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 }

    const rect = buttonRef.current.getBoundingClientRect()
    const pickerWidth = 280

    let left = rect.right + 10
    const top = rect.top

    if (left + pickerWidth > window.innerWidth) {
      left = rect.left - pickerWidth - 10
    }

    if (left < 0) {
      left = (window.innerWidth - pickerWidth) / 2
    }

    return { top, left }
  }

  const pickerContent = showPicker && (
    <div
      ref={pickerRef}
      className="fixed z-50 p-4 bg-[#2c2c2e] rounded-2xl shadow-2xl"
      style={getPickerPosition()}
    >
      <HexColorPicker color={value} onChange={onChange} />
      <button
        onClick={() => setShowPicker(false)}
        className="mt-3 w-full px-3 py-2 text-[13px] font-medium text-[#007aff] bg-[#1c1c1e] rounded-xl hover:bg-[#2c2c2e] transition-all duration-200"
      >
        Done
      </button>
    </div>
  )

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#8e8e93] mb-3">
        {label}
      </label>

      <div className="flex items-center space-x-3">
        <button
          ref={buttonRef}
          onClick={() => setShowPicker(!showPicker)}
          className="w-12 h-12 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#007aff]/20 flex-shrink-0"
          style={{ backgroundColor: value }}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-12 px-4 bg-[#2c2c2e] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007aff]/50 font-mono text-[14px] text-white placeholder-[#8e8e93] transition-all duration-200 hover:bg-[#3a3a3c]"
          placeholder="#000000"
        />
      </div>

      {typeof window !== 'undefined' && createPortal(pickerContent, document.body)}
    </div>
  )
}

function ColorSection() {
  const { textColor, bgColor, setTextColor, setBgColor } = useColorStore()

  return (
    <div className="bg-[#1c1c1e] rounded-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[15px] sm:text-[17px] font-semibold text-white">Color Picker</h1>
        <p className="text-[11px] sm:text-[13px] text-[#8e8e93] mt-1">Configure text and background colors</p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <ColorInput label="Text Color" value={textColor} onChange={setTextColor} />
        <ColorInput label="Background Color" value={bgColor} onChange={setBgColor} />
      </div>
    </div>
  )
}

export default ColorSection
