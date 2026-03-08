import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface Props {
  data: ResumeData;
  zoom: number;
}

export function ResumePreview({ data, zoom }: Props) {
  const pi = data.personal_info;

  return (
    <div className="flex items-start justify-center p-4 bg-muted/50 min-h-full overflow-auto">
      <div
        className="bg-card shadow-lg origin-top"
        style={{
          width: "210mm",
          minHeight: "297mm",
          transform: `scale(${zoom})`,
          padding: "24px 32px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Header / Personal Info */}
        <div className="text-center mb-4 pb-3 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">{pi.fullName || "Your Name"}</h1>
          <div className="flex items-center justify-center flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
            {pi.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{pi.email}</span>}
            {pi.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{pi.phone}</span>}
            {pi.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{pi.location}</span>}
            {pi.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{pi.linkedin}</span>}
            {pi.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{pi.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 border-b border-border pb-1">Summary</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 border-b border-border pb-1">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-foreground">{exp.position || "Position"}</span>
                    {exp.company && <span className="text-xs text-muted-foreground"> — {exp.company}</span>}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} className="text-xs text-muted-foreground pl-3 relative before:content-['•'] before:absolute before:left-0">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 border-b border-border pb-1">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-foreground">{edu.degree || "Degree"}</span>
                    {edu.field && <span className="text-xs text-foreground"> in {edu.field}</span>}
                    {edu.school && <span className="text-xs text-muted-foreground"> — {edu.school}</span>}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {edu.startDate}{edu.startDate && " – "}{edu.endDate}
                  </span>
                </div>
                {edu.gpa && <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 border-b border-border pb-1">Skills</h2>
            <p className="text-xs text-muted-foreground">{data.skills.join(" • ")}</p>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 border-b border-border pb-1">Projects</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-foreground">{proj.name || "Project"}</span>
                  {proj.technologies && <span className="text-xs text-muted-foreground">{proj.technologies}</span>}
                </div>
                {proj.description && <p className="text-xs text-muted-foreground mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 border-b border-border pb-1">Certifications</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-1 flex justify-between">
                <span className="text-xs text-foreground">{cert.name}{cert.issuer && ` — ${cert.issuer}`}</span>
                {cert.date && <span className="text-xs text-muted-foreground">{cert.date}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
