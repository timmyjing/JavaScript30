const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.innerText = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() { 
  if (this.name === 'volume') {
    video.volume = this.value;
  } else {
    video.playbackRate = this.value;
  }
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth);
  video.currentTime = video.duration * scrubTime;
}

function startDrag() {
  progress.addEventListener('mousemove', scrub);
}

function removeDrag() {
  progress.removeEventListener('mousemove', scrub);
}

function updateProgress() {
  const time = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${time}%`;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
skipButtons.forEach(b => {
  b.addEventListener('click', skip);
});
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', startDrag);
progress.addEventListener('mouseup', removeDrag);

