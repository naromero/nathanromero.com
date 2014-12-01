document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#9c9c9c"

mask = new Layer
	width: 1450, height: 1000, backgroundColor: "#F6F6F6"	
mask.scrollVertical = true

# This imports all the layers for "Plans Page v3" into plansPageV3Layers
Sketch = Framer.Importer.load "imported/Plans Page v3"

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
    layer: Sketch.movingArrow,
    properties: {y:21},
    time: .5,
    curve: "ease-in-out",
})

animationB = animationA.reverse()

# Alternate between the two animations
animationA.on(Events.AnimationEnd, animationB.start)
animationB.on(Events.AnimationEnd, animationA.start)

animationA.start()

# Set up some states
Sketch.header1.states.add
	"show": opacity: 1
	"hide": opacity: 0
Sketch.header2.states.add
	"show": opacity: 1
	"hide": opacity: 0
	
mask.on Events.Scroll, ->
	
	if ( 0 <= mask.scrollY < 730)
		Sketch.stickyHeader.opacity = 0
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
	else if ( 730  <= mask.scrollY < 1453)
		Sketch.stickyHeader.opacity = 1
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
		fixedContainer.opacity = 1
	else if ( 1453 <= mask.scrollY < 2063 )
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("show")
	else if ( 2063 <= mask.scrollY < 2786 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")
	else if ( 2786 <= mask.scrollY < 3600 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")





