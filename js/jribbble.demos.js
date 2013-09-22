$(document).ready(function () {		

	// API Ref: http://api.dribbble/players/:id/shots
	$.jribbble.getShotsByPlayerId('naromero', function (playerShots) {
		var html = [];
		
		$.each(playerShots.shots, function (i, shot) {
		
			var date = new Date(shot.created_at);
			var day = date.getDate();
			var year = date.getFullYear();
			
			var n=new Array();
			n[0]="Jan";
			n[1]="Feb";
			n[2]="Mar";
			n[3]="Apr";
			n[4]="May";
			n[5]="Jun";
			n[6]="Jul";
			n[7]="Aug";
			n[8]="Sep";
			n[9]="Oct";
			n[10]="Nov";
			n[11]="Dec";
			var month = n[date.getMonth()];			
			
			html.push('<li class="thumbnail">');
			html.push('<a href="' + shot.url + '" target="_blank">');
			html.push('<img src="' + shot.image_url + '" ');
			html.push('alt="' + shot.title + '"></a>');
			html.push('<div class="shot-details"><h3 class="details"><i class="icon-time"></i> '+ month +' '+ day +', '+ year +'</h3></div></li>');
		});		

		$('#shotsByPlayerId').html(html.join(''));
	}, {page: 1, per_page: 8});


	// This isn't for the Jribbble demos.
	// This is a workaround for the Mobile Safari scale orientation bug.
	// Code from Adactio: http://adactio.com/journal/4470/
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');

		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';

			document.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
			}, false);			
		}
	}
});