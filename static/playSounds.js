const keys = document.querySelectorAll('.key');
const information = document.getElementById('information');

let isMouseDown = false; // Track if mouse is pressed

keys.forEach(key => {
    // When mouse is pressed down, play the sound and start tracking movement
    key.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        playNote(key);
    });

    // When mouse moves over a key while pressed, play the sound
    key.addEventListener('mouseenter', (event) => {
        if (isMouseDown) {
            playNote(key);
        }
    });
});

// Stop tracking when mouse is released
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Function to play the note
function playNote(key) {
    information.innerText = `You pressed ${key.dataset.note}`;
    
    // Encode URL to handle '#' properly
    const audio = new Audio(`/static/sounds/${encodeURIComponent(key.dataset.note)}.mp3`);
    audio.play();
}
