import { tickerItems } from './constants.js';

// add event listener when the module loads for closing ticker
document.addEventListener('DOMContentLoaded', () => {
    const tickerContainer = document.querySelector('.ticker');
    if (tickerContainer) {
        tickerItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'ticker_item';
            div.textContent = item;
            tickerContainer.appendChild(div);
        });
    }

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
