const recordBtn = document.getElementById('recordButton');
const playBtn = document.getElementById('playButton');
const saveBtn = document.getElementById('saveButton');

recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;

    if (isRecording) {
        recordBtn.className = 'btn btn-danger';
        recordBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        startTime = Date.now();
        recording = [];

        recording.push({ note: "N/A", time: 0, duration: "N/A" });

    } else {
        let elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
        let lastNoteTime = recording[recording.length - 1].time;
        let duration = (elapsedTime - lastNoteTime).toFixed(2);

        recording.push({ note: "N/A", time: elapsedTime.toFixed(2), duration: duration });
        console.log(recording);

        recordBtn.className = 'btn btn-success';
        recordBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});


playBtn.addEventListener('click', () => {
    if (recording.length <= 1) {
        console.log("Record something!");
        return;
    } else playRecording();
});

saveBtn.addEventListener('click', () => {
    sendRecordingToServer();
});
