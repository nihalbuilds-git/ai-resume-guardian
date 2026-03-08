import { EducationItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

const emptyItem = (): EducationItem => ({
  id: crypto.randomUUID(),
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
});

export function EducationForm({ items, onChange }: Props) {
  const add = () => onChange([...items, emptyItem()]);
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof EducationItem, value: string) => {
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Education</h3>
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="mr-1 h-3 w-3" /> Add
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Education {index + 1}</span>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(item.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">School</Label>
                <Input className="h-8 text-sm" value={item.school} onChange={(e) => update(item.id, "school", e.target.value)} placeholder="MIT" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Degree</Label>
                <Input className="h-8 text-sm" value={item.degree} onChange={(e) => update(item.id, "degree", e.target.value)} placeholder="Bachelor of Science" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Field</Label>
                <Input className="h-8 text-sm" value={item.field} onChange={(e) => update(item.id, "field", e.target.value)} placeholder="Computer Science" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">GPA</Label>
                <Input className="h-8 text-sm" value={item.gpa} onChange={(e) => update(item.id, "gpa", e.target.value)} placeholder="3.8" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Start Date</Label>
                <Input className="h-8 text-sm" value={item.startDate} onChange={(e) => update(item.id, "startDate", e.target.value)} placeholder="Sep 2018" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">End Date</Label>
                <Input className="h-8 text-sm" value={item.endDate} onChange={(e) => update(item.id, "endDate", e.target.value)} placeholder="Jun 2022" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No education added yet.</p>
      )}
    </div>
  );
}
