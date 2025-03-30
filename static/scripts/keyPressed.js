const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');

const ttlVal = Number(document.getElementById('ttl').value);
const ttl = isNaN(ttlVal) || ttlVal === 0 ? 1000 : ttlVal;

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        if (isRecording) recording.push({note: key.dataset.note, time: Date.now() - recording[0].time, duration: 5});
        playNote(key.dataset.note, 5000);
        createNoteAnimation(key);
        pressedDownFX(key, 150); // second parameter is duration, good for key holding
    });
});