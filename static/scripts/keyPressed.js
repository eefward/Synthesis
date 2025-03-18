const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo')
let isMouseDown = false;
let lastPlayedTime = 0;
const cooldown = 20; // Cooldown in milliseconds

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        isMouseDown = true;
        playNoteWithEffect(key.dataset.note);
        lastPlayedTime = Date.now();
    });

    key.addEventListener('mouseenter', () => {
        if (isMouseDown && Date.now() - lastPlayedTime >= cooldown) {
            playNoteWithEffect(key.dataset.note);
            lastPlayedTime = Date.now();
        }
    });
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});
