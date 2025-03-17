if (localStorage.getItem('colorStorage') !== null) {
    const rgba = JSON.parse(localStorage.getItem('colorStorage'));

    document.getElementById('WTR').value = rgba.white.top.red;
    document.getElementById('WTG').value = rgba.white.top.red;
    document.getElementById('WTB').value = rgba.white.top.red;
    document.getElementById('WTT').value = rgba.white.top.red;

    document.getElementById('WBR').value = rgba.white.top.red;
    document.getElementById('WBG').value = rgba.white.top.red;
    document.getElementById('WBB').value = rgba.white.top.red;
    document.getElementById('WBT').value = rgba.white.top.red;

    document.getElementById('BTR').value = rgba.white.top.red;
    document.getElementById('BTG').value = rgba.white.top.red;
    document.getElementById('BTB').value = rgba.white.top.red;
    document.getElementById('BTT').value = rgba.white.top.red;

    document.getElementById('BBR').value = rgba.white.top.red;
    document.getElementById('BBG').value = rgba.white.top.red;
    document.getElementById('BBB').value = rgba.white.top.red;
    document.getElementById('BBT').value = rgba.white.top.red;

    document.querySelectorAll('.colors').forEach(color => {
        const num = Number(color.value);

        if (isNaN(num)) return alert("Integers and valid input only");
        else if (!(0 <= num && num <= 255)) return alert("Color values can only be 0-255");
    });

    document.querySelectorAll('.transparencies').forEach(transparency => {
        const num = Number(transparency.value);

        if (isNaN(num)) return alert("Integers and valid input only");
        else if (!(0 <= num && num <= 1)) return alert("Transparency values can only be 0-1");
    });

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