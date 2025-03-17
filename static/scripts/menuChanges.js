// --------------------------------------------------

function keyToggle(visible, debounce) {
    const infoBox = document.getElementById('notePressedInfo');
    
    if (visible) {
        infoBox.style.opacity = '0';
        setTimeout(() => {
            infoBox.style.display = 'none';
        }, debounce);
    } else {
        infoBox.style.display = 'block';
        setTimeout(() => {
            infoBox.style.opacity = '1';
        }, 10);
    }
}

const keyToggleButton = document.getElementById('toggleInfo');
const debounce = 300;
let keyInfoVisible = true;
keyToggleButton.addEventListener('click', () => {
    keyToggle(keyInfoVisible, debounce);
    keyInfoVisible = !keyInfoVisible;
});

// --------------------------------------------------

const css = document.getElementById('slidingBarsCSS');

function validateAndSaveInput() {
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
    localStorage.setItem('colorStorage', JSON.stringify(rgba));
}

const selectedColor = document.getElementById('selectColor');


selectedColor.addEventListener('change', () => {
    const color = selectedColor.value;
    
    if (color === 'Red') {
        css.innerHTML = `
            .whiteSlidingBar {
                background: linear-gradient(135deg, rgba(255, 99, 71, 0.9) 0%, rgba(255, 0, 0, 1) 100%);
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
            .blackSlidingBar {
                background: linear-gradient(135deg, rgba(255, 99, 71, 0.9) 0%, rgba(139, 0, 0, 1) 100%);
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
        `;
    } else if (color === 'Green') {
        css.innerHTML = `
            .whiteSlidingBar {
                background: linear-gradient(135deg, rgba(144, 238, 144, 0.9) 0%, rgba(34, 139, 34, 1) 100%);
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
            .blackSlidingBar {
                background: linear-gradient(135deg, rgba(144, 238, 144, 0.9) 0%, rgba(0, 100, 0, 1) 100%);
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
        `;
    } else if (color === 'Blue') {
        css.innerHTML = `
            .whiteSlidingBar {
                background: linear-gradient(135deg, rgba(173, 216, 230, 0.9) 0%, rgba(0, 0, 255, 1) 100%);
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
            .blackSlidingBar {
                background: linear-gradient(135deg, rgba(173, 216, 230, 0.9) 0%, rgba(0, 0, 139, 1) 100%);
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
        `;
    } else if (color === 'Orange') {
        css.innerHTML = `
        .whiteSlidingBar {
            background: linear-gradient(135deg, rgba(255, 200, 0, 0.9) 0%, rgba(255, 85, 0, 1) 100%);
            transition: transform 1s ease-out, opacity 1s ease-out;
        }
        .blackSlidingBar {
            background: linear-gradient(135deg, rgba(200, 150, 0, 0.9) 0%, rgba(200, 30, 0, 1) 100%);
            transition: transform 1s ease-out, opacity 1s ease-out;
        }
        `;
    } else if (color === "Custom") {
        const customColorBackground = document.getElementById("background");
        const customColor = document.getElementById('customColor');
        
        customColorBackground.hidden = false;
        customColor.selected = true;

        customColorBackground.addEventListener('click', (event) => {
            if (event.target === background) 
                customColorBackground.hidden = true;
        });

        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            validateAndSaveInput()
            customColorBackground.hidden = true;
        });
    }
});