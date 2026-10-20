// Sample data (replaced by backend API calls once Vandita's backend is ready)
const profile = {
  name: "Bhavini Meena",
  specialization: "B.Tech DevOps, Semester III",
  bio: "UI/UX and frontend developer. Interested in clean interfaces and cloud tooling.",
  followers: 12,
  following: 8,
  following_state: false,
  skills: ["HTML", "CSS", "JavaScript", "Figma"],
  achievements: [
    { title: "Completed Git & GitHub certification", type: "Certification", date: "Sep 2026" },
    { title: "Finalist, campus hackathon", type: "Hackathon", date: "Aug 2026" }
  ],
  projects: [
    { title: "Study Group Finder", desc: "Match students into study groups by subject and timing.", needs: ["Python", "Flask"], requested: false },
    { title: "Lost & Found Board", desc: "A simple board for lost items across campus.", needs: ["React", "UI design"], requested: false }
  ]
};

const $ = (id) => document.getElementById(id);

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function initials(name) {
  return name.split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join("");
}

function renderHeader() {
  $("student-name").textContent = profile.name;
  $("student-spec").textContent = profile.specialization;
  $("student-bio").textContent = profile.bio;
  $("avatar").textContent = initials(profile.name);
  $("followers").textContent = profile.followers;
  $("following").textContent = profile.following;
  const btn = $("follow-btn");
  btn.textContent = profile.following_state ? "Following" : "Follow";
  btn.classList.toggle("done", profile.following_state);
}

function renderSkills() {
  const ul = $("skills");
  ul.innerHTML = "";
  profile.skills.forEach((skill, i) => {
    const li = document.createElement("li");
    li.textContent = skill;
    const rm = document.createElement("button");
    rm.type = "button";
    rm.textContent = "×";
    rm.setAttribute("aria-label", "Remove " + skill);
    rm.addEventListener("click", () => { profile.skills.splice(i, 1); renderSkills(); });
    li.appendChild(rm);
    ul.appendChild(li);
  });
}

function renderAchievements() {
  const ul = $("achievement-list");
  ul.innerHTML = "";
  profile.achievements.forEach((a) => {
    const li = document.createElement("li");
    li.innerHTML = '<div class="t"></div><div class="m"></div>';
    li.querySelector(".t").textContent = a.title;
    li.querySelector(".m").textContent = a.type + " · " + a.date;
    ul.appendChild(li);
  });
}

function renderProjects() {
  const box = $("project-list");
  box.innerHTML = "";
  profile.projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project";
    const h = document.createElement("h3");
    h.textContent = p.title;
    const d = document.createElement("p");
    d.textContent = p.desc;
    const n = document.createElement("div");
    n.className = "m";
    n.textContent = "Needs: " + p.needs.join(", ");
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn" + (p.requested ? " done" : "");
    b.textContent = p.requested ? "Request sent" : "Request to join";
    b.addEventListener("click", () => {
      if (p.requested) return;
      p.requested = true;
      renderProjects();
      toast("Join request sent");
    });
    card.append(h, d, n, b);
    box.appendChild(card);
  });
}

// Follow button
$("follow-btn").addEventListener("click", () => {
  profile.following_state = !profile.following_state;
  profile.followers += profile.following_state ? 1 : -1;
  renderHeader();
});

// Add skill (blocks empty and duplicate skills)
function addSkill() {
  const input = $("skill-input");
  const value = input.value.trim();
  const err = $("skill-error");
  if (!value) { err.textContent = "Enter a skill before adding."; return; }
  if (profile.skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
    err.textContent = value + " is already in your skills.";
    return;
  }
  err.textContent = "";
  profile.skills.push(value);
  input.value = "";
  renderSkills();
}
$("skill-btn").addEventListener("click", addSkill);
$("skill-input").addEventListener("keydown", (e) => { if (e.key === "Enter") addSkill(); });

// Edit profile
$("edit-btn").addEventListener("click", () => {
  $("in-name").value = profile.name;
  $("in-spec").value = profile.specialization;
  $("in-bio").value = profile.bio;
  $("edit-error").textContent = "";
  $("edit-panel").classList.remove("hidden");
  $("in-name").focus();
});
$("cancel-btn").addEventListener("click", () => $("edit-panel").classList.add("hidden"));
$("save-btn").addEventListener("click", () => {
  const name = $("in-name").value.trim();
  if (!name) { $("edit-error").textContent = "Name can't be empty."; return; }
  profile.name = name;
  profile.specialization = $("in-spec").value.trim();
  profile.bio = $("in-bio").value.trim();
  renderHeader();
  $("edit-panel").classList.add("hidden");
  toast("Profile saved");
});

renderHeader();
renderSkills();
renderAchievements();
renderProjects();
