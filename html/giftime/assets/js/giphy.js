window.giphy = function(gifQuery, gifTotalCount){

    gifTotalCount = gifTotalCount || 300;

    var gifDisplayCount = 18;
        
    var randomMultiplier = Math.floor(Math.random()*(gifTotalCount/gifDisplayCount)); 
    
    var gifOffset = gifDisplayCount*randomMultiplier;
    
    gifQuery = gifQuery || "cats";


  
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+gifQuery+"&api_key=dc6zaTOxFJmzC&limit="+gifDisplayCount+"&offset="+gifOffset+"");
    
    xhr.done(function(gifs) {
    
        for (var i=0;i<gifs.data.length;i++) {
            $("#results-container").append( '<div class="item"><span class="oneClick" data-clipboard-text='+gifs.data[i].images.original.url+'></span><img src="'+gifs.data[i].images.fixed_width.url+'"/></div>' );
        }
        
        var gifs = $(".oneClick");
        
        
        var clip = new ZeroClipboard(gifs, {
        });
        
        clip.on( 'mouseup', function ( client, args ) {
            
            $(".copied").addClass('show');
        
            setTimeout(function() {
            
                $(".copied").removeClass("show");
                
            }, 2250);
        
        } );
        
    });
};   
    
