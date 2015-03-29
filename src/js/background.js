// background.js
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete') {
    if (tab.url.indexOf('https://play.google.com/music/listen?u=0#/album/') > -1) {
    	chrome.tabs.executeScript(tabId, { file: 'src/js/superagent.min.js'}, function() {
    		chrome.tabs.executeScript(tabId, { file: 'src/js/script.js'} );
    	});
    }
	}
});