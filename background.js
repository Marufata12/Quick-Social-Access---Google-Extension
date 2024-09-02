chrome.action.onClicked.addListener(function() {
    chrome.windows.create({
        url: 'https://www.instagram.com/direct/inbox/',
        type: 'popup',
        width: 450,
        height: 1000,
        top: 100,
        left: screen.availWidth - 375 - 20
    });
});








