/**
 * Shared configuration for resume templates:
 * color presets, font pairs, spacing options, and template metadata.
 */

export const COLOR_PRESETS = [
  { id: "blue", label: "Blue", hsl: "220 80% 50%" },
  { id: "green", label: "Green", hsl: "152 60% 40%" },
  { id: "red", label: "Red", hsl: "0 72% 50%" },
  { id: "purple", label: "Purple", hsl: "270 70% 50%" },
  { id: "orange", label: "Orange", hsl: "25 90% 52%" },
  { id: "teal", label: "Teal", hsl: "180 60% 38%" },
  { id: "gray", label: "Gray", hsl: "220 10% 40%" },
  { id: "black", label: "Black", hsl: "0 0% 10%" },
] as const;

export const FONT_PAIRS = [
  { id: "inter", display: "Inter", body: "Inter", label: "Inter / Inter" },
  { id: "playfair", display: "Playfair Display", body: "Inter", label: "Playfair / Inter" },
  { id: "roboto", display: "Roboto", body: "Roboto", label: "Roboto / Roboto" },
  { id: "georgia", display: "Georgia", body: "Arial", label: "Georgia / Arial" },
  { id: "montserrat", display: "Montserrat", body: "Open Sans", label: "Montserrat / Open Sans" },
] as const;

export const SPACING_OPTIONS = [
  { id: "compact", label: "Compact", scale: 0.75 },
  { id: "normal", label: "Normal", scale: 1 },
  { id: "spacious", label: "Spacious", scale: 1.3 },
] as const;

export const TEMPLATE_LIST = [
  { id: "modern", name: "Modern", description: "Two-column with colored sidebar" },
  { id: "classic", name: "Classic", description: "Traditional single-column" },
  { id: "minimal", name: "Minimal", description: "Ultra-clean for tech roles" },
  { id: "ats", name: "ATS-Safe", description: "Maximum ATS compatibility" },
] as const;

/** Convert HSL string like "220 80% 50%" to CSS hsl() */
export function hslToCSS(hsl: string) {
  return `hsl(${hsl})`;
}

/** Get color hex-ish from preset id */
export function getColorHSL(colorId: string): string {
  const found = COLOR_PRESETS.find((c) => c.id === colorId);
  return found ? found.hsl : COLOR_PRESETS[0].hsl;
}

export function getFontPair(fontId: string) {
  return FONT_PAIRS.find((f) => f.id === fontId) ?? FONT_PAIRS[0];
}

export function getSpacing(spacingId: string) {
  return SPACING_OPTIONS.find((s) => s.id === spacingId) ?? SPACING_OPTIONS[1];
}
