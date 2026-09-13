function initApp(): void {
  renderTeamCards();
  renderAdviserAndCollaborators();
  initModal();
  initDemo();
  initCopyActions();
  initGlobalDelegation();
  initQuestionForm();
}

function renderTeamCards(): void {
  const container = document.getElementById("team-cards-grid");
  const members = window.projectMembers || [];
  if (!container) return;
  if (members.length === 0) {
    setTimeout(renderTeamCards, 50);
    return;
  }

  container.innerHTML = members.map((member: ProjectMember) => {
    const linksHtml = generateLinksHtml(member.links);
    const avatarHtml = renderAvatar(member.avatar, member.name);

    return `
      <article class="business-card" id="card-${escapeHtml(member.id)}">
        <header class="card-header">
          <div class="avatar-box">
            ${avatarHtml}
          </div>
          <div class="card-meta">
            <h3 class="member-name">${escapeHtml(member.name)}</h3>
          </div>
        </header>

        <div class="card-body">
          <p class="member-affiliation">🏛️ ${escapeHtml(member.affiliation)}</p>
          <p class="member-bio">${escapeHtml(member.shortBio)}</p>
        </div>

        <div class="card-footer">
          <div class="card-actions">
            <button class="btn btn-sm btn-primary btn-bio" data-id="${escapeHtml(member.id)}">
              Bio
            </button>
            <button class="btn btn-sm btn-secondary btn-copy-email" data-email="${escapeHtml(member.email)}" title="Copy Email">
              Copy Email
            </button>
          </div>
          <div class="member-social-links">${linksHtml}</div>
        </div>
      </article>
    `;
  }).join("");
}

function generateLinksHtml(links: MemberLinks = {}): string {
  const linkDefs: { key: keyof MemberLinks; icon: string; label: string }[] = [
    { key: "website", icon: "🌐", label: "Website" },
    { key: "github", icon: "🐙", label: "GitHub" },
    { key: "scholar", icon: "🎓", label: "Scholar" },
    { key: "orcid", icon: "🆔", label: "ORCID" },
    { key: "linkedin", icon: "💼", label: "LinkedIn" }
  ];

  return linkDefs
    .filter(d => links[d.key])
    .map(d => `
      <a href="${escapeHtml(links[d.key] || "")}" target="_blank" rel="noopener noreferrer" class="social-icon-link" title="${d.label}">
        ${d.icon}
      </a>
    `)
    .join("");
}

function renderAvatar(avatar: string, name: string): string {
  if (!avatar) return `<span class="avatar-emoji">👤</span>`;
  const isImage = /\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(avatar) || avatar.startsWith("http://") || avatar.startsWith("https://") || avatar.startsWith("/") || avatar.startsWith("./") || avatar.startsWith("data:image");
  if (isImage) {
    return `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(name)}" class="avatar-img" />`;
  }
  return `<span class="avatar-emoji">${escapeHtml(avatar)}</span>`;
}

function renderAdviserAndCollaborators(): void {
  const adviserNameEl = document.getElementById("faculty-adviser-name");
  const collabEl = document.getElementById("collaborators-bullet-list");
  const adviser = window.facultyAdviser;
  const collabList = window.collaborators || [];

  if (!adviser && !window.collaborators) {
    setTimeout(renderAdviserAndCollaborators, 50);
    return;
  }

  if (adviserNameEl && adviser) {
    adviserNameEl.textContent = adviser.name || "Nathaniel Oco";
  }

  if (collabEl && collabList) {
    collabEl.innerHTML = collabList.map(name => `
      <li>${escapeHtml(typeof name === "string" ? name : (name as { name: string }).name)}</li>
    `).join("");
  }
}

let activeModalMember: ProjectMember | null = null;

function initModal(): void {
  const modal = document.getElementById("bio-modal");
  if (!modal) return;

  const closeModal = (): void => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    activeModalMember = null;
  };

  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target.id === "modal-close-btn" || target.id === "modal-overlay" || target.closest("#modal-close-btn")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  const modalCopyBtn = document.getElementById("modal-copy-email");
  if (modalCopyBtn) {
    modalCopyBtn.addEventListener("click", () => {
      if (activeModalMember && activeModalMember.email) {
        copyToClipboard(activeModalMember.email, `Copied: ${activeModalMember.email}`);
      }
    });
  }
}

