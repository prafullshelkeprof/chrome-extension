// Initialize button with user's preferred color
let changeColor = document.querySelectorAll(".changeColor");
var color = 'black';
chrome.storage.sync.set({
    color
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.forEach(element => {
    element.addEventListener("click", async(event) => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log('element', element);
        let color = element.getAttribute('data-color');
        chrome.storage.sync.set({ color });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
        });
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });

}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log('tab updated');
    if (changeInfo.status == 'complete') {

        // do your things

    }
})
chrome.webNavigation.onDOMContentLoaded.addListener(
    function() {
        console.log('blah blah');
    }
)