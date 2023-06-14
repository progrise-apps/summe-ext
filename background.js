chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "copyAndSend",
        "title": "Make summary",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyAndSend") {
        sendToAPI(info.selectionText);
    }
});

function sendToAPI(text, tabId) {
    fetch('http://localhost:8000/summary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        // .then(response => response.json())
        .then(data => {
            console.log(data);

            const summaries = JSON.parse(localStorage.getItem('summaries')) || [];

            summaries.push(data)

            localStorage.setItem('summaries');

            // Send the data to the content script
            // chrome.tabs.sendMessage(tabId, { data });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
