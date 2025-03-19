if (localStorage.getItem('colorStorage') !== null) {
    const rgba = JSON.parse(localStorage.getItem('colorStorage'));

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

    let msg = validCustomColorMsg();
    if (msg !== "Valid") {
        alert(msg);
    } else {
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
}