<?php
// Include the database connection file
include 'db_connection.php'; // Make sure this file exists and contains your database connection

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Get the form data
  $category = $_POST['category'];
  $details = $_POST['details'];
  $timestamp = date("Y-m-d H:i:s"); // Current date and time
  $status = 'pending'; // Default status
  $isUrgent = 0; // Default urgency is 0 (not urgent)

  // Check if the form fields are empty
  if (empty($category) || empty($details)) {
    echo "Please fill all fields.";
    exit();
  }

  // Prepare the SQL query to insert the complaint data into the database
  $sql = "INSERT INTO complaints (category, details, timestamp, status, isUrgent) 
          VALUES ('$category', '$details', '$timestamp', '$status', '$isUrgent')";

  // Execute the query and check if the insert was successful
  if ($conn->query($sql) === TRUE) {
    echo "Complaint submitted successfully.";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  // Close the database connection
  $conn->close();
}
?>
