const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        let duration = Number(document.getElementById('duration').value);
        duration = isNaN(duration) || duration === 0 ? 5000 : duration;

        if (isRecording) recording.push({note: key.dataset.note, time: Date.now() - recording[0].time, duration: duration});
        playNote(key.dataset.note, duration);
        createNoteAnimation(key);
        pressedDownFX(key, 150); // second parameter is duration, good for key holding
    });
});