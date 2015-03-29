// background.js

chrome.tabs.onUpdated.addListener(function () {
	chrome.tabs.getSelected(null,function(tab) {
	    var tablink = tab.url;
	    if (tablink.indexOf('https://play.google.com/music/listen?u=0#/album/') > -1) {
	    	var actionsMenu = document.getElementsByClassName("actions");
	    	var metacriticButton = document.createElement('button');
	    	metacriticButton.setAttribute('class', 'button');
	    	actionsMenu[0].appendChild(metacriticButton);
	    	console.log('In an album');
	    }
	});
});