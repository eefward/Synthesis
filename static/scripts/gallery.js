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
                recordingsList.innerHTML = "<p>No recordings found.</p>";
                return;
            }

            recordings.forEach(recording => {
                const { title, user, duration, BPM } = recording;

                // Create container
                const recordingItem = document.createElement('div');
                recordingItem.classList.add('recording-item');

                // Create title element
                const recordingTitle = document.createElement('h3');
                recordingTitle.innerHTML = `
                    <strong>${title}</strong><br>
                    <small>by ${user}</small><br>
                    <small>Duration: ${duration}</small><br>
                    <small>BPM: ${BPM}</small>
                `;

                // Play button
                const playButton = document.createElement('button');
                playButton.textContent = "▶ Play";
                playButton.classList.add('play-button');
                playButton.addEventListener('click', () => {
                    console.log(`Play button clicked for "${title}"`);
                    // TODO: implement playRecording(recording.recording) if desired
                });

                // Add elements to DOM
                recordingItem.appendChild(recordingTitle);
                recordingItem.appendChild(playButton);
                recordingsList.appendChild(recordingItem);
            });

            console.log("Recordings successfully added to the DOM.");
        })
        .catch(error => {
            console.error('Error fetching recordings:', error);
            const recordingsList = document.getElementById('recordingsList');
            if (recordingsList) {
                recordingsList.innerHTML = "<p>Error loading recordings.</p>";
            }
        });
});
