if (localStorage.getItem('colorStorage')) {
    const rgba = JSON.parse(localStorage.getItem('colorStorage'));

    let msg = validCustomColorMsg();
    if (!msg.includes("Valid")) alert(`Idk how you bypassed it\n\n${msg}`);
    else assignCustomColor(rgba);
}