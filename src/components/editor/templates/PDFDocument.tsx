/**
 * PDF export using @react-pdf/renderer.
 * Routes to the correct PDF template based on template id.
 * Each template renders A4 (595 x 842 pt) with proper margins.
 */
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getColorHSL, getFontPair, getSpacing } from "./template-config";

/* ---- helpers ---- */
function hslToRgb(hslStr: string): string {
  // Parse "220 80% 50%" → h=220, s=80, l=50
  const parts = hslStr.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return "#333333";
  let h = parseFloat(parts[0]) / 360;
  let s = parseFloat(parts[1]) / 100;
  let l = parseFloat(parts[2]) / 100;
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/* ---- Styles ---- */
const base = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#ffffff", paddingHorizontal: 36, paddingVertical: 30, fontSize: 10 },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 2 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4, paddingBottom: 2, borderBottomWidth: 1 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, fontSize: 9, color: "#666666", marginBottom: 4 },
  bullet: { fontSize: 9, color: "#444444", paddingLeft: 10, marginBottom: 1 },
  jobTitle: { fontSize: 10, fontWeight: "bold" },
  jobMeta: { fontSize: 9, color: "#666666" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  text9: { fontSize: 9, color: "#444444" },
});

/* ---- Modern (two-col) ---- */
function ModernPDF({ data, accent }: { data: ResumeData; accent: string }) {
  const pi = data.personal_info;
  const sp = getSpacing(data.spacing).scale;
  return (
    <Page size="A4" style={{ flexDirection: "row", backgroundColor: "#ffffff", fontSize: 10 }}>
      {/* Sidebar */}
      <View style={{ width: "32%", backgroundColor: accent, padding: 18, paddingTop: 28 * sp, color: "#ffffff" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff", marginBottom: 8 }}>{pi.fullName || "Your Name"}</Text>
        {pi.email && <Text style={{ fontSize: 8, color: "#ffffffcc", marginBottom: 2 }}>{pi.email}</Text>}
        {pi.phone && <Text style={{ fontSize: 8, color: "#ffffffcc", marginBottom: 2 }}>{pi.phone}</Text>}
        {pi.location && <Text style={{ fontSize: 8, color: "#ffffffcc", marginBottom: 2 }}>{pi.location}</Text>}
        {pi.linkedin && <Text style={{ fontSize: 8, color: "#ffffffcc", marginBottom: 2 }}>{pi.linkedin}</Text>}
        {pi.website && <Text style={{ fontSize: 8, color: "#ffffffcc", marginBottom: 2 }}>{pi.website}</Text>}
        {data.skills.length > 0 && (
          <View style={{ marginTop: 16 * sp }}>
            <Text style={{ fontSize: 9, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.5, borderBottomWidth: 1, borderBottomColor: "#ffffff55", paddingBottom: 2, marginBottom: 4, color: "#ffffff" }}>Skills</Text>
            <Text style={{ fontSize: 8, color: "#ffffffcc", lineHeight: 1.5 }}>{data.skills.join("  •  ")}</Text>
          </View>
        )}
        {data.certifications.length > 0 && (
          <View style={{ marginTop: 14 * sp }}>
            <Text style={{ fontSize: 9, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.5, borderBottomWidth: 1, borderBottomColor: "#ffffff55", paddingBottom: 2, marginBottom: 4, color: "#ffffff" }}>Certifications</Text>
            {data.certifications.map((c) => (
              <Text key={c.id} style={{ fontSize: 8, color: "#ffffffcc", marginBottom: 2 }}>{c.name}{c.issuer && ` — ${c.issuer}`}</Text>
            ))}
          </View>
        )}
      </View>
      {/* Main */}
      <View style={{ flex: 1, padding: 20, paddingTop: 28 * sp }}>
        {data.summary && (
          <View style={{ marginBottom: 12 * sp }}>
            <Text style={{ ...base.sectionTitle, color: accent, borderBottomColor: accent }}>Summary</Text>
            <Text style={base.text9}>{data.summary}</Text>
          </View>
        )}
        {data.experience.length > 0 && (
          <View style={{ marginBottom: 12 * sp }}>
            <Text style={{ ...base.sectionTitle, color: accent, borderBottomColor: accent }}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 * sp }}>
                <View style={base.row}>
                  <Text style={base.jobTitle}>{exp.position}</Text>
                  <Text style={base.jobMeta}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</Text>
                </View>
                {exp.company && <Text style={base.jobMeta}>{exp.company}</Text>}
                {exp.bullets.filter(Boolean).map((b, i) => <Text key={i} style={base.bullet}>• {b}</Text>)}
              </View>
            ))}
          </View>
        )}
        {data.education.length > 0 && (
          <View style={{ marginBottom: 12 * sp }}>
            <Text style={{ ...base.sectionTitle, color: accent, borderBottomColor: accent }}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 4 * sp }}>
                <View style={base.row}>
                  <Text style={{ fontSize: 9, fontWeight: "bold" }}>{edu.degree}{edu.field && ` in ${edu.field}`}</Text>
                  <Text style={base.jobMeta}>{edu.startDate}{edu.startDate && " – "}{edu.endDate}</Text>
                </View>
                {edu.school && <Text style={base.jobMeta}>{edu.school}</Text>}
              </View>
            ))}
          </View>
        )}
        {data.projects.length > 0 && (
          <View style={{ marginBottom: 12 * sp }}>
            <Text style={{ ...base.sectionTitle, color: accent, borderBottomColor: accent }}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 4 * sp }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>{proj.name}{proj.technologies && ` (${proj.technologies})`}</Text>
                {proj.description && <Text style={base.text9}>{proj.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
}

/* ---- Classic (single col) ---- */
function ClassicPDF({ data, accent }: { data: ResumeData; accent: string }) {
  const pi = data.personal_info;
  const sp = getSpacing(data.spacing).scale;
  const st = { ...base.sectionTitle, color: accent, borderBottomColor: accent };
  return (
    <Page size="A4" style={base.page}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <Text style={{ ...base.name, color: accent }}>{pi.fullName || "Your Name"}</Text>
        <View style={base.contactRow}>
          <Text>{[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).join("  •  ")}</Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#cccccc", marginBottom: 8 }} />
      {data.summary && <View style={{ marginBottom: 12 * sp }}><Text style={st}>Professional Summary</Text><Text style={base.text9}>{data.summary}</Text></View>}
      {data.experience.length > 0 && (
        <View style={{ marginBottom: 12 * sp }}>
          <Text style={st}>Professional Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 8 * sp }}>
              <View style={base.row}><Text style={base.jobTitle}>{exp.position}{exp.company && ` | ${exp.company}`}</Text><Text style={base.jobMeta}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</Text></View>
              {exp.bullets.filter(Boolean).map((b, i) => <Text key={i} style={base.bullet}>• {b}</Text>)}
            </View>
          ))}
        </View>
      )}
      {data.education.length > 0 && (
        <View style={{ marginBottom: 12 * sp }}>
          <Text style={st}>Education</Text>
          {data.education.map((edu) => <View key={edu.id} style={{ marginBottom: 4 * sp }}><View style={base.row}><Text style={{ fontSize: 9, fontWeight: "bold" }}>{edu.degree}{edu.field && ` in ${edu.field}`}{edu.school && ` — ${edu.school}`}</Text><Text style={base.jobMeta}>{edu.startDate}{edu.startDate && " – "}{edu.endDate}</Text></View></View>)}
        </View>
      )}
      {data.skills.length > 0 && <View style={{ marginBottom: 12 * sp }}><Text style={st}>Skills</Text><Text style={base.text9}>{data.skills.join(" • ")}</Text></View>}
      {data.projects.length > 0 && (
        <View style={{ marginBottom: 12 * sp }}>
          <Text style={st}>Projects</Text>
          {data.projects.map((proj) => <View key={proj.id} style={{ marginBottom: 4 * sp }}><Text style={{ fontSize: 9, fontWeight: "bold" }}>{proj.name}{proj.technologies && ` (${proj.technologies})`}</Text>{proj.description && <Text style={base.text9}>{proj.description}</Text>}</View>)}
        </View>
      )}
    </Page>
  );
}

