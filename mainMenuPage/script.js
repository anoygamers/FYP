document.addEventListener("DOMContentLoaded", () => {
  const conditionElement = document.querySelector(".condition h1");
  const navbar = document.querySelector(".navbar");
  let circularProgress = document.querySelector(".circular-progress"),
      progressValue = document.querySelector(".progress-value");
  let progressStartValue = 0,
      progressEndValue = 70,
      speed = 100;
  
  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`

    // Update condition based on progressStartValue
    setGaugeValue(null, progressStartValue / 100);

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
  
  function setGaugeValue(gauge, value) {
    if (value < 0 || value > 1) return;
    if (gauge) {
      gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
      gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)} / 100`;
    }
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

  window.addEventListener('scroll', () => {
    const mainContainer = document.querySelector('.maincontainer');
    const mainContainerRect = mainContainer.getBoundingClientRect();
    const navbarHeight = navbar.offsetHeight;
    if (mainContainerRect.bottom <= window.innerHeight) {
      navbar.style.transform = `translateY(${mainContainerRect.bottom - window.innerHeight}px)`;
    } else {
      navbar.style.transform = 'translateY(0)';
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
