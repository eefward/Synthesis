const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        const ttlVal = Number(document.getElementById('duration').value);
        const ttl = isNaN(ttlVal) || ttlVal === 0 ? 5000 : ttlVal;

        if (isRecording) recording.push({note: key.dataset.note, time: Date.now() - recording[0].time, duration: ttl});
        playNote(key.dataset.note, ttl);
        createNoteAnimation(key);
    });
});