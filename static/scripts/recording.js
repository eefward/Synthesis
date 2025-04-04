const recordBtn = document.getElementById('recordButton');
const playBtn = document.getElementById('playButton');
const saveBtn = document.getElementById('saveButton');
const saveNameInput = document.getElementById('saveName');

let recording = [];
let isRecording = false;

recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;

    if (isRecording) {
        recordBtn.className = 'btn btn-danger';
        recordBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        recording = [{ note: "N/A", time: Date.now(), duration: "N/A" }];
    } else {
        recording.push({ note: "N/A", time: Date.now() - recording[0].time, duration: "N/A"});
        recording[0].time = 0;

        recordBtn.className = 'btn btn-success';
        recordBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});


playBtn.addEventListener('click', () => {
    if (recording.length <= 2) {
        console.log("Record something!");
        return;
    } else playRecording(recording);
});

saveBtn.addEventListener("click", () => {
    const saveName = saveNameInput.value.trim();
    saveBtn.textContent = "Saving...";

    if (saveName === "") saveBtn.textContent = "No recording to save";
    else if (recording.length === 0) saveBtn.textContent = "No recording to save";
    else {
        try {
            recording.unshift({title: saveName, user: "bird", length: recording.length, BPM: 200}); // BPM and User have not been made or they did and idk where they are
            console.log(recording);
            sendRecordingToServer(); 
            saveBtn.textContent = `Saved as: ${saveName}`;
        } catch (error) {
            saveBtn.textContent = "An error occurred while saving";
        }
    }

    setTimeout(() => {
        saveBtn.textContent = "Save Recording";
    }, 2000);
});