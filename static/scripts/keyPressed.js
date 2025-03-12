const keys = document.querySelectorAll('.key');
const information = document.getElementById('notePressedInfo');
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

function playNoteWithEffect(key) {
    information.innerText = `${key.dataset.note}`;
    
    // Play sound
    const audio = new Audio(`/static/sounds/${encodeURIComponent(key.dataset.note)}.mp3`);
    audio.play();
    
    const bar = document.createElement('div');
    document.getElementById('slidingBars').appendChild(bar); 
    bar.classList.add('slide-bar');

    const keyRect = key.getBoundingClientRect();
    
    // relative sizes for white and black keys
    if (key.classList.contains('white-key')) {
        bar.classList.add('whiteSlidingBar')
        bar.style.width = `${keyRect.width * 0.9}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`; 
    } else if (key.classList.contains('black-key')) {
        bar.classList.add('blackSlidingBar');
        bar.style.width = `${keyRect.width}px`; 
        bar.style.height = `${keyRect.height * 1.25}px`;
    }

    bar.style.left = `${keyRect.left + keyRect.width / 2 - parseFloat(bar.style.width) / 2}px`;
    
    requestAnimationFrame(() => {
        bar.style.transform = 'translateY(-100vh)';
        bar.style.opacity = '0';
    });
    
    setTimeout(() => {
        bar.remove();
    }, 600);
}
