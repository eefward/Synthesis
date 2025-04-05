// -------------------------------------------------- Key animations & Recording
function createNoteAnimation(key, speed=1500, reversed=false) {
    const notePosition = '20vh'; // distance that the white/black key animation starts relative to the bottom on the screen
    const reversedposition = '-40vh';

    // Create bar
    const bar = document.createElement('div');
    bar.style.zIndex = '-1';
    document.getElementById('slidingBars').appendChild(bar); 
    bar.classList.add('slide-bar');

    if (reversed) bar.style.top = reversedposition;
    else bar.style.bottom = notePosition;

    const keyRect = key.getBoundingClientRect();
    if (key.classList.contains('white-key')) {
        bar.classList.add('whiteSlidingBar');
        bar.style.width = `${keyRect.width * 0.9}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`; 

        key.style.backgroundColor = '#ddd'; 
    } else if (key.classList.contains('black-key')) {
        bar.classList.add('blackSlidingBar');
        bar.style.width = `${keyRect.width}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`;

        key.style.backgroundColor = '#888';
    }

    bar.style.left = `${keyRect.left + keyRect.width / 2 - parseFloat(bar.style.width) / 2}px`;

    requestAnimationFrame(() => {
        if (reversed) {
            bar.style.transform = `translateY(140vh)`;
            bar.style.transition = `transform 1550ms linear`;
        }
        else {
            bar.style.transform = `translateY(-120vh)`;
            bar.style.opacity = '0';
        }
    });

    setTimeout(() => {
        bar.remove();
    }, speed);

    key.style.filter = "brightness(70%)";
    setTimeout(() => {
        key.style.filter = "brightness(100%)";
        key.style.backgroundColor = ''; 
    }, 150);
}

function playNote(note, duration, wait=false) {
    if (wait) setTimeout(() => playNote(note, duration), 1000);
    else if (audioStorage[curSoundPack][note]) {
        const source = audioContext.createBufferSource();
        source.buffer = audioStorage[curSoundPack][note]
        source.connect(audioContext.destination);
        source.start();
        setTimeout(() => source.stop(), duration);
    } else console.log(`${note} note doesn't exist`);
}

// -------------------------------------------------- Convert numerical to midi
// 21 is A0, 108 is C8 (A 88 key piano starts at A0 and ends at C8)
const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
function noteFormat(num) {
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
function sendRecordingToServer(recordingData) {
    fetch('/saveRecording', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recordingData)
    })
    .then(response => response.json())
    .then(data => console.log('Server Response:', data))
    .catch(error => console.log('Error:', error));
}

async function playRecording(recording) {
    console.log(recording);
    if (recording.length <= 2) return;

    const playButton = document.getElementById('playButton');
    playButton.innerHTML = `<div class="circle"></div>`;

    for (let i = 1; i < recording.length - 1; i++) {
        const key = document.querySelector(`[data-note="${recording[i].note}"]`);
        await new Promise(resolve => setTimeout(resolve, recording[i].time - recording[i - 1].time));

        playNote(recording[i].note, recording[i].duration, true);
        createNoteAnimation(key, 1500, true);
    }

    console.log("finished");
    playButton.innerHTML = `Play Recording`;
}