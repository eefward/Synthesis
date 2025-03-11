const keys = document.querySelectorAll('.key');
const information = document.getElementById('information');

keys.forEach(key => {
    key.addEventListener('click', () => {
        information.innerText = `You pressed ${key.dataset.note}`;
        
        // the # messes with the url so you have to use that function (makes it # become %23)
        const audio = new Audio(`/static/sounds/${encodeURIComponent(key.dataset.note)}.mp3`)
        audio.play()
    });
});