/* ---- Minimal ---- */
function MinimalPDF({ data }: { data: ResumeData }) {
  const pi = data.personal_info;
  const sp = getSpacing(data.spacing).scale;
  const st = { fontSize: 8, fontWeight: "bold" as const, textTransform: "uppercase" as const, letterSpacing: 2, color: "#999999", marginBottom: 3, paddingBottom: 2, borderBottomWidth: 0.5, borderBottomColor: "#dddddd" };
  return (
    <Page size="A4" style={{ ...base.page, paddingHorizontal: 44, paddingVertical: 36 }}>
      <Text style={{ fontSize: 22, fontWeight: "thin", color: "#111111", marginBottom: 2 }}>{pi.fullName || "Your Name"}</Text>
      <View style={{ ...base.contactRow, color: "#aaaaaa" }}>
        {[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).map((v, i) => <Text key={i}>{v}</Text>)}
      </View>
      {data.summary && <View style={{ marginTop: 12, marginBottom: 14 * sp }}><Text style={{ fontSize: 9, color: "#777777", lineHeight: 1.5 }}>{data.summary}</Text></View>}
      {data.experience.length > 0 && (
        <View style={{ marginBottom: 14 * sp }}>
          <Text style={st}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 8 * sp, paddingBottom: 4, borderBottomWidth: 0.25, borderBottomColor: "#eeeeee" }}>
              <View style={base.row}><Text style={{ fontSize: 10, fontWeight: "bold", color: "#111111" }}>{exp.position}</Text><Text style={{ fontSize: 8, color: "#aaaaaa" }}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</Text></View>
              {exp.company && <Text style={{ fontSize: 8, color: "#aaaaaa" }}>{exp.company}</Text>}
              {exp.bullets.filter(Boolean).map((b, i) => <Text key={i} style={{ fontSize: 9, color: "#555555", paddingLeft: 8, marginBottom: 1 }}>– {b}</Text>)}
            </View>
          ))}
        </View>
      )}
      {data.education.length > 0 && (
        <View style={{ marginBottom: 14 * sp }}>
          <Text style={st}>Education</Text>
          {data.education.map((edu) => <View key={edu.id} style={{ marginBottom: 3 * sp }}><View style={base.row}><Text style={{ fontSize: 9, color: "#111111" }}>{edu.degree}{edu.field && ` in ${edu.field}`}{edu.school && ` — ${edu.school}`}</Text><Text style={{ fontSize: 8, color: "#aaaaaa" }}>{edu.startDate}{edu.startDate && " – "}{edu.endDate}</Text></View></View>)}
        </View>
      )}
      {data.skills.length > 0 && <View style={{ marginBottom: 14 * sp }}><Text style={st}>Skills</Text><Text style={{ fontSize: 9, color: "#555555" }}>{data.skills.join("  ·  ")}</Text></View>}
      {data.projects.length > 0 && (
        <View style={{ marginBottom: 14 * sp }}>
          <Text style={st}>Projects</Text>
          {data.projects.map((proj) => <View key={proj.id} style={{ marginBottom: 3 * sp }}><Text style={{ fontSize: 9, fontWeight: "bold", color: "#111111" }}>{proj.name}{proj.technologies && `  (${proj.technologies})`}</Text>{proj.description && <Text style={{ fontSize: 8, color: "#777777" }}>{proj.description}</Text>}</View>)}
        </View>
      )}
    </Page>
  );
}

