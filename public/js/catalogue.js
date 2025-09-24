// Sample data for IT & Management colleges in India
// In real scenario, this data would come from a backend or API
const colleges = [
  {
    name: "Indian Institute of Management Ahmedabad",
    city: "Ahmedabad",
    contact: "+91 79 6632 4400",
    courses: ["Management", "Business Analytics", "Economics"]
  },
  {
    name: "Birla Institute of Technology and Science, Pilani",
    city: "Pilani",
    contact: "+91 1596 515055",
    courses: ["IT", "Management", "Engineering"]
  },
  {
    name: "National Institute of Technology, Trichy",
    city: "Tiruchirappalli",
    contact: "+91 431 250 3000",
    courses: ["IT", "Management", "Computer Science"]
  },
  {
    name: "Symbiosis Institute of Business Management",
    city: "Pune",
    contact: "+91 20 2811 0600",
    courses: ["Management", "Marketing", "Finance"]
  },
  {
    name: "Vellore Institute of Technology",
    city: "Vellore",
    contact: "+91 416 224 3091",
    courses: ["IT", "Management", "Computer Science"]
  },
  {
    name: "Indian Institute of Information Technology, Hyderabad",
    city: "Hyderabad",
    contact: "+91 40 2301 6000",
    courses: ["IT", "Computer Science"]
  },
  {
    name: "XLRI - Xavier School of Management",
    city: "Jamshedpur",
    contact: "+91 657 665 3201",
    courses: ["Management", "Human Resource Management"]
  },
  {
    name: "Institute of Management Technology, Ghaziabad",
    city: "Ghaziabad",
    contact: "+91 120 306 4600",
    courses: ["Management", "IT", "Business Analytics"]
  },
  {
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    contact: "+91 22 2572 2545",
    courses: ["IT", "Computer Science", "Management"]
  },
  {
    name: "Indian School of Business",
    city: "Hyderabad",
    contact: "+91 40 2318 7700",
    courses: ["Management", "Business Analytics"]
  },
  {
    name: "SP Jain Institute of Management and Research",
    city: "Mumbai",
    contact: "+91 22 2623 7454",
    courses: ["Management", "Finance", "Marketing"]
  },
  {
    name: "Jamnalal Bajaj Institute of Management Studies",
    city: "Mumbai",
    contact: "+91 22 2202 4133",
    courses: ["Management", "Human Resource Management"]
  }
];

// DOM references
const collegeListEl = document.getElementById('collegeList');
const searchNameEl = document.getElementById('searchName');
const searchCityEl = document.getElementById('searchCity');
const filterCourseEl = document.getElementById('filterCourse');

// Extract unique courses for filter dropdown
function getUniqueCourses(data) {
  const courseSet = new Set();
  data.forEach(college => {
    college.courses.forEach(course => courseSet.add(course));
  });
  return Array.from(courseSet).sort();
}

// Populate course filter dropdown
function populateCourseFilter() {
  const courses = getUniqueCourses(colleges);
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    filterCourseEl.appendChild(option);
  });
}

// Render colleges list based on filtered data
const SAVED_KEY = 'educompass_saved_colleges';

function loadSaved() {
  const raw = localStorage.getItem(SAVED_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveSaved(list) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
}

function isSaved(collegeName) {
  const saved = loadSaved();
  return saved.includes(collegeName);
}

function toggleSave(collegeName) {
  const saved = loadSaved();
  const idx = saved.indexOf(collegeName);
  if (idx >= 0) {
    saved.splice(idx, 1);
  } else {
    saved.push(collegeName);
  }
  saveSaved(saved);
}

function renderColleges(data) {
  collegeListEl.innerHTML = '';
  if (data.length === 0) {
    collegeListEl.innerHTML = '<li>No colleges found matching your criteria.</li>';
    return;
  }
  data.forEach(college => {
    const li = document.createElement('li');
    li.className = 'college-card';
    li.innerHTML = `
      <h2 class="college-name">${college.name}</h2>
      <button class="save-btn" aria-label="Save ${college.name}" data-college="${college.name}">${isSaved(college.name) ? '✓' : '★'}</button>
      <p class="college-info"><strong>City:</strong> ${college.city}</p>
      <p class="college-info"><strong>Contact:</strong> <a href="tel:${college.contact.replace(/\s+/g, '')}">${college.contact}</a></p>
      <p class="college-info"><strong>Courses Offered:</strong></p>
      <ul class="courses-list">${college.courses.map(c => `<li>${c}</li>`).join('')}</ul>
    `;
    collegeListEl.appendChild(li);
  });

  // Attach save handlers
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const name = e.currentTarget.getAttribute('data-college');
      toggleSave(name);
      // Re-render to reflect state
      filterColleges();
    });
  });
}

