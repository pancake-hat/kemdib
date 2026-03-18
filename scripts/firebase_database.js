import firebaseConfig from "./firebase_config.js";
import { blink } from "./utils.js";

// init firebase db
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const totalCountRef = database.ref('button_clicks/total_count');

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

// listen for changes to total_count and update the UI in real-time
totalCountRef.on('value', (snapshot) => {
    const currTotalCount = snapshot.val();
    const totalClicksElement = document.getElementById('slot-total-clicks');
    if (totalClicksElement) {
        blink($(totalClicksElement));
        totalClicksElement.textContent = currTotalCount !== null ? currTotalCount : 0;
    }
});
