let btn = document.querySelector('#btn');

    // disable context menu when right-mouse clicked
    btn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // show the mouse event message
    btn.addEventListener('mouseup', (e) => {
        let msg = document.querySelector('#message');
        switch (e.button) {
            case 0:
                msg.textContent = 'Left mouse button clicked.'; alert("Test");
                break;
            case 1:
                msg.textContent = 'Middle mouse button clicked.'; alert("Test");
                break;
            case 2:
                msg.textContent = 'Right mouse button clicked.'; alert("Test");
                break;
            default:
                msg.textContent = `Unknown mouse button code: ${event.button}`; alert("Test");
        }
    });