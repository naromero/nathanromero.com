document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#F7F7F7"

# This imports all the layers for "Subscriptions" into subscriptionsLayers
Sketch = Framer.Importer.load "imported/Subscriptions"

# Default Animation Options
Framer.Defaults.Animation =
  curve: "spring(260, 30, 0, 0.1)"

# Make all the imported layers available on the root
for layerGroupName of Sketch
  window[layerGroupName] = Sketch[layerGroupName]
for layerGroupName of Sketch
  Sketch[layerGroupName].originalFrame = window[layerGroupName].frame

# Centered Mask
centeredLayer = new Layer
	width:  Sketch.interaction2.width
	height: Sketch.interaction2.height
	scale:0.5
	backgroundColor: null
Sketch.interaction2.superLayer = centeredLayer
centeredLayer.center()
window.onresize = -> centeredLayer.center()

# Initial Config
capHide.visible = false
plan2.y = plan1.y
plan3.y = plan1.y
toggle.style.cursor = "pointer"
capHide.visible = false

# States

gutter = 38

plan2.states.add
	"show": y: plan1.y + plan2.height + gutter
plan3.states.add
	"hidden": y: plan1.y + 2*plan3.height + 2*gutter
toggle.states.add
	"hidden": y: plan1.y + 3*plan3.height + 3*gutter
capHide.states.add
	"show": visible: true
	
# Hover Interaction
capHideHover.opacity = 0
capShowHover.opacity = 0

hoverShow = new Animation
	layer: capShowHover
	properties:
		opacity: 1
	curve: "ease-in-out"
	time: .1
hoverHide = hoverShow.reverse()
	
toggle.on Events.MouseOver, ->
	hoverShow.start()
toggle.on Events.MouseOut, ->
	hoverHide.start()
	
	

# Click Events

toggle.on Events.Click, ->
	plan2.states.next()
	plan3.states.next()
	toggle.states.next()
	capShow.states.next()
	capHide.states.next()
