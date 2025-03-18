const piano = document.getElementById('piano');
const totalKeys = 88;

let previousKey = null;
for (let i = 0; i < totalKeys; i++) {
    const note = noteFormat(i + 21)

    const key = document.createElement('div');
    key.className = 'key';
    key.dataset.note = note;
    
    // note would have a length of 2 if it's a black key
    if (note.includes('#')) { 
        key.classList.add('black-key');
        
        // it has some flaws, such as when you changed zoom percentage on broswers
        const moveLeft = previousKey.offsetLeft + (previousKey.offsetWidth * 0.7);
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