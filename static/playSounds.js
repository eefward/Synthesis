const keys = document.querySelectorAll('.key');
const information = document.getElementById('information');
let isMouseDown = false; // Track if mouse is pressed

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        isMouseDown = true;
        playNoteWithEffect(key);
    });

    key.addEventListener('mouseenter', () => {
        if (isMouseDown) {
            playNoteWithEffect(key);
        }
    });
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// POV: WaitForChild() !?
document.addEventListener("DOMContentLoaded", function() {
    const infoBox = document.getElementById('information');
    const toggleButton = document.getElementById('toggle-info');
    const debounce = 300; // or cooldown

    let isVisible = true;

    toggleButton.addEventListener('click', () => {

        if (isVisible) {
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

        isVisible = !isVisible;
    });
});

function playNoteWithEffect(key) {
    information.innerText = `You pressed ${key.dataset.note}`;
    
    // Play sound
    const audio = new Audio(`/static/sounds/${encodeURIComponent(key.dataset.note)}.mp3`);
    audio.play();

    // Create the visual effect
    createSlideEffect(key);
}

function createSlideEffect(key) {
    const bar = document.createElement('div');
    bar.classList.add('slide-bar');

    const keyRect = key.getBoundingClientRect();
    
    // relative sizes
    if (key.classList.contains('white-key')) {
        bar.style.width = `${keyRect.width * 0.9}px`; 
        bar.style.height = `${keyRect.height * 1.2}px`; 
    } else if (key.classList.contains('black-key')) {
        bar.style.width = `${keyRect.width * 0.8}px`; 
        bar.style.height = `${keyRect.height}px`; 
    }

    bar.style.left = `${keyRect.left + keyRect.width / 2 - parseFloat(bar.style.width) / 2}px`;
    bar.style.bottom = '10vh';

    document.body.appendChild(bar);

    requestAnimationFrame(() => {
        bar.style.transform = 'translateY(-100vh)';
        bar.style.opacity = '0';
    });

    setTimeout(() => {
        bar.remove();
    }, 600);
}


