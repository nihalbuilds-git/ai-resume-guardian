import { PersonalInfo } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields = [
  { key: "fullName" as const, label: "Full Name", icon: User, placeholder: "John Doe" },
  { key: "email" as const, label: "Email", icon: Mail, placeholder: "john@example.com" },
  { key: "phone" as const, label: "Phone", icon: Phone, placeholder: "+1 (555) 000-0000" },
  { key: "location" as const, label: "Location", icon: MapPin, placeholder: "San Francisco, CA" },
  { key: "linkedin" as const, label: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/johndoe" },
  { key: "website" as const, label: "Website", icon: Globe, placeholder: "johndoe.com" },
];

export function PersonalInfoForm({ data, onChange }: Props) {
  const update = (key: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Personal Information</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key} className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Icon className="h-3 w-3" /> {label}
            </Label>
            <Input
              id={key}
              value={data[key]}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
              className="h-9 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
