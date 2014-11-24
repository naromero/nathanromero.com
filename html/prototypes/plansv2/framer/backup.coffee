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

# Set up some states
Sketch.header1.states.add
	"show": opacity: 1
	"hide": opacity: 0
Sketch.header2.states.add
	"show": opacity: 1
	"hide": opacity: 0

mask.on Events.Scroll, ->
	if ( 0 <= mask.scrollY < 836)
		Sketch.stickyHeader.opacity = 0
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
	else if ( 836 <= mask.scrollY < 1559)
		Sketch.stickyHeader.opacity = 1
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
		fixedContainer.opacity = 1
	else if ( 1559 <= mask.scrollY < 2206 )
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("show")
	else if ( 2206 <= mask.scrollY < 2929 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")
	else if ( 2929 <= mask.scrollY < 3680 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")

