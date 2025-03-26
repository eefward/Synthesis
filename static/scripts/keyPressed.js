const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');

let isRecording = false;
const ttlVal = Number(document.getElementById('ttl').value);
const ttl = isNaN(ttlVal) || ttlVal === 0 ? 1000 : ttlVal;

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        playNote(key, ttl, isRecording);
    });
});