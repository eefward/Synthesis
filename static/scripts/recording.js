const recordBtn = document.getElementById('recordButton');
const playBtn = document.getElementById('playButton');
let startTime = 0;

recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;

    if (isRecording) {
        recordBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        recording = [];
        startTime = Date.now();
        console.log(startTime);
    } else {
        console.log(Date.now() - startTime);
        console.log(recording);
        normalizeRecording();
        recordBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    }    
});

playBtn.addEventListener('click', () => {
    if (recording.length === 0) {
        console.log("Record something!");
        return;
    }
    
    trimBeginningAndEnding(recording);

    playRecording(recording);
});