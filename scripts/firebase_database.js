import firebaseConfig from "./firebase_config.js";
import { blink } from "./utils.js";

// init firebase db
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const totalCountRef = database.ref('button_clicks/total_count');
const winsRef = database.ref('wins');

let lastTotalCount = 0;

// update total click count in db
export function incrementDbClickCount() {
    totalCountRef.transaction(function(currentData) {
        if (currentData === null) {
            return 1;
        } else {
            return currentData + 1;
        }
    }, function(error, committed, snapshot) {
        if (error) {
            console.error("Transaction failed with error", error);
        } else if (!committed) {
            console.log("Transaction aborted, data not commited.");
        }
    });
}

// Record a new win
export function recordWin() {
    winsRef.push({
        spinNumber: lastTotalCount,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

// listen for changes to total_count and update the UI in real-time
totalCountRef.on('value', (snapshot) => {
    const currTotalCount = snapshot.val();
    lastTotalCount = currTotalCount;
    const totalClicksElement = document.getElementById('slot-total-clicks');
    if (totalClicksElement) {
        blink($(totalClicksElement));
        totalClicksElement.textContent = currTotalCount !== null ? currTotalCount : 0;
    }
});

// listen for new wins and update the list
winsRef.orderByChild('timestamp').limitToLast(10).on('value', (snapshot) => {
    const winsList = document.getElementById('wins-list');
    if (winsList) {
        winsList.innerHTML = '';
        const wins = [];
        snapshot.forEach((child) => {
            wins.unshift(child.val()); // Newest first
        });
        wins.forEach((win) => {
            const winElement = document.createElement('div');
            winElement.className = 'win-entry';
            winElement.textContent = `Spin #${win.spinNumber} was a winner!`;
            winsList.appendChild(winElement);
        });
    }
});
