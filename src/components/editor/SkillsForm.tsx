import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
}

export function SkillsForm({ items, onChange }: Props) {
  const [input, setInput] = useState("");

  const add = () => {
    const skill = input.trim();
    if (skill && !items.includes(skill)) {
      onChange([...items, skill]);
      setInput("");
    }
  };

  const remove = (skill: string) => {
    onChange(items.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Skills</h3>
      <div className="flex gap-2">
        <Input
          className="h-9 text-sm flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter..."
        />
        <Button size="sm" variant="outline" onClick={add} className="h-9">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <Badge key={skill} variant="secondary" className="gap-1 pr-1">
            {skill}
            <button onClick={() => remove(skill)} className="ml-1 rounded-full p-0.5 hover:bg-muted">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
