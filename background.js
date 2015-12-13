chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(sender.tab && request.text) {
		chrome.browserAction.setBadgeText({"text": request.text, tabId: sender.tab.id});
	}
});