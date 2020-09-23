const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01  ${currentYear + 1} 00:00:00`);

//Set background year
year.innerText = currentYear + 1;

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutesLeft = Math.floor(diff / 1000 / 60) % 60;
  const secondsLeft = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerHTML = daysLeft;
  hours.innerHTML = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
  minutes.innerHTML = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
  seconds.innerHTML = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
}

//Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

//Run every second
setInterval(updateCountdown, 1000);
