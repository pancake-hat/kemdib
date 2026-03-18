// add event listener when the module loads for closing ticker
document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.ticker_close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const ticker = document.getElementById("update-ticker");
            if (ticker) {
                ticker.style.display = "none";
            }
        });
    }
});
