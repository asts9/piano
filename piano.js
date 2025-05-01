const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

let currentAudio = null; // Store the currently playing audio

function playNoteOnClick(e) {
  const key = e.target;
  const audio = document.querySelector(`audio[data-key="${key.getAttribute('data-key')}"]`);
  if (!audio) return;

  // Stop the currently playing audio if there is one
  if (currentAudio) {
    currentAudio.pause();   // Stop the currently playing audio
    currentAudio.currentTime = 0; // Reset the audio to the start
  }

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;  // Start the new audio from the beginning
  audio.play().catch((err) => console.log("Error playing audio:", err)); // Added error handling
  currentAudio = audio;  // Set the new audio as the current playing audio
}

function playNoteOnKeydown(e) {
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (!key || !audio) return;

  // Stop the currently playing audio if there is one
  if (currentAudio) {
    currentAudio.pause();   // Stop the currently playing audio
    currentAudio.currentTime = 0; // Reset the audio to the start
  }

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;  // Start the new audio from the beginning
  audio.play().catch((err) => console.log("Error playing audio:", err)); // Added error handling
  currentAudio = audio;  // Set the new audio as the current playing audio
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

// Add event listeners for keypress and mouse click
keys.forEach(key => key.addEventListener("click", playNoteOnClick));
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNoteOnKeydown);
