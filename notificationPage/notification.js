document.addEventListener("DOMContentLoaded", () => {
    const notificationList = document.getElementById('notification-list');

    // Function to fetch and display notifications
    function fetchNotifications() {
        fetch('get_notifications.php')
            .then(response => response.json())
            .then(data => {
                // Clear the list
                notificationList.innerHTML = '';

                // Add each notification to the list
                data.forEach(notification => {
                    const notificationItem = document.createElement('div');
                    notificationItem.classList.add('notification-item');

                    notificationItem.innerHTML = `
                        <p>${notification.message}</p>
                        <time>${new Date(notification.created_at).toLocaleString()}</time>
                    `;

                    notificationList.appendChild(notificationItem);
                });
            })
            .catch(error => console.error('Error fetching notifications:', error));
    }

    // Fetch notifications every 5 seconds
    setInterval(fetchNotifications, 5000);

    // Initial fetch
    fetchNotifications();
});
