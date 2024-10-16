<?php
// Database connection
$host = 'localhost';
$db = 'notifications_db';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Fetch notifications
$sql = "SELECT id, message, created_at FROM notifications ORDER BY created_at DESC LIMIT 10";
$result = $conn->query($sql);

$notifications = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }
}

$conn->close();

// Return notifications as JSON
header('Content-Type: application/json');
echo json_encode($notifications);
?>