function initGlobalDelegation(): void {
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const bioBtn = target.closest(".btn-bio") as HTMLButtonElement | null;
    if (bioBtn) {
      e.preventDefault();
      const id = bioBtn.dataset.id;
      if (id) openBioModal(id);
      return;
    }

    const copyBtn = target.closest(".btn-copy-email") as HTMLButtonElement | null;
    if (copyBtn) {
      e.preventDefault();
      const email = copyBtn.dataset.email;
      if (email) copyToClipboard(email, `Copied: ${email}`);
      return;
    }
  });
}

function openBioModal(memberId: string): void {
  const members = window.projectMembers || [];
  const member = members.find((m: ProjectMember) => m.id === memberId);
  if (!member) return;

  activeModalMember = member;
  const modal = document.getElementById("bio-modal");
  if (!modal) return;

  const avatarEl = document.getElementById("modal-avatar");
  const nameEl = document.getElementById("modal-name");
  const deptEl = document.getElementById("modal-dept");
  const aboutEl = document.getElementById("modal-about-text");
  const emailEl = document.getElementById("modal-email-text");
  const interestsTextEl = document.getElementById("modal-interests-text");
  const linksContainer = document.getElementById("modal-links-container");

  if (avatarEl) avatarEl.innerHTML = renderAvatar(member.avatar, member.name);
  if (nameEl) nameEl.textContent = member.name;
  if (deptEl) deptEl.textContent = member.affiliation;

  const aboutText = member.bio?.about || member.shortBio;
  if (aboutEl) aboutEl.textContent = aboutText;

  if (interestsTextEl) {
    interestsTextEl.textContent = (member.bio?.interests || []).join(", ");
  }

  if (emailEl) emailEl.textContent = member.email;
  if (linksContainer) {
    linksContainer.innerHTML = generateLinksHtml(member.links);
  }

  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

const DEMO_PRESETS: Record<string, DemoPreset> = {
  "computer": {
    ipa: "/kəmˈpjuː.tɚ/",
    tokens: ["c", "o", "m", "p", "u", "t", "er"],
    steps: [
      { from: "c", to: "k", rule: "c → k (before 'o')" },
      { from: "o", to: "o", rule: "short vowel o" },
      { from: "m", to: "m", rule: "invariant consonant" },
      { from: "p", to: "p", rule: "invariant consonant" },
      { from: "u", to: "yu", rule: "phonetic /juː/ glide resolution" },
      { from: "t", to: "t", rule: "invariant consonant" },
      { from: "er", to: "er", rule: "rhotic unstressed coda" }
    ],
    nativized: "kompyuter",
    notes: "KWF standard loanword nativization: preserving phonotactic glide /j/."
  },
  "traffic": {
    ipa: "/ˈtræf.ɪk/",
    tokens: ["t", "r", "a", "ff", "i", "c"],
    steps: [
      { from: "t", to: "t", rule: "invariant consonant" },
      { from: "r", to: "r", rule: "invariant consonant" },
      { from: "a", to: "a", rule: "vowel /æ/ → /a/" },
      { from: "ff", to: "p", rule: "geminate reduction ff → f/p → p" },
      { from: "i", to: "i", rule: "high front vowel" },
      { from: "c", to: "k", rule: "coda c → k" }
    ],
    nativized: "trapik",
    notes: "Geminate reduction and final coda hardening."
  },
  "schedule": {
    ipa: "/ˈskɛdʒ.uːl/",
    tokens: ["s", "ch", "e", "d", "u", "le"],
    steps: [
      { from: "s", to: "is", rule: "initial sC prothesis (prosthesis)" },
      { from: "ch", to: "k", rule: "ch → k in Greek-derived loans" },
      { from: "e", to: "e", rule: "mid front vowel" },
      { from: "d", to: "d", rule: "invariant consonant" },
      { from: "u", to: "yu", rule: "glide expansion" },
      { from: "le", to: "l", rule: "silent final -e deletion" }
    ],
    nativized: "iskedyul",
    notes: "Prosthetic /i/ insertion before s-cluster obeying Filipino phonotactics."
  },
  "basketball": {
    ipa: "/ˈbæs.kɪt.bɔːl/",
    tokens: ["b", "a", "s", "k", "e", "t", "b", "a", "ll"],
    steps: [
      { from: "b-a-s-k-e-t", to: "basket", rule: "syllable 1 cascade" },
      { from: "b", to: "b", rule: "invariant consonant" },
      { from: "a-ll", to: "ol", rule: "-all → -ol phonetic rounding" }
    ],
    nativized: "basketbol",
    notes: "Codified in KWF Manwal sa Masinop na Pagsulat (Almario, 2014)."
  },
  "straight": {
    ipa: "/streɪt/",
    tokens: ["s", "t", "r", "a", "igh", "t"],
    steps: [
      { from: "s", to: "is", rule: "sC cluster prosthetic /i/ repair" },
      { from: "t-r", to: "tr", rule: "onset cluster retention" },
      { from: "a-igh", to: "ey", rule: "tetragraph cascade aigh → ey" },
      { from: "t", to: "t", rule: "invariant coda" }
    ],
    nativized: "istreyt",
    notes: "Greedy multigraph tokenizer identifies igh tetragraph and applies prothesis."
  },
  "cake": {
    ipa: "/keɪk/",
    tokens: ["c", "a", "k", "e"],
    steps: [
      { from: "c", to: "k", rule: "c → k" },
      { from: "a", to: "ey", rule: "diphthong /eɪ/ resolution" },
      { from: "k", to: "k", rule: "invariant coda" },
      { from: "e", to: "∅", rule: "silent terminal -e truncation" }
    ],
    nativized: "keyk",
    notes: "English diphthong spelling nativization."
  },
  "xylophone": {
    ipa: "/ˈzaɪ.lə.foʊn/",
    tokens: ["x", "y", "l", "o", "ph", "o", "n", "e"],
    steps: [
      { from: "x", to: "s", rule: "word-initial x → s" },
      { from: "y", to: "ay", rule: "vocalic y /aɪ/ → ay" },
      { from: "l", to: "l", rule: "liquid consonant" },
      { from: "o", to: "o", rule: "unstressed vowel" },
      { from: "ph", to: "p", rule: "digraph ph → p/f → p" },
      { from: "o", to: "o", rule: "vowel retention" },
      { from: "n", to: "n", rule: "nasal coda" },
      { from: "e", to: "∅", rule: "silent final -e" }
    ],
    nativized: "saylopon",
    notes: "Shows initial x-reduction and ph digraph mapping."
  },
  "chalk": {
    ipa: "/tʃɔːk/",
    tokens: ["ch", "a", "l", "k"],
    steps: [
      { from: "ch", to: "ts", rule: "affricate ch → ts" },
      { from: "a-l", to: "o", rule: "silent l / alk → ok backing" },
      { from: "k", to: "k", rule: "voiceless velar coda" }
    ],
    nativized: "tsok",
    notes: "Phonotactic adaptation of silent liquid in English codas."
  },
  "taxi": {
    ipa: "/ˈtæk.si/",
    tokens: ["t", "a", "x", "i"],
    steps: [
      { from: "t", to: "t", rule: "invariant stop" },
      { from: "a", to: "a", rule: "open front vowel" },
      { from: "x", to: "ks", rule: "medial cluster x → ks" },
      { from: "i", to: "i", rule: "high front vowel" }
    ],
    nativized: "taksi",
    notes: "Explicit phonotactic spelling of English /ks/ cluster."
  },
  "cotrimoxazole": {
    ipa: "/koʊˌtrɪˈmɒk.sə.zoʊl/",
    tokens: ["c", "o", "t", "r", "i", "m", "o", "x", "a", "z", "o", "le"],
    steps: [
      { from: "c", to: "k", rule: "c → k (before back vowel 'o')" },
      { from: "o", to: "o", rule: "mid back vowel retention" },
      { from: "t", to: "t", rule: "invariant alveolar stop" },
      { from: "r", to: "r", rule: "invariant liquid consonant" },
      { from: "i", to: "i", rule: "high front vowel retention" },
      { from: "m", to: "m", rule: "bilabial nasal" },
      { from: "o", to: "o", rule: "mid back vowel" },
      { from: "x", to: "ks", rule: "medial cluster x → ks" },
      { from: "a", to: "a", rule: "open vowel /a/" },
      { from: "z", to: "z", rule: "borrowed letter z retention" },
      { from: "o", to: "o", rule: "vowel retention" },
      { from: "le", to: "l", rule: "silent word-final -e truncation" }
    ],
    nativized: "kotrimoksazol",
    notes: "Pharmaceutical loanword adaptation with medial x → ks cluster mapping and silent -e truncation."
  },
  "doxycycline": {
    ipa: "/ˌdɒk.sɪˈsaɪ.kliːn/",
    tokens: ["d", "o", "x", "y", "c", "y", "c", "l", "i", "ne"],
    steps: [
      { from: "d", to: "d", rule: "invariant voiced stop" },
      { from: "o", to: "o", rule: "short vowel o" },
      { from: "x", to: "ks", rule: "medial cluster x → ks" },
      { from: "y", to: "i", rule: "unstressed vocalic y → i" },
      { from: "c", to: "s", rule: "c → s (before front vowel)" },
      { from: "y", to: "ay", rule: "phonetic diphthong /aɪ/ → ay" },
      { from: "c", to: "k", rule: "c → k (before consonant 'l')" },
      { from: "l", to: "l", rule: "lateral liquid" },
      { from: "i", to: "i", rule: "front vowel retention" },
      { from: "ne", to: "n", rule: "silent word-final -e truncation" }
    ],
    nativized: "doksisayklin",
    notes: "Demonstrates dual phonetic resolution of y (unstressed /ɪ/ → i vs. stressed /aɪ/ → ay) and contextual c mapping."
  },
  "amoxicillin": {
    ipa: "/əˌmɒk.sɪˈsɪl.ɪn/",
    tokens: ["a", "m", "o", "x", "i", "c", "i", "ll", "i", "n"],
    steps: [
      { from: "a", to: "a", rule: "word-initial vowel retention" },
      { from: "m", to: "m", rule: "bilabial nasal" },
      { from: "o", to: "o", rule: "mid back vowel" },
      { from: "x", to: "ks", rule: "medial cluster x → ks" },
      { from: "i", to: "i", rule: "high front vowel" },
      { from: "c", to: "s", rule: "c → s (before front vowel 'i')" },
      { from: "i", to: "i", rule: "high front vowel" },
      { from: "ll", to: "l", rule: "degemination ll → l" },
      { from: "i", to: "i", rule: "high front vowel" },
      { from: "n", to: "n", rule: "alveolar nasal coda" }
    ],
    nativized: "amoksisilin",
    notes: "Consonant degemination (ll → l), x-cluster expansion (x → ks), and front vowel context softening (c → s)."
  },
  "amlodipine": {
    ipa: "/æmˈloʊ.dɪ.piːn/",
    tokens: ["a", "m", "l", "o", "d", "i", "p", "i", "ne"],
    steps: [
      { from: "a", to: "a", rule: "open vowel /æ/ → /a/" },
      { from: "m", to: "m", rule: "bilabial nasal" },
      { from: "l", to: "l", rule: "liquid consonant" },
      { from: "o", to: "o", rule: "mid back vowel" },
      { from: "d", to: "d", rule: "invariant voiced stop" },
      { from: "i", to: "i", rule: "high front vowel" },
      { from: "p", to: "p", rule: "voiceless bilabial stop" },
      { from: "i", to: "i", rule: "high front vowel" },
      { from: "ne", to: "n", rule: "silent word-final -e truncation" }
    ],
    nativized: "amlodipin",
    notes: "Preserves syllable codas and truncates silent word-final -e."
  }
};

function initDemo(): void {
  const outputEl = document.getElementById("demo-output");
  const tokensEl = document.getElementById("demo-tokens");
  const cascadeEl = document.getElementById("demo-cascade-steps");
  const ipaEl = document.getElementById("demo-ipa");
  const noteEl = document.getElementById("demo-notes");
  const wordButtons = document.querySelectorAll<HTMLButtonElement>(".word-choice-btn");

  if (!wordButtons || wordButtons.length === 0) return;

  function selectWord(word: string): void {
    const data = DEMO_PRESETS[word];
    if (!data) return;

    if (outputEl) outputEl.textContent = data.nativized;
    if (ipaEl) ipaEl.textContent = data.ipa;
    if (noteEl) noteEl.textContent = data.notes;

    if (tokensEl) {
      tokensEl.innerHTML = data.tokens
        .map(t => `<span class="token-pill">${escapeHtml(t)}</span>`)
        .join("");
    }

    if (cascadeEl) {
      cascadeEl.innerHTML = data.steps.map((s, idx) => `
        <div class="cascade-step">
          <span class="step-num">${idx + 1}</span>
          <span class="step-trans"><code>${escapeHtml(s.from)}</code> → <strong>${escapeHtml(s.to)}</strong></span>
          <span class="step-rule">${escapeHtml(s.rule)}</span>
        </div>
      `).join("");
    }

    wordButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.word === word);
    });
  }

  wordButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const word = btn.dataset.word;
      if (word) selectWord(word);
    });
  });

  selectWord("computer");
}

