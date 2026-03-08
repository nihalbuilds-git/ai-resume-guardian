// Resume data types used across the editor

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  id: string;
  user_id: string;
  title: string;
  template: string;
  color_theme: string;
  font_pair: string;
  spacing: string;
  personal_info: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  section_order: string[];
  ats_score: number;
  last_edited: string;
  created_at: string;
  updated_at: string;
}

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
};

export const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Clean and professional" },
  { id: "classic", name: "Classic", description: "Traditional and timeless" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant" },
] as const;
