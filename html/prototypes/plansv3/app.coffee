document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#9c9c9c"


mask = new Layer
	width: 1450, height: 1000
mask.scrollVertical = true
	

# This imports all the layers for "Plans Page" into plansPageLayers
Sketch = Framer.Importer.load "imported/Plans Page"
Sketch.interaction.superLayer = mask

fixedContainer = new Layer
	width: mask.width, height: mask.height, backgroundColor: null
	
# Sticky Header
Sketch.stickyHeader.superLayer = fixedContainer
Sketch.stickyHeader.y = 0
Sketch.stickyHeader.opacity = 0

# Default Animation Options
Framer.Defaults.Animation =
	time: .05

# Center shit
mask.centerX()
fixedContainer.centerX()

# Floating Arrow
animationA = new Animation({
    layer: Sketch.arrow,
    properties: {y:30},
    time: .5,
    curve: "ease-in-out",
})

animationB = animationA.reverse()

# Alternate between the two animations
animationA.on(Events.AnimationEnd, animationB.start)
animationB.on(Events.AnimationEnd, animationA.start)

animationA.start()

# Learn More States

Sketch.learnMore.states.add
	"show": opacity: 1
	"hide": opacity: 0
	


# Set up some states
Sketch.header1.states.add
	"show": opacity: 1
	"hide": opacity: 0
Sketch.header2.states.add
	"show": opacity: 1
	"hide": opacity: 0
	
counter = new Layer



mask.on Events.Scroll, ->
	# Learn more hint
	counter.html = mask.scrollY  
	if ( 0 <= mask.scrollY < 300)
		Sketch.learnMore.states.next("show")
	else if ( 300 <= mask.scrollY <= 4000 )
		Sketch.learnMore.states.next("hide")
	
	if ( 0 <= mask.scrollY < 793)
		Sketch.stickyHeader.opacity = 0
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
	else if ( 793  <= mask.scrollY < 1516)
		Sketch.stickyHeader.opacity = 1
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
		fixedContainer.opacity = 1
	else if ( 1516 <= mask.scrollY < 2126 )
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("show")
	else if ( 2126 <= mask.scrollY < 2849 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")
	else if ( 2849 <= mask.scrollY < 3600 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")

