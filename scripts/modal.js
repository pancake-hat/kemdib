// generic file name to avoid ublock lol
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pop-up-modal');
    const closeButton = document.querySelector('.close-modal');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // when the user clicks outside the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

// when the user clicks the button, open the modal
export function tryPopUpAd() {
    const modal = document.getElementById('pop-up-modal');
    if (modal) {
        modal.style.display = "block";
    }
}