function initCopyActions(): void {
  const bibtexBtn = document.getElementById("copy-bibtex-btn");
  if (bibtexBtn) {
    bibtexBtn.addEventListener("click", () => {
      const code = document.getElementById("bibtex-code");
      if (code) {
        copyToClipboard(code.innerText.trim(), "Copied BibTeX citation!");
      }
    });
  }
}


function copyToClipboard(text: string, successMsg: string): void {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text: string, successMsg: string): void {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (err) {
    showToast("Copy failed.");
  }
  document.body.removeChild(textarea);
}

function showToast(message: string): void {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
}

function initQuestionForm(): void {
  const form = document.getElementById("question-form") as HTMLFormElement | null;
  const copyBtn = document.getElementById("btn-copy-question") as HTMLButtonElement | null;
  if (!form) return;

  const getAllAuthorEmails = (): string => {
    const members = window.projectMembers || [];
    const emails = members.map(m => m.email).filter(Boolean);
    if (emails.length > 0) return emails.join(", ");
    return "zhean_robby_ganituen@dlsu.edu.ph, erin_gabrielle_chua@dlsu.edu.ph, justin_ethan_ching@dlsu.edu.ph, jaztin_jacob_jimenez@dlsu.edu.ph";
  };

  const getQuestionDetails = () => {
    const recipient = getAllAuthorEmails();
    const nameInput = document.getElementById("question-sender-name") as HTMLInputElement | null;
    const affilInput = document.getElementById("question-sender-affiliation") as HTMLInputElement | null;
    const subjectInput = document.getElementById("question-subject") as HTMLInputElement | null;
    const messageInput = document.getElementById("question-message") as HTMLTextAreaElement | null;

    const senderName = nameInput?.value.trim() || "";
    const senderAffil = affilInput?.value.trim() || "";
    let rawSubject = subjectInput?.value.trim() || "Research Inquiry";
    if (rawSubject.startsWith("[TagaBaybay]")) {
      rawSubject = rawSubject.replace(/^\[TagaBaybay\]\s*/, "");
    }
    const finalSubject = `[TagaBaybay] ${rawSubject}`;
    const message = messageInput?.value.trim() || "";

    const lines: string[] = [];
    if (senderName) lines.push(`Name: ${senderName}`);
    if (senderAffil) lines.push(`Affiliation / Contact: ${senderAffil}`);
    if (lines.length > 0) lines.push("");
    lines.push("Question / Inquiry:");
    lines.push(message);
    lines.push("");
    lines.push("---");
    lines.push("Sent via TagaBaybay Project Website (https://github.com/Mango-Cats/tagabaybay)");

    return {
      recipient,
      subject: finalSubject,
      body: lines.join("\n"),
      message
    };
  };

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const details = getQuestionDetails();
    if (!details.message) {
      showToast("Please enter a question or message.");
      return;
    }
    const mailtoUrl = `mailto:${encodeURIComponent(details.recipient)}?subject=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(details.body)}`;
    window.location.href = mailtoUrl;
    showToast("Opening email client to send question...");
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const details = getQuestionDetails();
      if (!details.message) {
        showToast("Please enter a question or message to copy.");
        return;
      }
      const fullText = `To: ${details.recipient}\nSubject: ${details.subject}\n\n${details.body}`;
      copyToClipboard(fullText, "Copied question details to clipboard!");
    });
  }
}

function escapeHtml(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

window.addEventListener("team-data-ready", () => {
  renderTeamCards();
  renderAdviserAndCollaborators();
});
