function onMidiMessage(event) {
    const [status, note, velocity] = event.data;

    if (status === 144 && velocity > 0) {
        console.log(`Key pressed: ${note}`);
        
        const key = noteFormat(note);
        playNoteWithEffect(key);
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