// Filter colleges based on search inputs
function filterColleges() {
  const nameQuery = searchNameEl.value.trim().toLowerCase();
  const cityQuery = searchCityEl.value.trim().toLowerCase();
  const courseFilter = filterCourseEl.value;

  const filtered = colleges.filter(college => {
    const matchesName = college.name.toLowerCase().includes(nameQuery);
    const matchesCity = college.city.toLowerCase().includes(cityQuery);
    const matchesCourse = courseFilter === '' || college.courses.includes(courseFilter);
    return matchesName && matchesCity && matchesCourse;
  });
  renderColleges(filtered);
}

// Initialize app
function initCatalogue() {
  populateCourseFilter();
  renderColleges(colleges);

  // Event listeners for search inputs
  searchNameEl.addEventListener('input', filterColleges);
  searchCityEl.addEventListener('input', filterColleges);
  filterCourseEl.addEventListener('change', filterColleges);
}

// Menu toggle logic
function setupMenuToggle() {
  const toggleButton = document.getElementById('menuToggle');
  const navMenu = document.getElementById('catalogueNav');
  if (!toggleButton || !navMenu) return;

  function closeMenuOnOutsideClick(event) {
    if (!navMenu.contains(event.target) && event.target !== toggleButton) {
      navMenu.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  }

  toggleButton.addEventListener('click', function() {
    const isOpen = navMenu.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', closeMenuOnOutsideClick), 0);
    }
  });

  // Close the menu when a link is clicked
  navMenu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      navMenu.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  });
}

function initCataloguePage() {
  initCatalogue();
  setupMenuToggle();
  setupViewRouting();
}

// Run init on page load
window.addEventListener('DOMContentLoaded', initCataloguePage);

// Views and routing
function setupViewRouting() {
  const nav = document.getElementById('catalogueNav');
  if (!nav) return;
  nav.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-view]');
    if (!link) return;
    e.preventDefault();
    const view = link.getAttribute('data-view');
    showView(view);
  });
}

function showView(view) {
  const mapping = {
    catalogue: 'view-catalogue',
    saved: 'view-saved',
    profile: 'view-profile',
    settings: 'view-settings',
    help: 'view-help'
  };
  Object.values(mapping).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const targetId = mapping[view] || mapping.catalogue;
  const target = document.getElementById(targetId);
  if (target) target.style.display = '';
  
  if (view === 'saved') {
    renderSaved();
  } else if (view === 'help') {
    // Initialize FAQ functionality when help view is shown
    setTimeout(setupFAQ, 50); // Small delay to ensure DOM is ready
  }
}

function renderSaved() {
  const savedListEl = document.getElementById('savedList');
  if (!savedListEl) return;
  const savedNames = loadSaved();
  const savedColleges = colleges.filter(c => savedNames.includes(c.name));
  savedListEl.innerHTML = '';
  if (savedColleges.length === 0) {
    savedListEl.innerHTML = '<li>No saved colleges yet.</li>';
    return;
  }
  savedColleges.forEach(college => {
    const li = document.createElement('li');
    li.className = 'college-card';
    li.innerHTML = `
      <h2 class="college-name">${college.name}</h2>
      <button class="save-btn saved" aria-label="Unsave ${college.name}" data-college="${college.name}">✓</button>
      <p class="college-info"><strong>City:</strong> ${college.city}</p>
      <p class="college-info"><strong>Contact:</strong> <a href="tel:${college.contact.replace(/\s+/g, '')}">${college.contact}</a></p>
      <p class="college-info"><strong>Courses Offered:</strong></p>
      <ul class="courses-list">${college.courses.map(c => `<li>${c}</li>`).join('')}</ul>
    `;
    savedListEl.appendChild(li);
  });

  savedListEl.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const name = e.currentTarget.getAttribute('data-college');
      toggleSave(name);
      renderSaved();
    });
  });
}

// FAQ functionality
function setupFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // If this item wasn't active, open it
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

// Profile Management Functions
let editingFields = new Set();
let originalValues = {};

