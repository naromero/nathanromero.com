function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	
};

var testArray = [
    "big typography",
    "bold colors",
    "perfect shapes",
    "designing on grids",
    "playing albums on repeat through <a href='rdio.com/people/naromero' target='_blank'>rdio</a>",
    "ping pong",
    "Indian food",
    "my Adidas",
    "pixel-hinting",
    "Suavecito pomade",
    "SVG's",
    "my girlfriend",
    "retina screens",
    "responsive design",
    "tracking everything with <a href='fitbit.com/user/27FHH5' target='_blank'>fitbit</a>",
    "live music",
    "drinks after work",
    "<a href='strava.com/athletes/1577333' target='_blank'>riding my bike</a> to work",
    "symmetry",
    "working around constraints",
    "the Beatles",
    "watches",
    "bi-weekly haircuts",
    "batman",
    "the details",
    "blurring the line between web and print",
    "bulleit rye whiskey",
    "finding the lowest common denominator",
    "simplification",
    "randomizing lists",
    "dabbling in code"
    ];
    
Shuffle(testArray);