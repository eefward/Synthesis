function toggleInfoBox(isVisible, debounce) {
    const infoBox = document.getElementById('information');
    
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
}

function createSlideEffect(key) {
    const bar = document.createElement('div');
    bar.classList.add('slide-bar');

    const keyRect = key.getBoundingClientRect();
    
    // relative sizes for white and black keys
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
