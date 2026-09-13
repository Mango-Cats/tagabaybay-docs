interface MemberBio {
  about: string;
  interests: string[];
  education?: string;
  funFact?: string;
  currentProjects?: string[];
}

interface MemberLinks {
  website?: string;
  github?: string;
  scholar?: string;
  orcid?: string;
  linkedin?: string;
  email?: string;
}

interface ProjectMember {
  id: string;
  name: string;
  avatar: string;
  affiliation: string;
  email: string;
  shortBio: string;
  bio: MemberBio;
  links: MemberLinks;
}

interface FacultyAdviser {
  name: string;
  affiliation?: string;
  lab?: string;
  email?: string;
  scholar?: string;
  github?: string;
}

interface CascadeStep {
  from: string;
  to: string;
  rule: string;
}

interface DemoPreset {
  ipa: string;
  tokens: string[];
  steps: CascadeStep[];
  nativized: string;
  notes: string;
}

interface Window {
  projectMembers?: ProjectMember[];
  facultyAdviser?: FacultyAdviser;
  collaborators?: string[];
}
