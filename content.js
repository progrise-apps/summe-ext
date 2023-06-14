// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendToAPI(request.text);
    return true;  // Will respond asynchronously.
});

function sendToAPI(text) {
    chrome.runtime.sendMessage({text: text});
}

// const selectedText = window.getSelection().toString();
//
// // Send a message to the background script
chrome.runtime.sendMessage({ message: "sendToAPI" }, response => {
    console.log(response.body.text());
    // localStorage.setItem('response', JSON.stringify(response));
});
