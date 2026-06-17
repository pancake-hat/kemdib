import firebaseConfig from "./firebase_config.js";
import { blink, getCubeImageFromId } from "./utils.js";

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

// record new win
export function recordWin(cubeId) {
    winsRef.push({
        spinNumber: lastTotalCount,
        cubeId: cubeId,
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

            const textSpan = document.createElement('span');
            textSpan.textContent = `Spin #${win.spinNumber} won with `;

            const cubeImg = document.createElement('img');
            cubeImg.src = getCubeImageFromId(win.cubeId);
            cubeImg.className = 'win-cube-icon';
            cubeImg.style.height = '20px'; // Ensure inline
            cubeImg.style.verticalAlign = 'middle';

            winElement.appendChild(textSpan);
            winElement.appendChild(cubeImg);
            winsList.appendChild(winElement);
        });
    }
});
