document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#9c9c9c"


# This imports all the layers for "Plans Page" into plansPageLayers
Sketch = Framer.Importer.load "imported/Plans Page"

mask = new Layer
	width: Sketch.interaction.width, height: 1000
mask.scrollVertical = true

fixedContainer = new Layer
	width: mask.width, height: mask.height, backgroundColor: null
	
# Default Animation Options
Framer.Defaults.Animation =
	time: .05
	
Sketch.dlBtn.opacity = 0

# Tooltip stuff
Sketch.tooltip.opacity = 0
Sketch.hovereffect.opacity = 0
Sketch.hovereffect.style.cursor = "help"
Sketch.tooltip.states.add
	"show": opacity: 1
Sketch.hovereffect.states.add
	"show": opacity: 1
Sketch.hovereffect.on Events.MouseOver, ->
	Sketch.tooltip.states.next("show")
	Sketch.hovereffect.states.next("show")
Sketch.hovereffect.on Events.MouseOut, ->
	Sketch.tooltip.states.next("default")
	Sketch.hovereffect.states.next("default")
	
Sketch.tooltip2.opacity = 0
Sketch.hovereffect2.opacity = 0
Sketch.hovereffect2.style.cursor = "help"
Sketch.tooltip2.states.add
	"show": opacity: 1
Sketch.hovereffect2.states.add
	"show": opacity: 1
Sketch.hovereffect2.on Events.MouseOver, ->
	Sketch.tooltip2.states.next("show")
	Sketch.hovereffect2.states.next("show")
Sketch.hovereffect2.on Events.MouseOut, ->
	Sketch.tooltip2.states.next("default")
	Sketch.hovereffect2.states.next("default")

Sketch.tooltip3.opacity = 0
Sketch.hovereffect3.opacity = 0
Sketch.hovereffect3.style.cursor = "help"
Sketch.tooltip3.states.add
	"show": opacity: 1
Sketch.hovereffect3.states.add
	"show": opacity: 1
Sketch.hovereffect3.on Events.MouseOver, ->
	Sketch.tooltip3.states.next("show")
	Sketch.hovereffect3.states.next("show")
Sketch.hovereffect3.on Events.MouseOut, ->
	Sketch.tooltip3.states.next("default")
	Sketch.hovereffect3.states.next("default")
	
Sketch.tooltip4.opacity = 0
Sketch.hovereffect4.opacity = 0
Sketch.hovereffect4.style.cursor = "help"
Sketch.tooltip4.states.add
	"show": opacity: 1
Sketch.hovereffect4.states.add
	"show": opacity: 1
Sketch.hovereffect4.on Events.MouseOver, ->
	Sketch.tooltip4.states.next("show")
	Sketch.hovereffect4.states.next("show")
Sketch.hovereffect4.on Events.MouseOut, ->
	Sketch.tooltip4.states.next("default")
	Sketch.hovereffect4.states.next("default")
	
Sketch.tooltip5.opacity = 0
Sketch.hovereffect5.opacity = 0
Sketch.hovereffect5.style.cursor = "help"
Sketch.tooltip5.states.add
	"show": opacity: 1
Sketch.hovereffect5.states.add
	"show": opacity: 1
Sketch.hovereffect5.on Events.MouseOver, ->
	Sketch.tooltip5.states.next("show")
	Sketch.hovereffect5.states.next("show")
Sketch.hovereffect5.on Events.MouseOut, ->
	Sketch.tooltip5.states.next("default")
	Sketch.hovereffect5.states.next("default")
	
Sketch.dlBtn.opacity = 0
Sketch.dlBtn.states.add
	"show": opacity: 1
	
# Set up some states
Sketch.header1.states.add
	"show": opacity: 1
	"hide": opacity: 0
# Set up some states
Sketch.header2.states.add
	"show": opacity: 1
	"hide": opacity: 0
# Set up some states
Sketch.header3.states.add
	"show": opacity: 1
	"hide": opacity: 0
# Set up some states
Sketch.header4.states.add
	"show": opacity: 1
	"hide": opacity: 0

fixedContainer.opacity = 0

Sketch.interaction.superLayer = mask
mask.centerX()
fixedContainer.centerX()

Sketch.stickyHeader.superLayer = fixedContainer
Sketch.stickyHeader.y = 0

# Animate Header background out on scroll
mask.on Events.Scroll, ->
	if ( 0 <= mask.scrollY < 759)
		fixedContainer.opacity = 0
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
		Sketch.header3.states.next("hide")
		Sketch.header4.states.next("hide")
		Sketch.dlBtn.states.next("default")
	else if ( 759 <= mask.scrollY < 1482)
		Sketch.header1.states.next("show")
		Sketch.header2.states.next("hide")
		Sketch.header3.states.next("hide")
		Sketch.header4.states.next("hide")
		fixedContainer.opacity = 1
		Sketch.dlBtn.states.next("show")
	else if ( 1482 <= mask.scrollY < 2206 )
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("show")
		Sketch.header3.states.next("hide")
		Sketch.header4.states.next("hide")
	else if ( 2206 <= mask.scrollY < 2929 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")
		Sketch.header3.states.next("show")
		Sketch.header4.states.next("hide")
	else if ( 2929 <= mask.scrollY < 3680 )	
		Sketch.header1.states.next("hide")
		Sketch.header2.states.next("hide")
		Sketch.header3.states.next("hide")
		Sketch.header4.states.next("show")

