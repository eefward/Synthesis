const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');
let isMouseDown = false; // Track if mouse is pressed

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        isMouseDown = true;
        playNoteWithEffect(key.dataset.note);
    });

    key.addEventListener('mouseenter', () => {
        if (isMouseDown) {
            playNoteWithEffect(key.dataset.note);
        }
    });
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});
