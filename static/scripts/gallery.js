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

                const recordingTitle = document.createElement('h3');

                //let myArray = [{name: 'apple', id: 1}, {name: 'banana', id: 2}];
                //let foundElement = myArray.find(element => element.name === 'banana');
                
                const title = recording[0].title;
                const user = recording[0].user;
                const duration = recording[0].duration;
                const bpm = recording[0].BPM;
                recordingTitle.textContent = `${title} by ${user}\nDuration: ${duration} BPM: ${bpm}`;

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
