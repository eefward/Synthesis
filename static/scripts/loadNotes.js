const audioContext = new AudioContext();
const audioStorage = {};

async function loadAudio(note) {
    const response = await fetch(`/static/sounds/${encodeURIComponent(note)}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioStorage[note] = audioBuffer;
}

for (let i = 21; i <= 108; i++) 
    loadAudio(noteFormat(i));