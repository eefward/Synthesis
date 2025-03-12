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
    }
});