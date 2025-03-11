const keys = document.querySelectorAll('.key');
const information = document.getElementById('information');
let isMouseDown = false; // Track if mouse is pressed

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        isMouseDown = true;
        playNoteWithEffect(key);
    });

    key.addEventListener('mouseenter', () => {
        if (isMouseDown) {
            playNoteWithEffect(key);
        }
    });
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// POV: WaitForChild() !?
document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById('toggle-info');
    const debounce = 300; // or cooldown

    let isVisible = true;

    toggleButton.addEventListener('click', () => {
        toggleInfoBox(isVisible, debounce); // Call the function from the new file

        isVisible = !isVisible;
    });
});

function playNoteWithEffect(key) {
    information.innerText = `You pressed ${key.dataset.note}`;
    
    // Play sound
    const audio = new Audio(`/static/sounds/${encodeURIComponent(key.dataset.note)}.mp3`);
    audio.play();

    // Call the visual effect function from the new file
    createSlideEffect(key); 
}
