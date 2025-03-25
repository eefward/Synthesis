const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');
let isMouseDown = false; // Track if mouse is pressed
let lastPlayedNote = null; // Track the last played note to avoid repetition
let lastPlayedTime = 0; // Store the time the last note was played
const cooldown = 100; // Cooldown in milliseconds (e.g., 100ms = 0.1s)
let recordingStartTime = null;
let isRecording = false;
let recordedNotes = [];

// ----------------------------------------------------------------- Key Pressing

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        if (recordingStartTime == null) {
            recordingStartTime = Date.now();
        }

        const elapsedTime = (Date.now() - recordingStartTime) / 1000; 
        playNoteWithEffect(key.dataset.note);
        recordedNotes.push({ note: key.dataset.note, time: elapsedTime }); 
        lastPlayedNote = key.dataset.note; 
        lastPlayedTime = elapsedTime; 

        keyClickEffect(key); // Darken the key on click
    });

    key.addEventListener('mouseenter', () => {
        if (recordingStartTime == null) {
            recordingStartTime = Date.now(); 
        }

        const currentTime = (Date.now() - recordingStartTime) / 1000; 
        if (isMouseDown && lastPlayedNote !== key.dataset.note && (currentTime - lastPlayedTime) >= cooldown) {
            playNoteWithEffect(key.dataset.note);
            recordedNotes.push({ note: key.dataset.note, time: currentTime }); 
            lastPlayedNote = key.dataset.note; 
            lastPlayedTime = currentTime; 

            keyClickEffect(key); // Darken the key when played via hover
        }
    });
});

document.addEventListener('mouseup', () => {
    isMouseDown = false; // Stop mouse dragging
    lastPlayedNote = null; // Reset the last played note when mouse is released
});

// Record Button

document.addEventListener('DOMContentLoaded', () => {
    const recordButton = document.getElementById('recordButton');

    recordButton.addEventListener('click', () => {
        isRecording = !isRecording;
        recordButton.textContent = isRecording ? 'Stop Recording' : 'Start Recording';

        if (isRecording) {
            recordedNotes = []; 
            recordingStartTime = Date.now(); 
            console.log("Recording started.");
        } else {
            sendRecordingToServer(); 
            console.log("Recording stopped. Notes:", recordedNotes);
        }
    });

    playButton.addEventListener('click', () => {
        if (recordedNotes.length === 0) {
            console.log("No recording to play.");
            return;
        }
        playRecording();
    });
});


