// -------------------------------------------------- Key animations
function playNoteWithEffect(note) {
    const element = document.querySelector(`[data-note="${note}"]`);

    const audio = new Audio(`/static/sounds/${encodeURIComponent(note)}.mp3`);
    audio.currentTime = 0; // Start from the beginning
    audio.play();

    // If they want to see the key pressed
    document.getElementById('notePressedInfo').innerText = note;
    
    // Creating the sliding Bars
    const bar = document.createElement('div');
    document.getElementById('slidingBars').appendChild(bar); 
    bar.classList.add('slide-bar');

    const keyRect = element.getBoundingClientRect();
    if (element.classList.contains('white-key')) {
        bar.classList.add('whiteSlidingBar')
        bar.style.width = `${keyRect.width * 0.9}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`; 
    } else if (element.classList.contains('black-key')) {
        bar.classList.add('blackSlidingBar');
        bar.style.width = `${keyRect.width}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`;
    }

    bar.style.left = `${keyRect.left + keyRect.width / 2 - parseFloat(bar.style.width) / 2}px`;
    
    requestAnimationFrame(() => {
        bar.style.transform = 'translateY(-100vh)';
        bar.style.opacity = '0';
    });
    
    setTimeout(() => {
        bar.remove();
    }, 600);
}

// -------------------------------------------------- Convert numerical to midi
function noteFormat(num) {
    // 21 is A0, 108 is C8 (A 88 key piano starts at A0 and ends at C8)
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    const index = (num - 21) % 12;
    const octave = Math.floor((num - 12) / 12);
    return notes[index] + octave;
}

// -------------------------------------------------- Valid custom color
function validCustomColor() {

}