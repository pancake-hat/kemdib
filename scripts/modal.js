// generic file name to avoid ublock lol
// add event listener when the module loads for closing modal
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
export function tryPopUpAd(winningImageUrl) {
    const modal = document.getElementById('pop-up-modal');
    const modalImage = document.getElementById('modal-image');

    if (modal) {
        if (modalImage && winningImageUrl) {
            modalImage.src = winningImageUrl;
        }
        modal.style.display = "flex";
    }
}
