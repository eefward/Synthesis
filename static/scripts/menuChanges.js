function toggleInfoBox(isVisible, debounce) {
    const infoBox = document.getElementById('notePressedInfo');
    
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
