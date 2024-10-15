document.addEventListener("DOMContentLoaded", () => {

    // Navbar scroll effect
    window.onscroll = function() {
        var navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };


    // Function to open/close the mobile nav menu
    function openNav() {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    // Nav-bar to Schedule
    document.getElementById('calendar').addEventListener('click', function() {
        window.location.href = '/SchedulePage/index.html';
    });

    // Nav-bar to history
    document.getElementById('history').addEventListener('click', function() {
        window.location.href = '/mainMenuPage/index.html';
    });

    // Nav-bar to Add
    document.getElementById('add-schedule').addEventListener('click', function() {
        window.location.href = '/#/index.html';  //takde lagi page
    });

    // Nav-bar to notfication
    document.getElementById('notifications').addEventListener('click', function() {
        window.location.href = '/#/index.html'; //takde lagi page
    });

    // Nav-bar to profile
    document.getElementById('user').addEventListener('click', function() {
        window.location.href = '/profilePage/index.html';
    });

});