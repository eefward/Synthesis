function createPiano() {
    const piano = document.createElement('div');
    piano.className = 'piano';
    piano.id = 'piano';
    document.body.prepend(piano);

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
            const moveLeft = previousKey.offsetLeft + (previousKey.offsetWidth * 0.66);
            key.style.left = `${moveLeft}px`;
        } else { 
            key.classList.add('white-key');
            previousKey = key;
        }

        const label = document.createElement('div');
        label.className = 'key-label';
        label.textContent = note;

        key.appendChild(label);
        piano.appendChild(key);
    }

    // Create the progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    piano.appendChild(progressBar);
}

createPiano();