// Toggle edit mode for a field
function toggleEdit(fieldId) {
  const input = document.getElementById(fieldId);
  const editBtn = input.parentElement.querySelector('.edit-btn');
  const saveBtn = document.getElementById('saveChanges');
  const cancelBtn = document.getElementById('cancelChanges');
  
  if (input.readOnly) {
    // Enter edit mode
    originalValues[fieldId] = input.value;
    input.readOnly = false;
    input.focus();
    editBtn.innerHTML = '<span class="edit-icon">✓</span>';
    editBtn.classList.add('editing');
    editBtn.setAttribute('aria-label', 'Confirm edit');
    editingFields.add(fieldId);
    
    // Show action buttons
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
  } else {
    // Confirm single field edit
    input.readOnly = true;
    editBtn.innerHTML = '<span class="edit-icon">✏️</span>';
    editBtn.classList.remove('editing');
    editBtn.setAttribute('aria-label', 'Edit ' + fieldId.replace('profile', '').toLowerCase());
    editingFields.delete(fieldId);
    delete originalValues[fieldId];
    
    // Hide action buttons if no fields are being edited
    if (editingFields.size === 0) {
      saveBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
    }
    
    // Show success message for single field update
    showNotification('Field updated successfully!', 'success');
  }
}

// Save all profile changes
function saveProfileChanges() {
  const form = document.getElementById('profileForm');
  const formData = new FormData(form);
  
  // Simulate API call to save profile data
  // In a real application, this would send data to your backend
  console.log('Saving profile data:', Object.fromEntries(formData));
  
  // Reset all editing fields
  editingFields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    const editBtn = input.parentElement.querySelector('.edit-btn');
    
    input.readOnly = true;
    editBtn.innerHTML = '<span class="edit-icon">✏️</span>';
    editBtn.classList.remove('editing');
    editBtn.setAttribute('aria-label', 'Edit ' + fieldId.replace('profile', '').toLowerCase());
  });
  
  editingFields.clear();
  originalValues = {};
  
  // Hide action buttons
  document.getElementById('saveChanges').style.display = 'none';
  document.getElementById('cancelChanges').style.display = 'none';
  
  // Show success message
  showNotification('Profile updated successfully!', 'success');
}

// Cancel profile edit
function cancelProfileEdit() {
  // Restore original values
  editingFields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    const editBtn = input.parentElement.querySelector('.edit-btn');
    
    input.value = originalValues[fieldId];
    input.readOnly = true;
    editBtn.innerHTML = '<span class="edit-icon">✏️</span>';
    editBtn.classList.remove('editing');
    editBtn.setAttribute('aria-label', 'Edit ' + fieldId.replace('profile', '').toLowerCase());
  });
  
  editingFields.clear();
  originalValues = {};
  
  // Hide action buttons
  document.getElementById('saveChanges').style.display = 'none';
  document.getElementById('cancelChanges').style.display = 'none';
  
  showNotification('Changes cancelled', 'info');
}

// Handle profile image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    showNotification('Please select a valid image file', 'error');
    return;
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification('Image size should be less than 5MB', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const profileImage = document.getElementById('profileImage');
    const removeBtn = document.getElementById('removeImageBtn');
    
    profileImage.src = e.target.result;
    removeBtn.style.display = 'inline-block';
    
    showNotification('Profile image updated!', 'success');
  };
  
  reader.readAsDataURL(file);
}

// Remove profile image
function removeProfileImage() {
  const profileImage = document.getElementById('profileImage');
  const removeBtn = document.getElementById('removeImageBtn');
  
  // Reset to default avatar
  profileImage.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
  removeBtn.style.display = 'none';
  
  // Clear file input
  document.getElementById('imageInput').value = '';
  
  showNotification('Profile image removed', 'info');
}

// Account settings functions
function changePassword() {
  // In a real application, this would open a password change modal/page
  showNotification('Password change functionality would be implemented here', 'info');
}

function exportData() {
  // In a real application, this would export user data
  const userData = {
    name: document.getElementById('profileName').value,
    email: document.getElementById('profileEmail').value,
    age: document.getElementById('profileAge').value,
    phone: document.getElementById('profilePhone').value,
    city: document.getElementById('profileCity').value,
    interests: document.getElementById('profileInterests').value,
    savedColleges: loadSaved()
  };
  
  const dataBlob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'educompass-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Data exported successfully!', 'success');
}

function deleteAccount() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      // In a real application, this would call an API to delete the account
      showNotification('Account deletion would be processed here', 'error');
    }
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    max-width: 300px;
    word-wrap: break-word;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  // Set background color based on type
  switch (type) {
    case 'success':
      notification.style.background = '#28a745';
      break;
    case 'error':
      notification.style.background = '#dc3545';
      break;
    case 'info':
    default:
      notification.style.background = '#004aad';
      break;
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}


