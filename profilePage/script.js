document.addEventListener("DOMContentLoaded", function() {
    // Get modal element
    const modal = document.getElementById("editModal");
    const editButton = document.getElementById("editProfile");
    const closeButton = document.getElementById("closeModal");
    const form = document.getElementById("editForm");

    // Open modal on edit button click
    editButton.addEventListener("click", function() {
        modal.style.display = "block";
    });

    // Close modal when close button is clicked
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload
        // Gather data from the form
        const name = document.getElementById("name").value;
        const dob = document.getElementById("dob").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;

        // Update profile details
        document.querySelector(".profile-details p:nth-child(1)").innerHTML = `<i class="fa fa-user"></i> ${name}`;
        document.querySelector(".profile-details p:nth-child(2)").innerHTML = `<i class="fa fa-birthday-cake"></i> ${dob}`;
        document.querySelector(".profile-details p:nth-child(3)").innerHTML = `<i class="fa fa-phone"></i> ${phone}`;
        document.querySelector(".profile-details p:nth-child(4)").innerHTML = `<i class="fa fa-envelope"></i> ${email}`;

        // Close the modal
        modal.style.display = "none";
    });

    // Handle file input change
    const fileInput = document.getElementById("profile-pic");
    const profilePic = document.querySelector(".profile-pic");

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onload = function(e) {
                profilePic.src = e.target.result; // Set the profile picture source to the loaded file
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });

    document.getElementById('calendar').addEventListener('click', function() {
        window.location.href = '/SchedulePage/index.html';
      });
    
      document.getElementById('history').addEventListener('click', function() {
        window.location.href = '/mainMenuPage/index.html';
      });
    
      document.getElementById('add-schedule').addEventListener('click', function() {
        window.location.href = '/#/index.html';
      });
    
      document.getElementById('notifications').addEventListener('click', function() {
        window.location.href = '/notificationPage/notification.html';
      });
    
      document.getElementById('user').addEventListener('click', function() {
        window.location.href = '/profilePage/index.html';
      });

});
