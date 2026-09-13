export interface MemberBio {
  about: string;
  researchInterests: string[];
  education?: string;
  funFact?: string;
  currentProjects?: string[];
}

export interface MemberLinks {
  website?: string;
  github?: string;
  scholar?: string;
  orcid?: string;
  linkedin?: string;
  email?: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  affiliation: string;
  department: string;
  email: string;
  shortBio: string;
  bio: MemberBio;
  links: MemberLinks;
}

export interface FacultyAdviser {
  name: string;
  role?: string;
  affiliation?: string;
  lab?: string;
  email?: string;
  scholar?: string;
  github?: string;
}

export interface CascadeStep {
  from: string;
  to: string;
  rule: string;
}

export interface DemoPreset {
  ipa: string;
  tokens: string[];
  steps: CascadeStep[];
  nativized: string;
  notes: string;
}

declare global {
  interface Window {
    projectMembers?: ProjectMember[];
    facultyAdviser?: FacultyAdviser;
    collaborators?: string[];
  }
}
