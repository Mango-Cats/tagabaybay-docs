import type { ProjectMember, FacultyAdviser } from "./types";

export const projectMembers: ProjectMember[] = [
  {
    id: "zrygan",
    name: "Zhean Robby Ganituen",
    initials: "ZG",
    role: "Project Lead",
    affiliation: "De La Salle University, Manila",
    department: "Department of Software Technology",
    email: "zhean_robby_ganituen@dlsu.edu.ph",
    shortBio: "Undergraduate researcher working in Theoretical Computer Science, Parallel Algorithms, and Computational Linguistics.",
    bio: {
      about: "Undergraduate Computer Science student at De La Salle University, Manila. In the MangoCats research group, focuses on low-resource NLP, word confusability, and phonetic/orthographic algorithms for Filipino.",
      researchInterests: [
        "Theoretical Computer Science",
        "Parallel Algorithms",
        "Computational Linguistics",
        "Filipino G2P & Phonology"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      website: "https://zrygan.github.io",
      github: "https://github.com/zrygan",
      scholar: "https://scholar.google.com/citations?user=tGIiReAAAAAJ",
      orcid: "https://orcid.org/0009-0002-3266-5384",
      linkedin: "https://www.linkedin.com/in/zrygan/"
    }
  },
  {
    id: "erin-chua",
    name: "Erin Gabrielle Chua",
    initials: "EC",
    role: "Researcher",
    affiliation: "De La Salle University, Manila",
    department: "Department of Software Technology",
    email: "erin_gabrielle_chua@dlsu.edu.ph",
    shortBio: "Undergraduate researcher specializing in computational linguistics, Filipino orthographic rules, and rule-based linguistic modeling.",
    bio: {
      about: "Researcher in the MangoCats group specializing in formalizing natural language phenomena through structured rewrite rules, low-resource domain feature analysis, and orthographic nativization.",
      researchInterests: [
        "Computational Linguistics",
        "Filipino Orthography",
        "Rule-Based Systems",
        "Low-Resource NLP"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/Mango-Cats"
    }
  },
  {
    id: "justin-ching",
    name: "Justin Ethan Ching",
    initials: "JC",
    role: "Researcher",
    affiliation: "De La Salle University, Manila",
    department: "Department of Software Technology",
    email: "justin_ethan_ching@dlsu.edu.ph",
    shortBio: "Undergraduate researcher focusing on grammar checking, formal grammars, and computational tools for Philippine languages.",
    bio: {
      about: "Researcher in the MangoCats group working on low-resource NLP tools for Philippine languages, including Tagalog, Bikol, and Filipino loanword adaptation pipelines.",
      researchInterests: [
        "Grammar Checking & Error Detection",
        "Formal Language Theory",
        "Philippine Language Technologies",
        "Low-Resource NLP"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/Mango-Cats"
    }
  },
  {
    id: "jaztin-jimenez",
    name: "Jaztin Jacob Jimenez",
    initials: "JJ",
    role: "Researcher",
    affiliation: "De La Salle University, Manila",
    department: "Department of Software Technology",
    email: "jaztin_jacob_jimenez@dlsu.edu.ph",
    shortBio: "Undergraduate researcher exploring phonological adaptation, string transformations, and low-resource NLP systems.",
    bio: {
      about: "Working with the MangoCats team on linguistic datasets, evaluation benchmarks, and rule cascades that bridge phonology and written orthography in Filipino.",
      researchInterests: [
        "Phonological Modeling",
        "Loanword Adaptation",
        "Rule-Based NLP Pipelines",
        "Software Engineering"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/Mango-Cats"
    }
  }
];

export const facultyAdviser: FacultyAdviser = {
  name: "Nathaniel Oco"
};

export const collaborators: string[] = [
  "Clarence Ivan Ang",
  "Roan Cedric Campo",
  "Clive Jarel Ang"
];

if (typeof window !== "undefined") {
  window.projectMembers = projectMembers;
  window.facultyAdviser = facultyAdviser;
  window.collaborators = collaborators;
}
