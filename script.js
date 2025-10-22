// Firebase Config & Initialization
const firebaseConfig = {
  apiKey: "AIzaSyA1KquBqYf7meGJObZ89Zv4oY4fuWgHayw",
  authDomain: "collegeportal-f7be4.firebaseapp.com",
  projectId: "collegeportal-f7be4",
  storageBucket: "collegeportal-f7be4.appspot.com",
  messagingSenderId: "292197106964",
  appId: "1:292197106964:web:52df164c9f5796595dee01"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Switch between Login and Create Account forms
function switchForm(formType) {
  const studentLoginForm = document.getElementById('student-login-form');
  const createAccountForm = document.getElementById('create-account-form');
  const toCreateAccountSwitch = document.getElementById('to-create-account');
  const toStudentLoginSwitch = document.getElementById('to-student-login');
  
  if (formType === 'student-login') {
    studentLoginForm.classList.add('active');
    createAccountForm.classList.remove('active');
    toCreateAccountSwitch.classList.add('active');
    toStudentLoginSwitch.classList.remove('active');
  } else {
    studentLoginForm.classList.remove('active');
    createAccountForm.classList.add('active');
    toCreateAccountSwitch.classList.remove('active');
    toStudentLoginSwitch.classList.add('active');
  }
}

// Create Account button click
document.querySelector('#create-account-form button').addEventListener('click', () => {
  const name = document.getElementById('create-name').value.trim();
  const email = document.getElementById('create-email').value.trim();
  const password = document.getElementById('create-password').value.trim();

  if (email && password && name) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save additional student data (like name) to Firestore
        return db.collection('students').doc(user.uid).set({
          name: name,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        alert('Account created successfully! You can now login.');
        switchForm('student-login');
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  } else {
    alert('Please fill all fields.');
  }
});

// Student Login button click
document.querySelector('#student-login-form button').addEventListener('click', () => {
  const email = document.getElementById('student-email').value.trim();
  const password = document.getElementById('student-password').value.trim();

  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // After successful login, fetch student's name
        return db.collection('students').doc(user.uid).get();
      })
      .then((doc) => {
        if (doc.exists) {
          const studentName = doc.data().name;
          localStorage.setItem('studentName', studentName);
          window.location.href = "dashboard.html"; // Go to dashboard
        } else {
          console.error("No student data found.");
          alert("Error: No student data found.");
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  } else {
    alert('Please fill all fields.');
  }
});

// Admin login (hardcoded admin logic)
document.querySelector('#admin-login-form button').addEventListener('click', () => {
  const adminID = document.getElementById('admin-id').value.trim();
  const adminPass = document.getElementById('admin-password').value.trim();

  if (adminID === "admin" && adminPass === "admin123") {
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid Admin Credentials");
  }
});
