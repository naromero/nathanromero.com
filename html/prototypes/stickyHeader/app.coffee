# This imports all the layers for "141212 Sticky Navigation" into 141212StickyNavigationLayers
Sketch = Framer.Importer.load "imported/141212 Sticky Navigation"

document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#9c9c9c"

mask = new Layer
	width: 1164
	height: 1000
mask.addSubLayer(Sketch.bg)
mask.scrollVertical = true

fixedMask = new Layer width: 1164, height: 800, backgroundColor: null
fixedMask.addSubLayer(Sketch.sticky)

mask.centerX()
fixedMask.centerX()

# Default Animation Options
Framer.Defaults.Animation =
	curve: "spring(1400, 80, 2, 1)"
	
# Nav Items
navItems = [Sketch.item1, Sketch.item2, Sketch.item3, Sketch.item4, Sketch.item5, Sketch.item6 ]

for item in navItems
	item.opacity = .5
	item.style.cursor = "pointer"
	item.states.add
		"active": opacity: 1
		
		
#Hover States

Sketch.item1.on Events.MouseOver, ->
	if Sketch.item1.states.current == "default"

		Sketch.item1.states.switch("active")
Sketch.item1.on Events.MouseOut, ->
	if Sketch.item1.states.current == "active"
		print "This is active"
	else
		print "This is inactive, switch state"
	
Sketch.item2.on Events.MouseOver, ->
	Sketch.item2.states.next("active")
Sketch.item2.on Events.MouseOut, ->
	Sketch.item2.states.next("default")
	
Sketch.item3.on Events.MouseOver, ->
	Sketch.item3.states.next("active")
Sketch.item3.on Events.MouseOut, ->
	Sketch.item3.states.next("default")
	
Sketch.item4.on Events.MouseOver, ->
	Sketch.item4.states.next("active")
Sketch.item4.on Events.MouseOut, ->
	Sketch.item4.states.next("default")
	
Sketch.item5.on Events.MouseOver, ->
	Sketch.item5.states.next("active")
Sketch.item5.on Events.MouseOut, ->
	Sketch.item5.states.next("default")
	
Sketch.item6.on Events.MouseOver, ->
	Sketch.item6.states.next("active")
Sketch.item6.on Events.MouseOut, ->
	Sketch.item6.states.next("default")







Sketch.item3.on Events.Click, ->
	mask.scrollPosition = 500		


# Sticky Header Shit
Sketch.sticky.x = 0
Sketch.sticky.y = -Sketch.sticky.height

Sketch.sticky.states.add
	"visible": y: 0

# Underlining
activeLine = new Layer width: 100, height: 2, y: 50, x: Sketch.item1.x, width: Sketch.item1.width, backgroundColor: "#2F9BC2", opacity: 0
activeLine.superLayer = Sketch.sticky
activeLine.states.add
	"p1": x: Sketch.item1.x - 2, width: Sketch.item1.width + 4, opacity: 1
	"p2": x: Sketch.item2.x - 2, width: Sketch.item2.width + 4
	"p3": x: Sketch.item3.x - 2, width: Sketch.item3.width + 4
	"p4": x: Sketch.item4.x - 2, width: Sketch.item4.width + 4
	"p5": x: Sketch.item5.x - 2, width: Sketch.item5.width + 4
	"p6": x: Sketch.item6.x - 2, width: Sketch.item6.width + 4

	


break0 = 104
break1 = 652
break2 = 1108
break3 = 4264
break4 = 5370
break5 = 6744
break6 = 8428

# Smooth scrolling

scrollOffset = 20
scrollCurve = "spring(100,30,0)"

Sketch.item1.on Events.Click, ->
	mask.animate
		properties: {scrollY:break1 + scrollOffset}
		curve: scrollCurve,
		
Sketch.item2.on Events.Click, ->
	mask.off(Events.Scroll)
	print "Something"
# 	Sketch.item2.states.next("active")
# 	activeLine.states.next("p2")
# 	mask.animate
# 		properties: {scrollY:break2 + scrollOffset}
# 		curve: scrollCurve,
		
Sketch.item3.on Events.Click, ->
	mask.animate
		properties: {scrollY:break3 + scrollOffset}
		curve: scrollCurve,

Sketch.item4.on Events.Click, ->
	mask.animate
		properties: {scrollY:break4 + scrollOffset}
		curve: scrollCurve,
		
Sketch.item5.on Events.Click, ->
	mask.animate
		properties: {scrollY:break5 + scrollOffset}
		curve: scrollCurve,
		
Sketch.item6.on Events.Click, ->
	mask.animate
		properties: {scrollY:break6 + scrollOffset}
		curve: scrollCurve,






counter = new Layer

mask.on Events.Scroll, ->
	counter.html = mask.scrollY
	scrollPosition = mask.scrollY
	
	if 0 < scrollPosition < break0
		Sketch.sticky.states.next("default")
		
	else if break0 < scrollPosition < break1
		Sketch.sticky.states.next("visible")
		
		Sketch.item1.states.switch("default")
		Sketch.item2.states.switch("default")
		Sketch.item3.states.switch("default")
		Sketch.item4.states.switch("default")
		Sketch.item5.states.switch("default")
		Sketch.item6.states.switch("default")
		
		activeLine.states.next("default")

		
	else if break1 < scrollPosition < break2
		
		Sketch.item1.states.switch("active")
		Sketch.item2.states.switch("default")
		Sketch.item3.states.switch("default")
		Sketch.item4.states.switch("default")
		Sketch.item5.states.switch("default")
		Sketch.item6.states.switch("default")
		
		activeLine.states.next("p1")
		
	else if break2 < scrollPosition < break3
	
		Sketch.item1.states.switch("default")
		Sketch.item2.states.switch("active")
		Sketch.item3.states.switch("default")
		Sketch.item4.states.switch("default")
		Sketch.item5.states.switch("default")
		Sketch.item6.states.switch("default")
		
		activeLine.states.next("p2")

	else if break3 < scrollPosition < break4
		
		Sketch.item1.states.switch("default")
		Sketch.item2.states.switch("default")
		Sketch.item3.states.switch("active")
		Sketch.item4.states.switch("default")
		Sketch.item5.states.switch("default")
		Sketch.item6.states.switch("default")
		
		activeLine.states.next("p3")
		
	else if break4 < scrollPosition < break5
		
		Sketch.item1.states.switch("default")
		Sketch.item2.states.switch("default")
		Sketch.item3.states.switch("default")
		Sketch.item4.states.switch("active")
		Sketch.item5.states.switch("default")
		Sketch.item6.states.switch("default")
		
		activeLine.states.next("p4")
		
	else if break5 < scrollPosition < break6
		
		Sketch.item1.states.switch("default")
		Sketch.item2.states.switch("default")
		Sketch.item3.states.switch("default")
		Sketch.item4.states.switch("default")
		Sketch.item5.states.switch("active")
		Sketch.item6.states.switch("default")
		
		activeLine.states.next("p5")
		
	else if break6 < scrollPosition
		
		Sketch.item1.states.switch("default")
		Sketch.item2.states.switch("default")
		Sketch.item3.states.switch("default")
		Sketch.item4.states.switch("default")
		Sketch.item5.states.switch("default")
		Sketch.item6.states.switch("active")
		
		activeLine.states.next("p6")





