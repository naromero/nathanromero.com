window.giphy = function(gifQuery, gifTotalCount){

    gifTotalCount = gifTotalCount || 300;

    var gifDisplayCount = 20;
        
    var randomMultiplier = Math.floor(Math.random()*(gifTotalCount/gifDisplayCount)); 
    
    var gifOffset = gifDisplayCount*randomMultiplier;
    
    gifQuery = gifQuery || "cats";


  
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+gifQuery+"&api_key=dc6zaTOxFJmzC&offset="+gifOffset+"&limit="+gifDisplayCount+"");
    
    xhr.done(function(gifs) {
    
        for (var i=0;i<gifs.data.length;i++) {
            $("#results-container").append( '<div class="item"><img src="'+gifs.data[i].images.fixed_width.url+'"/></div>' );
        }        
    });
};   
    
