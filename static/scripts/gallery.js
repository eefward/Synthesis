document.addEventListener("DOMContentLoaded", function () {
    const openGalleryBtn = document.getElementById('openGalleryBtn');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const closeGalleryBtn = document.getElementById('closeGalleryBtn');
    
    openGalleryBtn.addEventListener('click', function() {
        galleryOverlay.style.display = 'flex';  
        loadGallery();
    });

    closeGalleryBtn.addEventListener('click', function() {
        galleryOverlay.style.display = 'none';
    });

    function loadGallery() {
        fetch('/getRecordings')
            .then(response => response.json())
            .then(recordings => {
                const recordingsList = document.getElementById('recordingsList');
                recordingsList.innerHTML = ''; 
    
                if (recordings.length === 0) {
                    recordingsList.innerHTML = '<p>No recordings found.</p>';
                    return;
                }
    
                recordings.forEach(recording => {
                    const { title, user, duration, BPM, notes } = recording;
                
                    const recordingItem = document.createElement('div');
                    recordingItem.classList.add('recording-item');
                
                    const recordingTitle = document.createElement('h3');
                    recordingTitle.innerHTML = `
                        <strong>${title}</strong><br>
                        <small>by ${user}</small><br>
                        <small>Duration: ${duration}</small><br>
                        <small>BPM: ${BPM}</small>
                    `;
                
                    const playButton = document.createElement('button');
                    playButton.textContent = "▶ Play";
                    playButton.classList.add('play-button');
                    playButton.addEventListener('click', async () => {
                        console.log(`Play button clicked for "${title}"`);
                
                        galleryOverlay.style.display = 'none'; 
                        
                        await playRecording(notes); 
                    });
                
                    recordingItem.appendChild(recordingTitle);
                    recordingItem.appendChild(playButton);
                    recordingsList.appendChild(recordingItem);
                });
            })
            .catch(error => {
                console.error('Error fetching recordings:', error);
                const recordingsList = document.getElementById('recordingsList');
                recordingsList.innerHTML = '<p>Error loading recordings.</p>';
            });
    }
});
