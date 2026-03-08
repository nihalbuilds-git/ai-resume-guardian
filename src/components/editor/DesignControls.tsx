/**
 * Design controls panel: template switcher, color picker, font selector, spacing.
 * Shown as a tab in the editor.
 */
import { ResumeData } from "@/types/resume";
import { TEMPLATE_LIST, COLOR_PRESETS, FONT_PAIRS, SPACING_OPTIONS, hslToCSS } from "./templates/template-config";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface Props {
  data: ResumeData;
  onUpdate: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
}

export function DesignControls({ data, onUpdate }: Props) {
  return (
    <div className="space-y-6">
      {/* Template Switcher */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Template</Label>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATE_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => onUpdate("template", t.id)}
              className={cn(
                "border rounded-lg p-3 text-left transition-all text-xs",
                data.template === t.id
                  ? "border-primary bg-accent ring-1 ring-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-muted-foreground mt-0.5">{t.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Picker */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Accent Color</Label>
        <div className="flex gap-2 flex-wrap">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c.id}
              onClick={() => onUpdate("color_theme", c.id)}
              className={cn(
                "w-8 h-8 rounded-full transition-all border-2",
                data.color_theme === c.id ? "border-foreground scale-110 ring-2 ring-primary/30" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: hslToCSS(c.hsl) }}
              title={c.label}
            />
          ))}
        </div>
      </div>

      {/* Font Selector */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Font Pair</Label>
        <RadioGroup value={data.font_pair} onValueChange={(v) => onUpdate("font_pair", v)}>
          {FONT_PAIRS.map((f) => (
            <div key={f.id} className="flex items-center space-x-2">
              <RadioGroupItem value={f.id} id={`font-${f.id}`} />
              <Label htmlFor={`font-${f.id}`} className="text-xs cursor-pointer" style={{ fontFamily: f.display }}>
                {f.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Spacing */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Spacing</Label>
        <div className="flex gap-2">
          {SPACING_OPTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onUpdate("spacing", s.id)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs border transition-all",
                data.spacing === s.id
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
