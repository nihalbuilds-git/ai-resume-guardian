/**
 * Modern Template — Two-column layout with colored left sidebar.
 * Left: contact info, skills. Right: summary, experience, education, projects.
 */
import { ResumeData } from "@/types/resume";
import { hslToCSS, getColorHSL, getFontPair, getSpacing } from "./template-config";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface Props {
  data: ResumeData;
}

export function ModernPreview({ data }: Props) {
  const pi = data.personal_info;
  const accent = hslToCSS(getColorHSL(data.color_theme));
  const fonts = getFontPair(data.font_pair);
  const sp = getSpacing(data.spacing).scale;

  return (
    <div style={{ fontFamily: fonts.body, fontSize: 11 }} className="flex w-full h-full">
      {/* Left Sidebar */}
      <div
        className="w-[32%] shrink-0 text-white p-5"
        style={{ backgroundColor: accent, paddingTop: 28 * sp, paddingBottom: 16 * sp }}
      >
        <h1 style={{ fontFamily: fonts.display, fontSize: 18, marginBottom: 4 * sp }} className="font-bold leading-tight">
          {pi.fullName || "Your Name"}
        </h1>

        {/* Contact */}
        <div className="mt-4 space-y-1.5 text-[10px] opacity-90">
          {pi.email && <div className="flex items-center gap-1.5"><Mail className="h-3 w-3 shrink-0" />{pi.email}</div>}
          {pi.phone && <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 shrink-0" />{pi.phone}</div>}
          {pi.location && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 shrink-0" />{pi.location}</div>}
          {pi.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="h-3 w-3 shrink-0" />{pi.linkedin}</div>}
          {pi.website && <div className="flex items-center gap-1.5"><Globe className="h-3 w-3 shrink-0" />{pi.website}</div>}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginTop: 20 * sp }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-white/30 pb-1">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((s, i) => (
                <span key={i} className="text-[9px] bg-white/20 rounded px-1.5 py-0.5">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div style={{ marginTop: 20 * sp }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-white/30 pb-1">Certifications</h2>
            {data.certifications.map((c) => (
              <div key={c.id} className="text-[9px] mb-1">
                <div className="font-semibold">{c.name}</div>
                {c.issuer && <div className="opacity-75">{c.issuer}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-5" style={{ paddingTop: 28 * sp }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 16 * sp }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 3 }}>
              Summary
            </h2>
            <p className="text-[10px] text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 16 * sp }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 3 }}>
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 10 * sp }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] font-semibold">{exp.position}</span>
                  <span className="text-[9px] text-gray-500">{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
                </div>
                {exp.company && <div className="text-[10px] text-gray-500">{exp.company}</div>}
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} className="text-[10px] text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 16 * sp }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 3 }}>
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 6 * sp }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold">{edu.degree}{edu.field && ` in ${edu.field}`}</span>
                  <span className="text-[9px] text-gray-500">{edu.startDate}{edu.startDate && " – "}{edu.endDate}</span>
                </div>
                {edu.school && <div className="text-[10px] text-gray-500">{edu.school}</div>}
                {edu.gpa && <div className="text-[9px] text-gray-500">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 16 * sp }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 3 }}>
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: 6 * sp }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold">{proj.name}</span>
                  {proj.technologies && <span className="text-[9px] text-gray-500">{proj.technologies}</span>}
                </div>
                {proj.description && <p className="text-[9px] text-gray-600 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
