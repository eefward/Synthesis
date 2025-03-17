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

function validateInput() {
    const redTop = document.getElementById('redTop');
    const greenTop = document.getElementById('greenTop');
    const blueTop = document.getElementById('blueTop');
    const transparencyTop = document.getElementById('transparencyTop');
    const redBottom = document.getElementById('redBottom');
    const greenBottom= document.getElementById('greenBottom');
    const blueBottom = document.getElementById('blueBottom');
    const transparencyBotom = document.getElementById('tranparencyBottom');

    const colors = [redTop, greenTop, blueTop, redBottom, greenBottom, blueBottom];
    for (let i = 0; i < colors.length; i++) {
        const parsed = parseInt(colors[i].value);
        if (!(Number.isInteger(parsed) && parsed.toString() === colors[i].trim())) {
            return alert("Integers and valid input only");
        } else if (!(0 <= parsed && parsed <= 255)) {
            return alert("Color values can only be 0-255");
        }
    }


}

const selectedColor = document.getElementById('selectColor');
const css = document.getElementById('slidingBarsCSS');

selectedColor.addEventListener('change', () => {
    const color = selectedColor.value;
    
    if (color === 'Red') {
        css.innerHTML = `
            .whiteSlidingBar {
                background: linear-gradient(135deg, rgba(255, 99, 71, 0.9) 0%, rgba(255, 0, 0, 1) 100%); /* Tomato to Red */
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
            .blackSlidingBar {
                background: linear-gradient(135deg, rgba(255, 99, 71, 0.9) 0%, rgba(139, 0, 0, 1) 100%); /* Dark Red */
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
        `;
    } else if (color === 'Green') {
        css.innerHTML = `
            .whiteSlidingBar {
                background: linear-gradient(135deg, rgba(144, 238, 144, 0.9) 0%, rgba(34, 139, 34, 1) 100%); /* Light Green to Forest Green */
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
            .blackSlidingBar {
                background: linear-gradient(135deg, rgba(144, 238, 144, 0.9) 0%, rgba(0, 100, 0, 1) 100%); /* Dark Green */
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
        `;
    } else if (color === 'Blue') {
        css.innerHTML = `
            .whiteSlidingBar {
                background: linear-gradient(135deg, rgba(173, 216, 230, 0.9) 0%, rgba(0, 0, 255, 1) 100%); /* Light Blue to Blue */
                transition: transform 1s ease-out, opacity 1s ease-out;
            }
            .blackSlidingBar {
                background: linear-gradient(135deg, rgba(173, 216, 230, 0.9) 0%, rgba(0, 0, 139, 1) 100%); /* Dark Blue */
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
        const btn = document.getElementById('customColorBtn');
        
        customColorBackground.hidden = false;
        customColor.selected = true;

        customColorBackground.addEventListener('click', (event) => {
            if (event.target === background) 
                customColorBackground.hidden = true;
        });

        btn.addEventListener('click', () => {
            validateInput()
        })
    }
});