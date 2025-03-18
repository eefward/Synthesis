const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');
let isMouseDown = false; // Track if mouse is pressed
let lastPlayedNote = null; // Track the last played note to avoid repetition
let lastPlayedTime = 0; // Store the time the last note was played
const cooldown = 100; // Cooldown in milliseconds (e.g., 100ms = 0.1s)

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        isMouseDown = true;
        playNoteWithEffect(key.dataset.note);
        lastPlayedNote = key.dataset.note; // Track the last played note
        lastPlayedTime = Date.now(); // Store the current time
    });

    key.addEventListener('mouseenter', () => {
        const currentTime = Date.now();
        if (isMouseDown && lastPlayedNote !== key.dataset.note && (currentTime - lastPlayedTime) >= cooldown) {
            // Only play the note if enough time has passed since the last note was played
            playNoteWithEffect(key.dataset.note);
            lastPlayedNote = key.dataset.note; // Update the last played note
            lastPlayedTime = currentTime; // Update the time the note was played
        }
    });
});

document.addEventListener('mouseup', () => {
    isMouseDown = false; // Stop mouse dragging
    lastPlayedNote = null; // Reset the last played note when mouse is released
});
