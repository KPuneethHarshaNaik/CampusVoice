document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
  
    // Mock data for recent complaints
    const complaints = [
      { id: 1, title: 'Broken AC', category: 'maintenance', status: 'pending', priority: 'high' },
      { id: 2, title: 'Grading Issue', category: 'academic', status: 'in-progress', priority: 'medium' },
      { id: 3, title: 'Registration Error', category: 'administrative', status: 'resolved', priority: 'low' }
    ];
  
    // Populate recent complaints
    const complaintsList = document.getElementById('recent-complaints');
    if (complaintsList) {
      complaints.forEach(complaint => {
        const complaintElement = document.createElement('div');
        complaintElement.className = 'complaint-item';
        complaintElement.innerHTML = `
          <div class="complaint-info">
            <h3>${complaint.title}</h3>
            <p>Category: ${complaint.category}</p>
            <p>Status: ${complaint.status}</p>
            <p>Priority: ${complaint.priority}</p>
          </div>
        `;
        complaintsList.appendChild(complaintElement);
      });
    }
  
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
      logoutBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        alert('Logged out successfully');
        window.location.href = '/login.html'; // Redirect to login page
      }, 200);
    });
  
    // Navigation transitions
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        item.style.transform = 'scale(0.95)';
        const mainContent = document.querySelector('.main-content');
        mainContent.style.opacity = '0';
        setTimeout(() => {
          window.location.href = item.getAttribute('href');
        }, 300);
      });
    });
  
    // Form submission for new complaint
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
      complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = complaintForm.querySelector('.button-primary');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          const formData = new FormData(complaintForm);
          const complaintData = Object.fromEntries(formData);
          console.log('New Complaint:', complaintData);
          alert('Complaint submitted successfully!');
          complaintForm.reset();
          submitBtn.style.transform = 'scale(1)';
        }, 200);
      });
    }
  
    // Settings forms
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = profileForm.querySelector('.button-primary');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          const formData = new FormData(profileForm);
          const profileData = Object.fromEntries(formData);
          console.log('Profile Update:', profileData);
          alert('Profile updated successfully!');
          submitBtn.style.transform = 'scale(1)';
        }, 200);
      });
    }
  
    const notificationForm = document.getElementById('notificationForm');
    if (notificationForm) {
      notificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = notificationForm.querySelector('.button-primary');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          const formData = new FormData(notificationForm);
          const notificationData = Object.fromEntries(formData);
          console.log('Notification Preferences:', notificationData);
          alert('Notification preferences updated!');
          submitBtn.style.transform = 'scale(1)';
        }, 200);
      });
    }
  
    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
      securityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = securityForm.querySelector('.button-primary');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          const formData = new FormData(securityForm);
          const securityData = Object.fromEntries(formData);
          if (securityData.newPassword === securityData.confirmPassword) {
            console.log('Password Change:', securityData);
            alert('Password changed successfully!');
            securityForm.reset();
          } else {
            alert('Passwords do not match!');
          }
          submitBtn.style.transform = 'scale(1)';
        }, 200);
      });
    }
  });
  const form = document.querySelector('.settings-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Settings saved successfully!');
});
// app.js
const db = firebase.firestore();

function updateDashboardCounts() {
  db.collection("complaints").get().then(snapshot => {
    const complaints = snapshot.docs.map(doc => doc.data());

    let total = complaints.length;
    let pending = 0;
    let resolved = 0;
    let urgent = 0;

    complaints.forEach(c => {
      if (c.status === 'pending') pending++;
      else if (c.status === 'resolved') resolved++;
      if (c.isUrgent) urgent++;
    });

    document.getElementById("total-complaints").textContent = total;
    document.getElementById("pending-count").textContent = pending;
    document.getElementById("resolved-count").textContent = resolved;
    document.getElementById("urgent-count").textContent = urgent;

    // Show latest 5 complaints
    const recentContainer = document.getElementById("recent-complaints");
    recentContainer.innerHTML = "";
    complaints.slice(0, 5).forEach(c => {
      const div = document.createElement("div");
      div.classList.add("complaint-entry");
      div.innerHTML = `<strong>${c.category}</strong><br><small>${c.timestamp}</small><p>${c.details.slice(0, 80)}...</p>`;
      recentContainer.appendChild(div);
    });
  }).catch(err => {
    console.error("Error fetching complaints:", err);
  });
}

document.addEventListener("DOMContentLoaded", updateDashboardCounts);
