/**
 * Minimal Template — Ultra-clean, generous whitespace, subtle lines.
 * Perfect for tech roles.
 */
import { ResumeData } from "@/types/resume";
import { getFontPair, getSpacing } from "./template-config";

interface Props { data: ResumeData; }

export function MinimalPreview({ data }: Props) {
  const pi = data.personal_info;
  const fonts = getFontPair(data.font_pair);
  const sp = getSpacing(data.spacing).scale;

  return (
    <div style={{ fontFamily: fonts.body, fontSize: 11, padding: `${32 * sp}px ${40 * sp}px` }} className="w-full h-full">
      {/* Header — left-aligned, minimal */}
      <div style={{ marginBottom: 20 * sp }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 24, letterSpacing: -0.5 }} className="font-light text-gray-900">
          {pi.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-3 mt-1.5 text-[10px] text-gray-400">
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.linkedin && <span>{pi.linkedin}</span>}
          {pi.website && <span>{pi.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div style={{ marginBottom: 18 * sp }}>
          <p className="text-[10px] text-gray-500 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: 18 * sp }}>
          <h2 className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">Experience</h2>
          <div className="border-t border-gray-200" />
          {data.experience.map((exp) => (
            <div key={exp.id} className="py-2 border-b border-gray-100" style={{ paddingTop: 8 * sp, paddingBottom: 8 * sp }}>
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-medium text-gray-900">{exp.position}</span>
                <span className="text-[9px] text-gray-400">{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</span>
              </div>
              {exp.company && <div className="text-[10px] text-gray-400">{exp.company}</div>}
              <ul className="mt-1 space-y-0.5">
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[10px] text-gray-600 pl-2 relative before:content-['–'] before:absolute before:left-0 before:text-gray-300">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div style={{ marginBottom: 18 * sp }}>
          <h2 className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">Education</h2>
          <div className="border-t border-gray-200" />
          {data.education.map((edu) => (
            <div key={edu.id} className="py-1.5 border-b border-gray-100">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}{edu.school && ` — ${edu.school}`}</span>
                <span className="text-[9px] text-gray-400">{edu.startDate}{edu.startDate && " – "}{edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div style={{ marginBottom: 18 * sp }}>
          <h2 className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">Skills</h2>
          <div className="border-t border-gray-200 mb-2" />
          <p className="text-[10px] text-gray-600">{data.skills.join("  ·  ")}</p>
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: 18 * sp }}>
          <h2 className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">Projects</h2>
          <div className="border-t border-gray-200" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="py-1.5 border-b border-gray-100">
              <span className="text-[10px] font-medium text-gray-900">{proj.name}</span>
              {proj.technologies && <span className="text-[9px] text-gray-400 ml-2">{proj.technologies}</span>}
              {proj.description && <p className="text-[9px] text-gray-500 mt-0.5">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
