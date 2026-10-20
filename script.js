document.getElementById('profileForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const headline = document.getElementById('headline').value;
  const skills = document.getElementById('skills').value;
  const bio = document.getElementById('bio').value;

  // Save to localStorage (basic storage for now, backend comes later)
  const profile = { name, headline, skills, bio };
  localStorage.setItem('campusConnectProfile', JSON.stringify(profile));

  displayProfile(profile);
});

function displayProfile(profile) {
  document.getElementById('displayName').textContent = profile.name;
  document.getElementById('displayHeadline').textContent = profile.headline;
  document.getElementById('displaySkills').textContent = profile.skills;
  document.getElementById('displayBio').textContent = profile.bio;
  document.getElementById('profileDisplay').classList.remove('hidden');
}

// Load saved profile if it exists (on page refresh)
window.onload = function() {
  const saved = localStorage.getItem('campusConnectProfile');
  if (saved) {
    displayProfile(JSON.parse(saved));
  }
};
