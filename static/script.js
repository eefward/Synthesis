// Piano configuration
const totalKeys = 88;
const startNote = 21; // A0 in MIDI notation

// Note names for labeling keys
const noteNames = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// Pattern of white/black keys (C major scale pattern)
// true = white key, false = no black key after this white key
const blackKeyPattern = [true, true, false, true, true, true, false]; // Starting from A

function createPiano() {
    const piano = document.getElementById('piano');
    let whiteKeyIndex = 0;
    
    // Create all white keys first
    for (let i = 0; i < totalKeys; i++) {
        const midiNote = startNote + i;
        const noteIndex = midiNote % 12;
        const octave = Math.floor(midiNote / 12) - 1;
        const noteName = noteNames[noteIndex];
        
        // Check if current note is a white key
        if (noteName.length === 1) { // White keys have single letter names
            const whiteKey = document.createElement('div');
            whiteKey.className = 'white-key';
            whiteKey.dataset.note = `${noteName}${octave}`;
            whiteKey.dataset.midi = midiNote;
            
            // Add label to the key
            const label = document.createElement('div');
            label.className = 'key-label';
            label.textContent = `${noteName}${octave}`;
            whiteKey.appendChild(label);
            
            piano.appendChild(whiteKey);
            whiteKeyIndex++;
        }
    }
    
    // Then add black keys on top
    const whiteKeys = document.querySelectorAll('.white-key');
    let blackKeyIndex = 0;
    
    for (let i = 0; i < whiteKeys.length - 1; i++) {
        const currentKeyNote = whiteKeys[i].dataset.note;
        const noteWithoutOctave = currentKeyNote.charAt(0);
        const noteIndex = "ABCDEFG".indexOf(noteWithoutOctave);
        
        // Check if there should be a black key after this white key
        if (blackKeyPattern[noteIndex % 7]) {
            const blackKey = document.createElement('div');
            blackKey.className = 'black-key';
            
            // Calculate position (centered between white keys)
            const leftPos = whiteKeys[i].offsetLeft + whiteKeys[i].offsetWidth - 8;
            blackKey.style.left = `${leftPos}px`;
            
            // Figure out the MIDI note and name for the black key
            const midiNote = parseInt(whiteKeys[i].dataset.midi) + 1;
            const noteIndex = midiNote % 12;
            const octave = Math.floor(midiNote / 12) - 1;
            const noteName = noteNames[noteIndex];
            
            blackKey.dataset.note = `${noteName}${octave}`;
            blackKey.dataset.midi = midiNote;
            
            piano.appendChild(blackKey);
            blackKeyIndex++;
        }
    }
}

// Add event listeners for all keys
function addKeyListeners() {
    const keys = document.querySelectorAll('.white-key, .black-key');
    keys.forEach(key => {
        key.addEventListener('click', function() {
            const noteName = this.dataset.note;
            alert(`You pressed ${noteName}`);
            // Here you would trigger the sound for this note
        });
    });
}

// Initialize the piano
window.addEventListener('DOMContentLoaded', () => {
    createPiano();
    // Wait a bit for layout to complete
    setTimeout(addKeyListeners, 100);
});