/*
playNoteWithEffect(note): Plays a note (EX: D4)
noteFormat(num): Converts Numerical to MIDI
validCustomColorMsg(): Determines of Custom Color is valid
saveCustomColor(): Saves the Custom Color across servers
sendRecordingToServer(): Sends recording to Python server
playRecording(): Plays 'recordedNotes'
*/

// -------------------------------------------------- Key animations
function playNoteWithEffect(note) {
    const element = document.querySelector(`[data-note="${note}"]`);

    // -- [[options or changing things i forgot the word]] --
    const ypos = '190px';
    const distanceTravels = 'translateY(-100vh)';
    const disappear = 600;

    const audio = new Audio(`/static/sounds/${encodeURIComponent(note)}.mp3`);
    audio.currentTime = 0; 
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
        bar.style.bottom = ypos; 
        bar.style.width = `${keyRect.width * 0.9}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`; 
    } else if (element.classList.contains('black-key')) {
        bar.classList.add('blackSlidingBar');
        bar.style.bottom = ypos; 
        bar.style.width = `${keyRect.width}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`;
    }

    bar.style.left = `${keyRect.left + keyRect.width / 2 - parseFloat(bar.style.width) / 2}px`;
    
    requestAnimationFrame(() => {
        bar.style.transform = distanceTravels;
        bar.style.opacity = '0';
    });
    
    setTimeout(() => {
        bar.remove();
    }, disappear);
}

function keyClickEffect(key) {
    const darkenAmt = "brightness(70%)";
    key.style.filter = darkenAmt; 
    setTimeout(() => {
        key.style.filter = "brightness(100%)"; 
    }, 150);
}

// -------------------------------------------------- Convert numerical to midi
function noteFormat(num) {
    // 21 is A0, 108 is C8 (A 88 key piano starts at A0 and ends at C8)
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    const index = (num - 21) % 12;
    const octave = Math.floor((num - 12) / 12);
    return notes[index] + octave;
}

// -------------------------------------------------- Custom color
function validCustomColorMsg() {
    let msg = "Valid";

    document.querySelectorAll('.colors').forEach(color => {
        const num = Number(color.value);

        if (isNaN(num)) {
            msg = `Integers and valid input only (${color.id})`;
            return;
        } else if (!(0 <= num && num <= 255)) {
            msg = `Color values can only be 0-255 (Location: ${color.id})`
            return;
        }
    });

    document.querySelectorAll('.transparencies').forEach(transparency => {
        const num = Number(transparency.value);

        if (isNaN(num)) {
            msg = `Integers and valid input only (${color.id})`;
            return;
        } else if (!(0 <= num && num <= 1)) {
            msg = `Transparency values can only be 0-1 (${color.id})`;
            return;
        }
    });

    return msg + "\nWTG = White Top Green, \nBBT = Black Bottom Transparency";
}

function assignCustomColor(rgba) {
    document.getElementById('WTR').value = rgba.white.top.red;
    document.getElementById('WTG').value = rgba.white.top.green;
    document.getElementById('WTB').value = rgba.white.top.blue;
    document.getElementById('WTT').value = rgba.white.top.transparency;

    document.getElementById('WBR').value = rgba.white.bottom.red;
    document.getElementById('WBG').value = rgba.white.bottom.green;
    document.getElementById('WBB').value = rgba.white.bottom.blue;
    document.getElementById('WBT').value = rgba.white.bottom.transparency;

    document.getElementById('BTR').value = rgba.black.top.red;
    document.getElementById('BTG').value = rgba.black.top.green;
    document.getElementById('BTB').value = rgba.black.top.blue;
    document.getElementById('BTT').value = rgba.black.top.transparency;

    document.getElementById('BBR').value = rgba.black.bottom.red;
    document.getElementById('BBG').value = rgba.black.bottom.green;
    document.getElementById('BBB').value = rgba.black.bottom.blue;
    document.getElementById('BBT').value = rgba.black.bottom.transparency;

    css.innerHTML = `
        .whiteSlidingBar {
            background: linear-gradient(
                135deg, 
                rgba(${rgba.white.top.red}, ${rgba.white.top.green}, ${rgba.white.top.blue}, ${rgba.white.top.transparency}) 0%,
                rgba(${rgba.white.bottom.red}, ${rgba.white.bottom.green}, ${rgba.white.bottom.blue}, ${rgba.white.bottom.transparency}) 100%
            );
            transition: transform 1s ease-out, opacity 1s ease-out;
        }
        .blackSlidingBar {
            background: linear-gradient(
                135deg, 
                rgba(${rgba.black.top.red}, ${rgba.black.top.green}, ${rgba.black.top.blue}, ${rgba.black.top.transparency}) 0%,
                rgba(${rgba.black.bottom.red}, ${rgba.black.bottom.green}, ${rgba.black.bottom.blue}, ${rgba.black.bottom.transparency}) 100%
            );
            transition: transform 1s ease-out, opacity 1s ease-out;
        }
    `;
  
    document.getElementById('customColor').selected = true;
}


function saveCustomColor() {
    const rgba = {
        white: {
            top: {
                red: Number(document.getElementById('WTR').value), 
                green: Number(document.getElementById('WTG').value), 
                blue: Number(document.getElementById('WTB').value),
                transparency: Number(document.getElementById('WTT').value)
            },
            bottom: {
                red: Number(document.getElementById('WBR').value), 
                green: Number(document.getElementById('WBG').value), 
                blue: Number(document.getElementById('WBB').value), 
                transparency: Number(document.getElementById('WBT').value)
            }
        }, 
        black : {
            top: {
                red: Number(document.getElementById('BTR').value), 
                green: Number(document.getElementById('BTG').value), 
                blue: Number(document.getElementById('BTB').value), 
                transparency: Number(document.getElementById('BTT').value)
            },
            bottom: {
                red: Number(document.getElementById('BBR').value), 
                green: Number(document.getElementById('BBG').value), 
                blue: Number(document.getElementById('BBB').value), 
                transparency: Number(document.getElementById('BBT').value)
            }
        }
    }

    assignCustomColor(rgba);
    localStorage.setItem('colorStorage', JSON.stringify(rgba));
}

// -------------------------------------------------- Recording & Playback

function sendRecordingToServer() {
    fetch('http://localhost:5000/saveRecording', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recordedNotes })
    })
    .then(response => response.json())
    .then(data => console.log('Server Response:', data))
    .catch(error => console.error('Error:', error));
}

function playRecording() {
    const delayBeforePlaying = 1000;
    const playButton = document.getElementById('playButton');

    playButton.textContent = 'Playing';

    if (recordedNotes.length === 0) {
        playButton.textContent = 'Play Recording';
        return;
    }

    let lastNoteTime = recordedNotes[recordedNotes.length - 1].time; 
    let totalDuration = lastNoteTime * delayBeforePlaying; 

    recordedNotes.forEach(noteData => {
        const delay = noteData.time * delayBeforePlaying;
        setTimeout(() => {
            playNoteWithEffect(noteData.note);
        }, delay);
    });

    setTimeout(() => {
        playButton.textContent = 'Play Recording';
    }, totalDuration);
}
