document.addEventListener("DOMContentLoaded", function () {
    console.log("gallery.js loaded and running...");

    fetch('/getRecordings')
        .then(response => response.json())
        .then(recordings => {
            console.log("Fetched recordings:", recordings);

            const recordingsList = document.getElementById('recordingsList');
            if (!recordingsList) {
                console.error("Error: recordingsList element not found.");
                return;
            }

            recordingsList.innerHTML = "";

            if (recordings.length === 0) {
                console.log("No recordings found.");
                recordingsList.innerHTML = "<p>No recordings found.</p>";
                return;
            }

            recordings.forEach(recording => {
                console.log("Processing recording:", recording);

                const recordingItem = document.createElement('div');
                recordingItem.classList.add('recording-item');

                const title = recording[0].title;
                const user = recording[0].user;
                const duration = recording[0].duration;
                const bpm = recording[0].BPM;

                const recordingTitle = document.createElement('div');
                recordingTitle.classList.add('recording-title');
                recordingTitle.innerHTML = `
                    <strong>${title}</strong><br>
                    <span class="recording-user">by ${user}</span><br>
                    <span class="recording-info">Duration: ${duration}</span><br>
                    <span class="recording-info">BPM: ${bpm}</span>
                `;

                const playButton = document.createElement('button');
                playButton.textContent = "▶ Play";
                playButton.classList.add('play-button');
                playButton.addEventListener('click', () => {
                    console.log(`Play button clicked for recording:`, recording[0]);
                    // playRecording(recording); <-- You can enable this later
                });

                recordingItem.appendChild(recordingTitle);
                recordingItem.appendChild(playButton);
                recordingsList.appendChild(recordingItem);
            });

            console.log("Recordings successfully added to the DOM.");
        })
        .catch(error => console.error('Error fetching recordings:', error));
});
