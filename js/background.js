// background.js
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (tab.url.indexOf('https://play.google.com/music/listen#/album/') > -1) {
    	console.log('Running scripts');
	    chrome.tabs.executeScript(tabId, { file: 'js/superagent.min.js'}, function() {
	      chrome.tabs.executeScript(tabId, { file: 'js/script.js'} );
    });
    }
  }
});