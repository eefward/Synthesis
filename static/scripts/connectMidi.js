function onMidiMessage(event) {
    const [status, note, velocity] = event.data;

    if (status === 144 && velocity > 0) {
        const key = document.querySelector(`[data-note="${noteFormat(note)}"]`);
        if (isRecording) recording.push({note: noteFormat(note), time: Date.now() - recording[0].time, duration: duration});
        playNote(noteFormat(note), 10000); // test duration
        createNoteAnimation(key);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(midiObject => {
                console.log("given permission");
                const inputs = midiObject.inputs.values();
                for (let input of inputs) {
                    input.onmidimessage = onMidiMessage;
                }
            })
            .catch
    } else {
        console.log("your weird");
    }
});