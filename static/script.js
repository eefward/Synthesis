const totalKeys = 88;

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function createPiano() {
    const piano = document.getElementById('piano');

    let previousKey = null;
    for (let i = 0; i < totalKeys; i++) {
        const note = notes[i % 12] // ex. 'A'
        const octave = Math.floor((i + 9) / 12); // the first c key is c1 not c0

        const key = document.createElement('div');
        key.className = 'key';
        key.dataset.note = `${note}${octave}`;
        
        // note would have a length of 2 if it's a black key
        if (note.length === 1) { 
            key.classList.add('white-key');
            previousKey = key;
        } else { 
            key.classList.add('black-key');
            
            // it has some flaws, such as when you changed zoom percentage on broswers
            const moveLeft = previousKey.offsetLeft + (previousKey.offsetWidth * 0.7);
            key.style.left = `${moveLeft}px`;
        }

        const label = document.createElement('div');
        label.className = 'key-label';
        label.textContent = `${note}${octave}`;

        key.appendChild(label);
        piano.appendChild(key);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createPiano();
});