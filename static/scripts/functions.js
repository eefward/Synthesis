// -------------------------------------------------- Key animations & Recording
function createNoteAnimation(key, reversed=false) {
    const bar = document.createElement('div');
    bar.style.zIndex = '-1';
    document.getElementById('slidingBars').appendChild(bar); 
    bar.classList.add('slide-bar');

    const keyRect = key.getBoundingClientRect();
    if (key.classList.contains('white-key')) bar.classList.add('whiteSlidingBar');
    else if (key.classList.contains('black-key')) bar.classList.add('blackSlidingBar');
    
    // bar.style.height = `${keyRect.height * 1.25}px`;
    // bar.style.width = `${keyRect.width}px`;
    bar.style.height = `${keyRect.height * .5}px`
    bar.style.width = `${keyRect.width * .75}px`
    
    bar.style.left = `${keyRect.left + keyRect.width / 2 - parseFloat(bar.style.width) / 2}px`;

    // distance that the white/black key animation starts relative to the bottom on the screen
    if (reversed) {
        bar.style.bottom = '100vh';
        requestAnimationFrame(() => bar.style.transform = `translateY(100vh)`);
    } else {
        bar.style.bottom = '20vh';
        requestAnimationFrame(() => bar.style.transform = `translateY(-120vh)`);
    }

    setTimeout(() => {
        bar.remove();
    }, 5000);

    // Illusion of clicking 
    setTimeout(() => {
        key.style.filter = "brightness(70%)";
    
        setTimeout(() => {
            key.style.filter = "brightness(100%)";
            key.style.backgroundColor = '';
        }, 150); 
    }, reversed ? 4000 : 0);
}

function playNote(note, duration, wait=false) {
    if (wait) setTimeout(() => playNote(note, duration), 4000);
    else if (audioStorage[curSoundPack][note]) {
        const source = audioContext.createBufferSource();
        source.buffer = audioStorage[curSoundPack][note];
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

// -------------------------------------------------- Playback
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

async function playRecording(recording, start=0.0) {
    if (recording.length <= 2) return;

    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');

    playButton.innerHTML = 'Playing...';
    progressBar.style.backgroundColor = 'green';

    // Progress bar animation
    const songDuration = recording[recording.length - 1].time - recording[0].time;
    let currentTimePercentage = start;
    let interval = songDuration / 1000; // Updates 1000 times in total
    let increment = .001;

    if (interval < 10) { // 10 milliseconds or below makes it bug out
        increment = .01 / interval; // Algebra!
        interval = 10; // 10 milliseconds minimum
    }

    let loop = setInterval(() => {
        let currentWidth = 1793 * currentTimePercentage;
        progressBar.style.width = `${currentWidth}px`;
        currentTimePercentage += increment;

        if (currentTimePercentage >= 1) {
            console.log("finished");
            progressBar.style.backgroundColor = 'black';
            playButton.innerHTML = `Play Recording`;
            clearInterval(loop);
        }
    }, interval);

    // Play the actual notes
    for (let i = 1; i < recording.length - 1; i++) {
        const key = document.querySelector(`[data-note="${recording[i].note}"]`);
        await new Promise(resolve => setTimeout(resolve, recording[i].time - recording[i - 1].time));

        playNote(recording[i].note, recording[i].time, true);
        createNoteAnimation(key, true);
    }
}