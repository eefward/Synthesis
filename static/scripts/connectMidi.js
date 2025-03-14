function onMidiMessage(event) {
    const [status, note, velocity] = event.data;

    if (status === 144 && velocity > 0) {
        console.log(`Key pressed: ${note}`);

        /*
        // Create and add the div (bar) when a key is pressed
        const bar = document.createElement('div');
        bar.classList.add('bar');
        document.getElementById('slidingBars').appendChild(bar);

        // Optional: Remove bar after animation completes
        setTimeout(() => bar.remove(), 600);
        */
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.requestMIDIAccess) {
        console.log("yay");
        navigator.requestMIDIAccess()
            .then(midiObject => {
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