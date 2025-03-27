const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');

let isRecording = false;
const ttlVal = Number(document.getElementById('ttl').value);
const ttl = isNaN(ttlVal) || ttlVal === 0 ? 1000 : ttlVal;

let recordingStartTime = null;
let recordedNotes = [];

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        if (recordingStartTime == null) {
            recordingStartTime = Date.now();
        }

        const elapsedTime = (Date.now() - recordingStartTime) / 1000; 
        recordedNotes.push({ note: key.dataset.note, time: elapsedTime }); 
        playNote(key, ttl, isRecording);
    });
});