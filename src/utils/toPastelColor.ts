function hexToRgb(hex: string) {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
   return result
      ? {
           r: parseInt(result[1], 16),
           g: parseInt(result[2], 16),
           b: parseInt(result[3], 16),
        }
      : null
}

function rgbToHex(r: number, g: number, b: number) {
   return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

function lightenColor(r: number, g: number, b: number, factor = 0.1) {
   return {
      r: Math.round(r + (255 - r) * factor),
      g: Math.round(g + (255 - g) * factor),
      b: Math.round(b + (255 - b) * factor),
   }
}

function desaturateColor(r: number, g: number, b: number, factor = 0.4) {
   const gray = r * 0.3 + g * 0.59 + b * 0.11
   return {
      r: Math.round(r + (gray - r) * factor),
      g: Math.round(g + (gray - g) * factor),
      b: Math.round(b + (gray - b) * factor),
   }
}

function toPastel(color: string) {
   const skipColor = ["black", "blue"]
   if (skipColor.includes(color?.toLowerCase())) return color
   const colorMap: Record<string, string> = {
      black: "#000000",
      blue: "#0000FF",
      red: "#FF0000",
      green: "#00FF00",
      yellow: "#FFFF00",
      purple: "#800080",
      orange: "#FFA500",
      pink: "#FFC0CB",
      brown: "#A52A2A",
      gray: "#808080",
      white: "#FFFFFF",
   }

   const hex = colorMap[color?.toLowerCase()] || color
   const rgb = hexToRgb(hex)
   if (!rgb) return color

   const lightened = lightenColor(rgb.r, rgb.g, rgb.b)
   const pastel = desaturateColor(lightened.r, lightened.g, lightened.b)
   return rgbToHex(pastel.r, pastel.g, pastel.b)
}

export { toPastel }
