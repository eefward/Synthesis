const piano = document.querySelector('.piano');
const whiteKeysPattern = [true, false, true, true, false, true, false, true, true, false, true, false];

for (let i = 0, w = 0, b = 0; i < 88; i++) {
    let isWhite = whiteKeysPattern[i % 12];
    let key = document.createElement('div');

    if (isWhite) {
        key.classList.add('white-key');
        piano.appendChild(key);
        w++;
    } else {
        key.classList.add('black-key');
        piano.children[w - 1].appendChild(key);
        b++;
    }
}