// -------------------------------------------------- Key animation color changes
const css = document.getElementById('slidingBarsCSS');
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
        customColorBackground.hidden = false;

        customColorBackground.addEventListener('click', (event) => {
            if (event.target === background) 
                customColorBackground.hidden = true;
        });

        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const msg = validCustomColorMsg();
            if (msg.includes("Valid")) {
                saveCustomColor();
                customColorBackground.hidden = true;
            } else alert(msg);
        });
    }
});

// -------------------------------------------------- Switch sound packs
let curSoundPack = 1;

const switch1 = document.getElementById('switch1');
const switch2 = document.getElementById('switch2');

switch1.addEventListener('click', () => {
    switch1.checked = true;
    switch2.checked = false;
    curSoundPack = 1;
});
switch2.addEventListener('click', () => {
    switch2.checked = true;
    switch1.checked = false;
    curSoundPack = 2;
});