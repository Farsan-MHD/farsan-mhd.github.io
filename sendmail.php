<?php
// Configure these values
$to      = "farsam.mhd.qa@gmail.com";   // 👈 Replace with your email address
$from    = "no-reply@farsan-mhd.github.io";  // 👈 Must be from your domain (avoid Gmail if possible)
$subject_prefix = "[Portfolio Contact]";

// Sanitize & validate input
function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = clean_input($_POST["name"] ?? "");
    $email   = clean_input($_POST["email"] ?? "");
    $subject = clean_input($_POST["subject"] ?? "");
    $message = clean_input($_POST["message"] ?? "");

    // Basic validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        die("All fields are required.");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    // Build email content
    $email_subject = $subject_prefix . " " . $subject;
    $email_body = "You have received a new message from your portfolio contact form:\n\n" .
                  "Name: $name\n" .
                  "Email: $email\n" .
                  "Subject: $subject\n\n" .
                  "Message:\n$message\n";

    // Email headers
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message sent successfully! ✅";
    } else {
        echo "Failed to send message. ❌ Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
