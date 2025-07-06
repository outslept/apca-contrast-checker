// @ts-expect-error - no declaration file
import { colorParsley } from 'colorparsley';
// @ts-expect-error - no declaration file
import { calcAPCA } from 'apca-w3/src/apca-w3.js';

export function calculateWCAGContrast(textColor: string, bgColor: string): number {
  const textRGB = colorParsley(textColor)
  const bgRGB = colorParsley(bgColor)

  const getLuminance = (rgb: number[]) => {
    const [r, g, b] = rgb.map(c => {
      const normalized = c / 255
      return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const textLum = getLuminance(textRGB)
  const bgLum = getLuminance(bgRGB)
  const lighter = Math.max(textLum, bgLum)
  const darker = Math.min(textLum, bgLum)

  return (lighter + 0.05) / (darker + 0.05)
}

export function calculateAPCAContrast(textColor: string, bgColor: string): number {
  return calcAPCA(textColor, bgColor)
}
