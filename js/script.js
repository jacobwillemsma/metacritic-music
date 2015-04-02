//script.js
(function() {
	var request = window.superagent;
	var queryName = document.getElementsByClassName('tab-text')[0].innerText;
	var queryYear = parseInt(document.getElementsByClassName('year')[0].innerText);
	var queryArtist = document.getElementsByClassName('tab-text parent tooltip')[0].innerText;

	function createButton(scoreObject) {
		

	}

	function getScoreFromMetacritic(albumName, albumYear, albumArtist) {
        var actionBar = document.getElementsByClassName('actions')[0];
        var referenceElement = actionBar.children[2];
        var newButton = document.createElement('a');
        
        newButton.setAttribute('class', 'button');
        newButton.innerText = 'M';
        newButton.setAttribute('style', 'height:90%; min-width:12px');
        actionBar.insertBefore(newButton, referenceElement);
        
		request
			.post('https://byroredux-metacritic.p.mashape.com/search/album')
			.send({ title: albumName, max_pages: '2', year_from: albumYear - 1, year_to: albumYear + 1})
			.set('X-Mashape-Key', 'YHsGS38v9vmshNYjQH4Fw3vTi0Fwp1VVBgUjsneVUKPOmmg5Ul')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Accept', 'application/json')
			.end(function(err, res){
				if (res.ok) {
					if (res.count === 0) {
						// No results from API call
					} else {
						var results = res.body.results;
						for (var i = 0; i < results.length; i++) {
							var returnedName = results[i].name;
							var splitAlbumArtist = returnedName.split('-');
							var currentAlbumName = splitAlbumArtist[0].substring(0, splitAlbumArtist[0].length -1).toLowerCase().replace(/\s/g, '');
							var currentArtistName = splitAlbumArtist[1].substring(1, splitAlbumArtist[1].length).toLowerCase().replace(/\s/g, '');
							albumName = albumName.toLowerCase().replace(/\s/g, '');
							albumArtist = albumArtist.toLowerCase().replace(/\s/g, '');
							if (currentAlbumName === albumName && currentArtistName === albumArtist && results[i].score) {
								// We hit the right album, let's update the button.
                                var score = results[i].score;
                                var url = results[i].url;
                                
                                newButton.setAttribute('href', url);
                                newButton.setAttribute('target', '_blank');
                                newButton.innerText = score;

                                if (score > 60) {
                                    // Green button
                                    newButton.setAttribute('style', 'background-color:#66CC33; height:90%; min-width:10px');
                                } else if (score >=40) {
                                    // Yellow button
                                    newButton.setAttribute('style', 'background-color:#FFCC33; height:90%; min-width:10px');
                                } else {
                                    // Red button
                                    newButton.setAttribute('style', 'background-color:#FF0000; height:90%; min-width:10px');
                                }
							}
						}
					}
				}
			});
	}

	getScoreFromMetacritic(queryName, queryYear, queryArtist);

})(document, window);

