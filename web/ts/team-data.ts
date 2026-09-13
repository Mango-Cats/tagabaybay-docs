const projectMembers: ProjectMember[] = [
  {
    id: "zrygan",
    name: "Zhean Robby Ganituen",
    avatar: "🥭",
    affiliation: "De La Salle University, Manila",
    email: "zhean_robby_ganituen@dlsu.edu.ph",
    shortBio: "Put your short bio here...",
    bio: {
      about: "Put your full bio here...",
      interests: [
        "A",
        "B",
        "C",
        "D"
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
    avatar: "🏳️‍🌈",
    affiliation: "De La Salle University, Manila",
    email: "erin_gabrielle_chua@dlsu.edu.ph",
    shortBio: "Put your short bio here...",
    bio: {
      about: "Put your full bio here...",
      interests: [
        "A",
        "B",
        "C",
        "D"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/chua-e"
    }
  },
  {
    id: "justin-ching",
    name: "Justin Ethan Ching",
    avatar: "🐾",
    affiliation: "De La Salle University, Manila",
    email: "justin_ethan_ching@dlsu.edu.ph",
    shortBio: "Put your short bio here...",
    bio: {
      about: "Put your full bio here...",
      interests: [
        "A",
        "B",
        "C",
        "D"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/JustinChing30"
    }
  },
  {
    id: "jaztin-jimenez",
    name: "Jaztin Jacob Jimenez",
    avatar: "⚡",
    affiliation: "De La Salle University, Manila",
    email: "jaztin_jacob_jimenez@dlsu.edu.ph",
    shortBio: "Put your short bio here...",
    bio: {
      about: "Put your full bio here...",
      interests: [
        "A",
        "B",
        "C",
        "D"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/jazjimenez"
    }
  }
];

const facultyAdviser: FacultyAdviser = {
  name: "Nathaniel Oco"
};

const collaborators: string[] = [
  "Clarence Ivan Ang",
  "Roan Cedric Campo",
  "Clive Jarel Ang"
];

if (typeof window !== "undefined") {
  window.projectMembers = projectMembers;
  window.facultyAdviser = facultyAdviser;
  window.collaborators = collaborators;
  window.dispatchEvent(new CustomEvent("team-data-ready"));
}
