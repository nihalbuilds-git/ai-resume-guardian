/**
 * ExperienceForm — with AI bullet generation and individual bullet improvement.
 */
import { ExperienceItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { BulletGenerator } from "@/components/ai/BulletGenerator";
import { BulletImprover } from "@/components/ai/BulletImprover";

interface Props {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

function makeId() { return crypto.randomUUID(); }

const emptyItem: () => ExperienceItem = () => ({
  id: makeId(), company: "", position: "", startDate: "", endDate: "", current: false, bullets: [""],
});

export function ExperienceForm({ items, onChange }: Props) {
  const add = () => onChange([...items, emptyItem()]);
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };
  const updateBullet = (id: string, idx: number, value: string) => {
    onChange(items.map((i) => i.id === id ? { ...i, bullets: i.bullets.map((b, j) => j === idx ? value : b) } : i));
  };
  const addBullet = (id: string, text = "") => {
    onChange(items.map((i) => i.id === id ? { ...i, bullets: [...i.bullets, text] } : i));
  };
  const removeBullet = (id: string, idx: number) => {
    onChange(items.map((i) => i.id === id ? { ...i, bullets: i.bullets.filter((_, j) => j !== idx) } : i));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Experience</h3>
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="mr-1 h-3 w-3" /> Add
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Position {index + 1}</span>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(item.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">Company</Label>
                <Input className="h-8 text-sm" value={item.company} onChange={(e) => update(item.id, "company", e.target.value)} placeholder="Google" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Position</Label>
                <Input className="h-8 text-sm" value={item.position} onChange={(e) => update(item.id, "position", e.target.value)} placeholder="Software Engineer" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Start Date</Label>
                <Input className="h-8 text-sm" value={item.startDate} onChange={(e) => update(item.id, "startDate", e.target.value)} placeholder="Jan 2022" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">End Date</Label>
                <Input className="h-8 text-sm" value={item.endDate} onChange={(e) => update(item.id, "endDate", e.target.value)} placeholder="Present" disabled={item.current} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={item.current} onCheckedChange={(c) => update(item.id, "current", !!c)} />
              <Label className="text-xs text-muted-foreground">Currently working here</Label>
            </div>

            {/* Bullet Points with AI */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Bullet Points</Label>
                <BulletGenerator
                  jobTitle={item.position}
                  company={item.company}
                  onAddBullet={(b) => addBullet(item.id, b)}
                />
              </div>
              {item.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-muted-foreground text-xs">•</span>
                  <Input
                    className="h-8 text-sm flex-1"
                    value={bullet}
                    onChange={(e) => updateBullet(item.id, idx, e.target.value)}
                    placeholder="Describe your achievement..."
                  />
                  {/* AI improve button for non-empty bullets */}
                  {bullet.trim() && (
                    <BulletImprover
                      bullet={bullet}
                      jobTitle={item.position}
                      onAccept={(improved) => updateBullet(item.id, idx, improved)}
                    />
                  )}
                  {item.bullets.length > 1 && (
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => removeBullet(item.id, idx)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => addBullet(item.id)}>
                <Plus className="mr-1 h-3 w-3" /> Add bullet
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No experience added yet. Click "Add" to get started.</p>
      )}
    </div>
  );
}
