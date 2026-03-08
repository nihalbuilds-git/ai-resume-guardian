/**
 * ATS Template — Plain text style, zero columns, no colors/graphics.
 * Maximum ATS compatibility, keyword-dense.
 */
import { ResumeData } from "@/types/resume";
import { getFontPair, getSpacing } from "./template-config";

interface Props { data: ResumeData; }

export function ATSPreview({ data }: Props) {
  const pi = data.personal_info;
  const fonts = getFontPair(data.font_pair);
  const sp = getSpacing(data.spacing).scale;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, padding: `${24 * sp}px ${32 * sp}px` }} className="w-full h-full">
      {/* Header — plain text */}
      <div className="text-center mb-2">
        <h1 className="text-[16px] font-bold text-black uppercase">{pi.fullName || "YOUR NAME"}</h1>
        <div className="text-[10px] text-black mt-0.5">
          {[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).join(" | ")}
        </div>
      </div>

      <hr className="border-black mb-2" />

      {data.summary && (
        <div style={{ marginBottom: 12 * sp }}>
          <h2 className="text-[11px] font-bold text-black uppercase mb-1">PROFESSIONAL SUMMARY</h2>
          <p className="text-[10px] text-black leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: 12 * sp }}>
          <h2 className="text-[11px] font-bold text-black uppercase mb-1">WORK EXPERIENCE</h2>
          <hr className="border-black mb-1.5" />
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 8 * sp }}>
              <div className="text-[10px]">
                <span className="font-bold text-black">{exp.position}</span>
                {exp.company && <span className="text-black"> — {exp.company}</span>}
                <span className="float-right text-black">{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
              </div>
              <ul className="mt-0.5">
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[10px] text-black pl-3 relative before:content-['•'] before:absolute before:left-0">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div style={{ marginBottom: 12 * sp }}>
          <h2 className="text-[11px] font-bold text-black uppercase mb-1">EDUCATION</h2>
          <hr className="border-black mb-1.5" />
          {data.education.map((edu) => (
            <div key={edu.id} className="text-[10px] text-black" style={{ marginBottom: 4 * sp }}>
              <span className="font-bold">{edu.degree}{edu.field && ` in ${edu.field}`}</span>
              {edu.school && <span> — {edu.school}</span>}
              <span className="float-right">{edu.startDate}{edu.startDate && " – "}{edu.endDate}</span>
              {edu.gpa && <div>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div style={{ marginBottom: 12 * sp }}>
          <h2 className="text-[11px] font-bold text-black uppercase mb-1">SKILLS</h2>
          <hr className="border-black mb-1.5" />
          <p className="text-[10px] text-black">{data.skills.join(", ")}</p>
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: 12 * sp }}>
          <h2 className="text-[11px] font-bold text-black uppercase mb-1">PROJECTS</h2>
          <hr className="border-black mb-1.5" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="text-[10px] text-black" style={{ marginBottom: 4 * sp }}>
              <span className="font-bold">{proj.name}</span>
              {proj.technologies && <span> ({proj.technologies})</span>}
              {proj.description && <p className="mt-0.5">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div style={{ marginBottom: 12 * sp }}>
          <h2 className="text-[11px] font-bold text-black uppercase mb-1">CERTIFICATIONS</h2>
          <hr className="border-black mb-1.5" />
          {data.certifications.map((c) => (
            <div key={c.id} className="text-[10px] text-black" style={{ marginBottom: 2 * sp }}>
              {c.name}{c.issuer && ` — ${c.issuer}`}{c.date && ` (${c.date})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
