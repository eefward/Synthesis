const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');

const ttlVal = Number(document.getElementById('ttl').value);
const ttl = isNaN(ttlVal) || ttlVal === 0 ? 1000 : ttlVal;

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        playNote(key.dataset.note, 5000);
        createNoteAnimation(key);
    });
});