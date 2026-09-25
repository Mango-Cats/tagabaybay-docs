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
    avatar: "🦐",
    affiliation: "De La Salle University, Manila",
    email: "erin_gabrielle_chua@dlsu.edu.ph",
    shortBio: "I am currently an undergraduate student at De La Salle University taking up Computer Science with a specialization in Software Technology.",
    bio: {
      about: "I am a Computer Science undergraduate at De La Salle University specializing in Software Technology, with a minor in Finance and Risk Analytics. ",
      interests: [
        "Natural Language Processing",
        "Machine Learning",
        "Data Analytics",
        "Website Development",
        "Graphic Design & Illustration",
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/chua-e",
      linkedin: "https://www.linkedin.com/in/erin-gabrielle-chua-3619a134a/",
    }
  },
  {
    id: "justin-ching",
    name: "Justin Ethan Ching",
    avatar: "🐾",
    affiliation: "De La Salle University, Manila",
    email: "justin_ethan_ching@dlsu.edu.ph",
    shortBio: "I am a fourth-year Computer Science undergraduate student at De La Salle University.",
    bio: {
      about: "I am a fourth-year undergraduate student at De La Salle University pursuing a degree in Computer Science, majoring in Software Technology.",
      interests: [
        "Computer Vision",
        "Data Analysis and Statistics",
        "Machine Learning"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/JustinChing30",
      scholar: "https://scholar.google.com/citations?user=kn0Xv8wAAAAJ",
      linkedin: "https://www.linkedin.com/in/justinching30/"
    }
  },
  {
    id: "jaztin-jimenez",
    name: "Jaztin Jacob Jimenez",
    avatar: "⚡",
    affiliation: "De La Salle University, Manila",
    email: "jaztin_jacob_jimenez@dlsu.edu.ph",
    shortBio: "I am a Computer Science student at De La Salle University specializing in Software Technology. I am a full-stack developer, a Website Manager for Archers Network, and a researcher focusing on audio-visual speech recognition.",
    bio: {
      about: "I am a Software Technology specialist at De La Salle University with a unique blend of technical expertise and creative project management. Alongside my work as Website Manager for Archers Network and my research in natural language processing, I bring a highly collaborative perspective shaped by my background in university theatre production.",
      interests: [
        "Audio-Visual Speech Recognition",
        "Machine Learning",
        "Website Development",
        "Software Engineering",
        "Agile Methodologies",
        "Technical Project Management"
      ],
      education: "B.S. Computer Science (Software Technology), De La Salle University"
    },
    links: {
      github: "https://github.com/jazjimenez",
      linkedin: "https://www.linkedin.com/in/jazjimenez/"
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
