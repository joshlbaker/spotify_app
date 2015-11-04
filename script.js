$(function() {

	function TrackList(image, track, artist, audio){
		this.image = image;
		this.track = track;
		this.artist = artist;
		this.audio = audio;
	}
		TrackList.all = [];

	TrackList.prototype.save = function(){
		TrackList.all.push(this);
		console.log(TrackList.all);
	};
	TrackList.prototype.render = function(){
		var $spotifyTemp = _.template($('#spotify-template').html());
		var $spotifyT = ($spotifyTemp(this));
		var index = TrackList.all.indexOf(this);
		// $spotifyT.attr('data-index', index);
		$results.append($spotifyT);
	}

	var $spotifySearch = $('#spotify-search');
	var $track = $('#track');
	var $results = $('#results');
	var $spotifyTemp = _.template($('#spotify-template').html());

  $spotifySearch.on('submit', function(event){
  	event.preventDefault();

  	var searchTrack = $track.val();
  	console.log(searchTrack);

  	$.get(
  		'https://api.spotify.com/v1/search?q=' + searchTrack + '&type=track',
				function(data){
					console.log(data.tracks.items);
					var getTrackArray = (data.tracks.items);
					_.each(getTrackArray, function(track, index){
						track.name;
						track.artists[0].name;
						track.album.images[0].url;
						console.log(track.album.images[0].url);

						var trackName = (track.name);
						console.log(track);
						var artistName = (track.artists[0].name);
						var image = (track.album.images[0].url);
						var audio = (track.preview_url);

						var list = new TrackList( image, trackName, artistName, audio);

						list.save();

						list.render();

					});
					$("#spotify-search")[0].reset() //resets the form
					$("#spotify-search").click(function(){
						$("#results").empty();
					});
			});
	 });
});
