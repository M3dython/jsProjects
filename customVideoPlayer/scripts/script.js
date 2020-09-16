// get the elements by the element from the html tags and set them as constants in javascript

const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & pause Video

function toggleVideoStatus() {
  //javascript has the method video paused. if the video is paused make it play
  if (video.paused) {
    //javascript has the method video play. play the video
    video.play();
  } else {
    //javascript has the method video pause. pauses the video
    video.pause();
  }
}

// Update play/pause Icon
function updatePlayIcon() {
  if (video.paused) {
    //change the icon on the play button to the pause icon
    play.innerHTML = '<i class ="fa fa-play fa-2x"></i>';
    //change the icon on the play button to the play icon
  } else {
    play.innerHTML = '<i class ="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress() {
  //get the value from the progress input and makes it proportional to the video current time in %
  //javascript has the property video currentTime and duration
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes played with the currentTime property
  // Math.floor rounds a rational number to the lowest closest interger
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds played with the currentTime property
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  // the plus signs make sure that the input value is always a number
  //change the value of video.currentTime if click on the progress bar
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  //sets the current time of the video to zero then pauses it
  video.currentTime = 0;
  video.pause();
}

// Event Listener
//when click anywhere on the video, sets the function togglevideostatus
video.addEventListener('click', toggleVideoStatus);
// when click on the video change the icon to play if the video is paused --could implement the pause image--
video.addEventListener('pause', updatePlayIcon);
// when click on the video change the icon to pause if the video is playing
video.addEventListener('play', updatePlayIcon);
// update the timestamp accordingly with the time of video
video.addEventListener('timeupdate', updateProgress);

//when click on the play button change the icon to pause and play the video(can be a function)
play.addEventListener('click', toggleVideoStatus);

//when click resets the timestamp to 0, and pause the video on its start
stop.addEventListener('click', stopVideo);

//when clicked on progress bar, changes the timestamp proportionally
progress.addEventListener('change', setVideoProgress);
