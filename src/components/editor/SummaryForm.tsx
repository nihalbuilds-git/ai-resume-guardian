import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SummaryForm({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Professional Summary</h3>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">
          A brief overview of your experience and goals
        </Label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Results-driven software engineer with 5+ years of experience..."
          rows={5}
          className="text-sm resize-none"
        />
      </div>
    </div>
  );
}
