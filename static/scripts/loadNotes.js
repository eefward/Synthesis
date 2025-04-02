const audioContext = new AudioContext();
const audioStorage = {
    1: {},
    2: {}
};

async function loadAudio(note) {
    let response = await fetch(`/static/sounds/soundPack1/${encodeURIComponent(note)}.mp3`);
    let arrayBuffer = await response.arrayBuffer();
    let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioStorage[1][note] = audioBuffer;

    response = await fetch(`/static/sounds/soundPack2/${encodeURIComponent(note)}.ogg`);
    arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioStorage[2][note] = audioBuffer;
}

for (let i = 21; i <= 108; i++) 
    loadAudio(noteFormat(i));