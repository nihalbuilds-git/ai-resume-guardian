/**
 * Classic Template — Single column, centered name, horizontal dividers.
 * Traditional, ATS-safe, professional look.
 */
import { ResumeData } from "@/types/resume";
import { hslToCSS, getColorHSL, getFontPair, getSpacing } from "./template-config";

interface Props { data: ResumeData; }

export function ClassicPreview({ data }: Props) {
  const pi = data.personal_info;
  const accent = hslToCSS(getColorHSL(data.color_theme));
  const fonts = getFontPair(data.font_pair);
  const sp = getSpacing(data.spacing).scale;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2
      className="text-[11px] font-bold uppercase tracking-widest pb-1 mb-2"
      style={{ color: accent, borderBottom: `2px solid ${accent}`, fontFamily: fonts.display }}
    >
      {children}
    </h2>
  );

  return (
    <div style={{ fontFamily: fonts.body, fontSize: 11, padding: `${28 * sp}px ${36 * sp}px` }} className="w-full h-full">
      {/* Header — centered */}
      <div className="text-center mb-3">
        <h1 style={{ fontFamily: fonts.display, fontSize: 22, color: accent }} className="font-bold">
          {pi.fullName || "Your Name"}
        </h1>
        <div className="flex items-center justify-center flex-wrap gap-2 mt-1 text-[10px] text-gray-600">
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <><span>•</span><span>{pi.phone}</span></>}
          {pi.location && <><span>•</span><span>{pi.location}</span></>}
          {pi.linkedin && <><span>•</span><span>{pi.linkedin}</span></>}
          {pi.website && <><span>•</span><span>{pi.website}</span></>}
        </div>
      </div>

      <hr className="border-gray-300 mb-3" />

      {data.summary && (
        <div style={{ marginBottom: 14 * sp }}>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-[10px] text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: 14 * sp }}>
          <SectionTitle>Professional Experience</SectionTitle>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 10 * sp }}>
              <div className="flex justify-between">
                <div>
                  <span className="text-[11px] font-bold">{exp.position}</span>
                  {exp.company && <span className="text-[10px] text-gray-600"> | {exp.company}</span>}
                </div>
                <span className="text-[9px] text-gray-500 shrink-0">{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
              </div>
              <ul className="mt-1 space-y-0.5">
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[10px] text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div style={{ marginBottom: 14 * sp }}>
          <SectionTitle>Education</SectionTitle>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 6 * sp }} className="flex justify-between">
              <div>
                <span className="text-[10px] font-bold">{edu.degree}{edu.field && ` in ${edu.field}`}</span>
                {edu.school && <span className="text-[10px] text-gray-600"> — {edu.school}</span>}
                {edu.gpa && <span className="text-[9px] text-gray-500"> (GPA: {edu.gpa})</span>}
              </div>
              <span className="text-[9px] text-gray-500 shrink-0">{edu.startDate}{edu.startDate && " – "}{edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div style={{ marginBottom: 14 * sp }}>
          <SectionTitle>Skills</SectionTitle>
          <p className="text-[10px] text-gray-700">{data.skills.join(" • ")}</p>
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: 14 * sp }}>
          <SectionTitle>Projects</SectionTitle>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 6 * sp }}>
              <span className="text-[10px] font-bold">{proj.name}</span>
              {proj.technologies && <span className="text-[9px] text-gray-500 ml-2">{proj.technologies}</span>}
              {proj.description && <p className="text-[9px] text-gray-600 mt-0.5">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div style={{ marginBottom: 14 * sp }}>
          <SectionTitle>Certifications</SectionTitle>
          {data.certifications.map((c) => (
            <div key={c.id} className="flex justify-between text-[10px]" style={{ marginBottom: 3 * sp }}>
              <span>{c.name}{c.issuer && ` — ${c.issuer}`}</span>
              {c.date && <span className="text-gray-500">{c.date}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
