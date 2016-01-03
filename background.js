chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(sender.tab && request.text) {
		chrome.browserAction.setBadgeText({"text": request.text, tabId: sender.tab.id});
	}
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'location.reload()'
  });
});
