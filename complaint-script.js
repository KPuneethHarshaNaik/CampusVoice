const questionsMap = {
    academic: ["Which course is affected?", "What is the faculty name?", "What is the issue faced?"],
    admin: ["Which department?", "What is the nature of the issue?", "Is this urgent?"],
    infrastructure: ["What area is affected?", "Is this a recurring issue?", "Upload evidence (if any)"],
    hostel: ["Hostel name/block?", "Mess-related?", "Time of incident?"],
    technical: ["System/Website involved?", "Error message seen?", "Have you tried troubleshooting?"],
    behavior: ["Who was involved?", "What behavior did you notice?", "Was it reported earlier?"],
    transport: ["Bus number/Route?", "Driver name (if known)?", "What occurred?"],
    placement: ["Company/Event?", "Type of concern?", "Relevant coordinator name?"],
    event: ["Club/Event name?", "Date of incident?", "Issue faced?"],
  };
  
  document.getElementById("category").addEventListener("change", function () {
    const value = this.value;
    const container = document.getElementById("questions-container");
    container.innerHTML = "";
  
    if (questionsMap[value]) {
      questionsMap[value].forEach((q) => {
        const label = document.createElement("label");
        label.textContent = q;
  
        const input = document.createElement("textarea");
        input.rows = 2;
        input.placeholder = q;
        input.classList.add("input-box");
  
        container.appendChild(label);
        container.appendChild(input);
      });
    }
  });
  
  document.getElementById("submitBtn").addEventListener("click", () => {
    alert("Complaint submitted successfully!");
    // You can replace this with actual saving to Firebase or a database
  });
  // complaint-script.js

const submitBtn = document.getElementById('submitBtn');
const category = document.getElementById('category');
const details = document.getElementById('details');

submitBtn.addEventListener('click', () => {
  const selectedCategory = category.value;
  const detailedText = details.value.trim();

  if (!selectedCategory || !detailedText) {
    alert('Please select a category and write the details.');
    return;
  }

  const complaint = {
    category: selectedCategory,
    details: detailedText,
    timestamp: new Date().toLocaleString()
  };

  const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
  complaints.push(complaint);
  localStorage.setItem('complaints', JSON.stringify(complaints));

  // Clear form
  category.value = '';
  details.value = '';

  alert('Complaint submitted successfully!');
  
});
