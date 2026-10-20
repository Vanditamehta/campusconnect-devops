document.getElementById('profileForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const headline = document.getElementById('headline').value;
  const skills = document.getElementById('skills').value;
  const bio = document.getElementById('bio').value;

  const profile = { name, headline, skills, bio };

  // Send to backend API to save in the database
  fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  })
  .then(res => res.json())
  .then(data => {
    displayProfile(profile);
  })
  .catch(err => {
    console.error('Error saving profile:', err);
  });
});

function displayProfile(profile) {
  document.getElementById('displayName').textContent = profile.name;
  document.getElementById('displayHeadline').textContent = profile.headline;
  document.getElementById('displaySkills').textContent = profile.skills;
  document.getElementById('displayBio').textContent = profile.bio;
  document.getElementById('profileDisplay').classList.remove('hidden');
}
