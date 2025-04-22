function createPiano() {
    const piano = document.createElement('div');
    piano.className = 'piano';
    piano.id = 'piano';
    document.body.prepend(piano);

    // Adding a div to temporarily store the bar animations
    const slidingBar = document.createElement('div');
    slidingBar.id = 'slidingBars';
    piano.appendChild(slidingBar);

    // Create the progress bar for recordings
    const progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    piano.appendChild(progressBar);

    // Create a div to store the piano keys
    const keys = document.createElement('div');
    keys.id = 'keys';
    piano.appendChild(keys);

    let previousKey = null;
    for (let i = 0; i < 88; i++) {
        const note = noteFormat(i + 21);

        const key = document.createElement('div');
        key.className = 'key';
        key.dataset.note = note;
        
        // note would have a length of 2 if it's a black key
        if (note.includes('#')) { 
            key.classList.add('black-key');
            
            // it has some flaws, such as when you changed zoom percentage on broswers
            const moveLeft = previousKey.offsetLeft + (previousKey.offsetWidth * 0.64);
            key.style.left = `${moveLeft}px`;
        } else { 
            key.classList.add('white-key');
            previousKey = key;
        }

        const label = document.createElement('div');
        label.className = 'key-label';
        label.textContent = note;

        key.appendChild(label);
        keys.appendChild(key);
    }
}

createPiano();