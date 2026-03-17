// Initialize Firebase
import firebaseConfig from "./firebase_config.js";

firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database service
const database = firebase.database();
const countRef = database.ref('button_clicks/total_count');

// Function to update the click count in the database transactionally
// This is crucial for multi-user scenarios to prevent lost clicks.
function incrementClickCount() {
    countRef.transaction(function(currentData) {
        // If the counter doesn't exist, start at 0, otherwise increment
        if (currentData === null) {
            return 1;
        } else {
            return currentData + 1;
        }
    }, function(error, committed, snapshot) {
        if (error) {
            console.error("Transaction failed abnormally!", error);
        } else if (!committed) {
            console.log("Transaction aborted (data not committed, likely another client updated it).");
        } else {
            console.log("Click count incremented successfully!");
        }
    });
}

// Listen for changes to the click count and update the UI in real-time
// Any change to 'button_clicks/total_count' in the database will
// automatically update the displayed count on your page.
countRef.on('value', (snapshot) => {
    const currentCount = snapshot.val();
    // Display 0 if the count is null (i.e., hasn't been set yet)
    document.getElementById('click-count').textContent = currentCount !== null ? currentCount : 0;
});

// Add event listener to the button to trigger the increment function
document.getElementById('click-button').addEventListener('click', incrementClickCount);
