const keys = document.querySelectorAll('.key');
const information = document.getElementById('information');

keys.forEach(key => {
    key.addEventListener('click', () => {
        information.innerText = `You pressed ${key.dataset.note}`;
    });
});
