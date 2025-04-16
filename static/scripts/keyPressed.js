const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');
const duration = document.getElementById('duration');

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        let time = Number(duration.value);
        time = isNaN(time) || time <= 0 ? 99999 : time;

        if (isRecording) recording.push({note: key.dataset.note, time: Date.now() - recording[0].time, duration: duration});
        playNote(key.dataset.note, time);
        createNoteAnimation(key);
    });
});