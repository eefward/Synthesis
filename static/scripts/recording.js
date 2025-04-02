const recordBtn = document.getElementById('recordButton');
const playBtn = document.getElementById('playButton');
const saveBtn = document.getElementById('saveButton');

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
        console.log(recording);

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

    if (saveName === "") {
        saveStatus.textContent = "Please enter a save name.";
        return;
    }

    saveBtn.textContent = "Saving...";

    if (recording.length === 0) {
        saveStatus.textContent = "No recording to save.";
        saveBtn.textContent = "Save Recording";
    } else {
        try {
            sendRecordingToServer(saveName); 
            saveStatus.textContent = `Saved as: ${saveName}`;
        } catch (error) {
            saveStatus.textContent = "An error occurred while saving.";
        }
    }

    setTimeout(() => {
        saveBtn.textContent = "Save Recording";
    }, 2000);
});