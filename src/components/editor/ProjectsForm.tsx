import { ProjectItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

const emptyItem = (): ProjectItem => ({
  id: crypto.randomUUID(),
  name: "",
  description: "",
  technologies: "",
  link: "",
});

export function ProjectsForm({ items, onChange }: Props) {
  const add = () => onChange([...items, emptyItem()]);
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof ProjectItem, value: string) => {
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Projects</h3>
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="mr-1 h-3 w-3" /> Add
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Project {index + 1}</span>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(item.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">Name</Label>
                <Input className="h-8 text-sm" value={item.name} onChange={(e) => update(item.id, "name", e.target.value)} placeholder="My Project" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Technologies</Label>
                <Input className="h-8 text-sm" value={item.technologies} onChange={(e) => update(item.id, "technologies", e.target.value)} placeholder="React, Node.js" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea className="text-sm resize-none" rows={2} value={item.description} onChange={(e) => update(item.id, "description", e.target.value)} placeholder="Describe what this project does..." />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Link</Label>
              <Input className="h-8 text-sm" value={item.link} onChange={(e) => update(item.id, "link", e.target.value)} placeholder="https://github.com/..." />
            </div>
          </CardContent>
        </Card>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No projects added yet.</p>
      )}
    </div>
  );
}