/* ---- ATS (plain) ---- */
function ATSPDF({ data }: { data: ResumeData }) {
  const pi = data.personal_info;
  const sp = getSpacing(data.spacing).scale;
  const st = { fontSize: 10, fontWeight: "bold" as const, textTransform: "uppercase" as const, marginBottom: 2, borderBottomWidth: 1, borderBottomColor: "#000000", paddingBottom: 2, color: "#000000" };
  return (
    <Page size="A4" style={{ ...base.page, fontFamily: "Helvetica" }}>
      <View style={{ alignItems: "center", marginBottom: 4 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", textTransform: "uppercase" }}>{pi.fullName || "YOUR NAME"}</Text>
        <Text style={{ fontSize: 9 }}>{[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).join(" | ")}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 6 }} />
      {data.summary && <View style={{ marginBottom: 10 * sp }}><Text style={st}>PROFESSIONAL SUMMARY</Text><Text style={{ fontSize: 9, color: "#000000", lineHeight: 1.4 }}>{data.summary}</Text></View>}
      {data.experience.length > 0 && (
        <View style={{ marginBottom: 10 * sp }}>
          <Text style={st}>WORK EXPERIENCE</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 6 * sp }}>
              <View style={base.row}><Text style={{ fontSize: 9, fontWeight: "bold" }}>{exp.position}{exp.company && ` — ${exp.company}`}</Text><Text style={{ fontSize: 8 }}>{exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}</Text></View>
              {exp.bullets.filter(Boolean).map((b, i) => <Text key={i} style={{ fontSize: 9, paddingLeft: 10, marginBottom: 1 }}>• {b}</Text>)}
            </View>
          ))}
        </View>
      )}
      {data.education.length > 0 && (
        <View style={{ marginBottom: 10 * sp }}>
          <Text style={st}>EDUCATION</Text>
          {data.education.map((edu) => <View key={edu.id} style={{ marginBottom: 3 * sp }}><View style={base.row}><Text style={{ fontSize: 9, fontWeight: "bold" }}>{edu.degree}{edu.field && ` in ${edu.field}`}{edu.school && ` — ${edu.school}`}</Text><Text style={{ fontSize: 8 }}>{edu.startDate}{edu.startDate && " – "}{edu.endDate}</Text></View>{edu.gpa && <Text style={{ fontSize: 8 }}>GPA: {edu.gpa}</Text>}</View>)}
        </View>
      )}
      {data.skills.length > 0 && <View style={{ marginBottom: 10 * sp }}><Text style={st}>SKILLS</Text><Text style={{ fontSize: 9 }}>{data.skills.join(", ")}</Text></View>}
      {data.projects.length > 0 && (
        <View style={{ marginBottom: 10 * sp }}>
          <Text style={st}>PROJECTS</Text>
          {data.projects.map((proj) => <View key={proj.id} style={{ marginBottom: 3 * sp }}><Text style={{ fontSize: 9, fontWeight: "bold" }}>{proj.name}{proj.technologies && ` (${proj.technologies})`}</Text>{proj.description && <Text style={{ fontSize: 8 }}>{proj.description}</Text>}</View>)}
        </View>
      )}
      {data.certifications.length > 0 && (
        <View style={{ marginBottom: 10 * sp }}>
          <Text style={st}>CERTIFICATIONS</Text>
          {data.certifications.map((c) => <Text key={c.id} style={{ fontSize: 9, marginBottom: 1 }}>{c.name}{c.issuer && ` — ${c.issuer}`}{c.date && ` (${c.date})`}</Text>)}
        </View>
      )}
    </Page>
  );
}

/* ---- Main Document ---- */
interface Props {
  data: ResumeData;
}

export function ResumePDFDocument({ data }: Props) {
  const accent = hslToRgb(getColorHSL(data.color_theme));

  return (
    <Document title={data.title} author={data.personal_info.fullName}>
      {data.template === "modern" && <ModernPDF data={data} accent={accent} />}
      {data.template === "classic" && <ClassicPDF data={data} accent={accent} />}
      {data.template === "minimal" && <MinimalPDF data={data} />}
      {data.template === "ats" && <ATSPDF data={data} />}
      {!["modern", "classic", "minimal", "ats"].includes(data.template) && <ModernPDF data={data} accent={accent} />}
    </Document>
  );
}
