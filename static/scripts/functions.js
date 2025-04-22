// -------------------------------------------------- Key animations & Recording
function createNoteAnimation(key, reversed = false) {
    const bar = document.createElement('div');
    document.getElementById('slidingBars').appendChild(bar);
    bar.classList.add('slidingBar');

    const keyRect = key.getBoundingClientRect();
    const piano = document.querySelector('.piano'); 
    const pianoRect = piano.getBoundingClientRect();

    if (key.classList.contains('white-key')) bar.classList.add('whiteSlidingBar');
    else if (key.classList.contains('black-key')) bar.classList.add('blackSlidingBar');

    bar.style.position = 'fixed'; 
    bar.style.height = `${keyRect.height * 0.5}px`;
    bar.style.width = `${keyRect.width * 0.75}px`;

    const pianoCenterOffset = window.innerWidth / 2 - pianoRect.width / 2;
    bar.style.left = `${keyRect.left - pianoCenterOffset}px`;

    bar.style.transition = `transform 5000ms linear`;

    if (reversed) {
        bar.style.bottom = '100vh';
        requestAnimationFrame(() => bar.style.transform = `translateY(100vh)`);
    } else {
        bar.style.bottom = '20vh';
        requestAnimationFrame(() => bar.style.transform = `translateY(-120vh)`);
    }

    setTimeout(() => bar.remove(), 5000);

    // Key press effect
    setTimeout(() => {
        key.style.filter = "brightness(70%)";
        setTimeout(() => key.style.filter = "brightness(100%)", 150);
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
    document.querySelectorAll('.colors').forEach(color => {
        if (color.id.length !== 3) {
            console.log("Stop hacking rah");
            return;
        }

        const a = color.id[0]; // white/black
        const b = color.id[1]; // top/bottom
        const c = color.id[2]; // red/green/blue/transparency

        document.getElementById(`${a}${b}${c}`).value = rgba[a.toLowerCase()][b.toLowerCase()][c.toLowerCase()];
    });

    document.querySelectorAll('.transparencies').forEach(transparency => {
        if (transparency.id.length !== 3) {
            console.log("Stop hacking rah");
            return;
        }

        const a = transparency.id[0]; // white/black
        const b = transparency.id[1]; // top/bottom
        const c = transparency.id[2]; // red/green/blue/transparency

        document.getElementById(`${a}${b}${c}`).value = rgba[a.toLowerCase()][b.toLowerCase()][c.toLowerCase()];
    });


    css.innerHTML = `
        .whiteSlidingBar { background: linear-gradient(135deg, rgba(${rgba.w.t.r}, ${rgba.w.t.g}, ${rgba.w.t.b}, ${rgba.w.t.t}) 0%, rgba(${rgba.w.b.r}, ${rgba.w.b.g}, ${rgba.w.b.b}, ${rgba.w.b.t}) 100%); }
        .blackSlidingBar { background: linear-gradient(135deg, rgba(${rgba.b.t.r}, ${rgba.b.t.g}, ${rgba.b.t.b}, ${rgba.b.t.t}) 0%, rgba(${rgba.b.b.r}, ${rgba.b.b.g}, ${rgba.b.b.b}, ${rgba.b.b.t}) 100%); }
    `;
  
    document.getElementById('customColor').selected = true;
}

function saveCustomColor() {
    const rgba = {
        w: {
            t: {
                r: Number(document.getElementById('WTR').value), 
                g: Number(document.getElementById('WTG').value), 
                b: Number(document.getElementById('WTB').value),
                t: Number(document.getElementById('WTT').value)
            },
            b: {
                r: Number(document.getElementById('WBR').value), 
                g: Number(document.getElementById('WBG').value), 
                b: Number(document.getElementById('WBB').value), 
                t: Number(document.getElementById('WBT').value)
            }
        }, b : {
            t: {
                r: Number(document.getElementById('BTR').value), 
                g: Number(document.getElementById('BTG').value), 
                b: Number(document.getElementById('BTB').value), 
                t: Number(document.getElementById('BTT').value)
            },
            b: {
                r: Number(document.getElementById('BBR').value), 
                g: Number(document.getElementById('BBG').value), 
                b: Number(document.getElementById('BBB').value), 
                t: Number(document.getElementById('BBT').value)
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