document.addEventListener("DOMContentLoaded", () => {
  const gaugeElement = document.querySelector(".gauge");
  const conditionElement = document.querySelector(".condition h1");
  const navbar = document.querySelector(".navbar"); // Pastikan navbar didefinisikan di sini

  function setGaugeValue(gauge, value) {
    if (value < 0 || value > 1) return;
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)} / 100`;

    // Update condition text based on the value
    if (value == 0) {
      conditionElement.textContent = "💀";

    } else if (value >= 0.7) {
      conditionElement.textContent = "Very Good";
      conditionElement.classList.remove("bad");
      conditionElement.classList.add("good");

    } else if (value >= 0.5) {
      conditionElement.textContent = "Good";
      conditionElement.classList.remove("bad");
      conditionElement.classList.add("good");

    } else {
      conditionElement.textContent = "Bad";
      conditionElement.classList.remove("good");
      conditionElement.classList.add("bad");
    }
  }

  // Example value
  setGaugeValue(gaugeElement, 0.1); // Set this to the student's score percentage (0.2 means 20%)

  window.addEventListener('scroll', () => {
    const mainContainer = document.querySelector('.maincontainer');
    const mainContainerRect = mainContainer.getBoundingClientRect();
    const navbarHeight = navbar.offsetHeight;

    // Semak jika navbar telah mencapai penghujung halaman
    if (mainContainerRect.bottom <= window.innerHeight) {
        navbar.style.transform = `translateY(${mainContainerRect.bottom - window.innerHeight}px)`;
    } else {
        navbar.style.transform = 'translateY(0)'; // Kembali ke kedudukan asal
    }
});

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
