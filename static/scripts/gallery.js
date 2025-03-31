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

            recordingsList.innerHTML = ""; // Clear previous content

            if (recordings.length === 0) {
                console.log("No recordings found.");
                recordingsList.innerHTML = "<p>No recordings found.</p>";
                return;
            }

            recordings.forEach(recording => {
                console.log("Processing recording:", recording);

                const recordingItem = document.createElement('div');
                recordingItem.classList.add('recording-item');

                const recordingTitle = document.createElement('h3');
                recordingTitle.textContent = `Recording ${recording[0]}`;

                const playButton = document.createElement('button');
                playButton.textContent = "▶ Play";
                playButton.classList.add('play-button');
                playButton.addEventListener('click', () => {
                    console.log(`Play button clicked for Recording ${recording[0]}`);
                });

                recordingItem.appendChild(recordingTitle);
                recordingItem.appendChild(playButton);
                recordingsList.appendChild(recordingItem);
            });

            console.log("Recordings successfully added to the DOM.");
        })
        .catch(error => console.error('Error fetching recordings:', error));
});
