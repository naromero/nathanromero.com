document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#F7F7F7"

# This imports all the layers for "Surface Account Management" into surfaceAccountManagementLayers1
Sketch = Framer.Importer.load "imported/Surface Account Management"

# Make all the imported layers available on the root
for layerGroupName of Sketch
  window[layerGroupName] = Sketch[layerGroupName]
for layerGroupName of Sketch
  Sketch[layerGroupName].originalFrame = window[layerGroupName].framer

# Default Animation Options
Framer.Defaults.Animation =
  curve: "spring(140, 24, 0, 0.1)"

# Centered Mask
centeredLayer = new Layer
	width:  Sketch.interaction.width
	height: Sketch.interaction.height
	scale:0.5
	backgroundColor: null
Sketch.interaction.superLayer = centeredLayer
centeredLayer.center()
window.onresize = -> centeredLayer.center()

# States
container.states.add
	"collapsed": height: 114
cap.states.add
	"collapsed": y: 114
refresh.states.add
	"hidden": opacity: 0
view.states.add
	"hidden": opacity: 0
	
pinContainer.states.add
	"hidden": opacity: 1, x: pinContainer.x + 64
	
# Initial pin states
pinHover.visible = false
pinActive.visible = false
pinContainer.states.switchInstant "hidden"
pin.style.cursor = "pointer"
pinHover.style.cursor = "pointer"
pinActive.style.cursor = "pointer"

tooltipPin.states.add
	"hidden": opacity: 0, y: tooltipPin.y + 10
tooltipUnpin.states.add
	"hidden": opacity: 0, y: tooltipUnpin.y + 10
tooltipPin.states.switchInstant "hidden"
tooltipUnpin.states.switchInstant "hidden"

# Collapsed state on load	
container.states.switchInstant "collapsed"
cap.states.switchInstant "collapsed"
refresh.states.switchInstant "hidden"


# Pin scaling on touch

touchStartAnimation = new Animation
	layer: pinContainer
	properties: scale: 0.9
	curve: "spring(200, 30, 30)"

touchEndAnimation = touchStartAnimation.reverse()
pinContainer.on Events.TouchStart, -> touchStartAnimation.start()
pinContainer.on Events.TouchEnd, -> touchEndAnimation.start()

#Hover Effects

mouseOverHandler = (MouseOver, container) ->
	Utils.delay 0.5, ->
	container.states.switch "default"
	cap.states.switch "default"
	refresh.states.switchInstant "default"
	view.states.switchInstant "hidden"
	pinContainer.states.switch "default"

pinnedMouseOutHandler = (MouseOut, container) ->
	pinContainer.states.switch "hidden"	

container.on(Events.MouseOver, mouseOverHandler)	
mouseOutHandler = (MouseOut, container) ->
	container.states.switch "collapsed"
	cap.states.switch "collapsed"
	refresh.states.switchInstant "hidden"
	view.states.switchInstant "default"
	pinContainer.states.switch "hidden"
container.on(Events.MouseOut, mouseOutHandler)

	
# Pin Events
pinMouseOverHandler = (MouseOver, pin) ->
	pinHover.visible = true
	tooltipPin.states.switch "default"
pin.on(Events.MouseOver, pinMouseOverHandler)

pin.on Events.MouseOut, ->
	pinHover.visible = false
	tooltipPin.states.switch "hidden"
pin.on Events.Click, ->
	pinActive.visible = true
	tooltipPin.states.switch "hidden"
	container.off(Events.MouseOut, mouseOutHandler)
	container.on(Events.MouseOut, pinnedMouseOutHandler)
	
	pinActive.off(Events.MouseOver, paMouseOverHandler)
	Utils.delay 1.0, -> pinActive.on(Events.MouseOver, paMouseOverHandler)
	
pinActive.on Events.Click, ->
	pinActive.visible = false
	tooltipUnpin.states.switch "hidden"
	container.on(Events.MouseOut, mouseOutHandler)
	pin.off(Events.MouseOver, pinMouseOverHandler)
	Utils.delay 1.0, -> pin.on(Events.MouseOver, pinMouseOverHandler)
	
	
paMouseOverHandler = (MouseOver, pinActive) ->
	tooltipUnpin.states.switch "default"
pinActive.on(Events.MouseOver, paMouseOverHandler)	
paMouseOutHandler = (MouseOver, pinActive) ->
	tooltipUnpin.states.switch "hidden"
pinActive.on(Events.MouseOut, paMouseOutHandler)


# tooltip handling

tipArray = [tip1, tip2]
helpArray = [help1, help2]

for each in tipArray
	each.opacity = 0
	each.states.add
		"inView": opacity: 1, x: each.x + 20

for each in helpArray
	each.style.cursor = "help"
	each.states.add
		"hoverState": opacity: 0
	each.on Events.MouseOver, -> this.states.next()
	each.on Events.MouseOut, -> this.states.next()
		
help1.on Events.MouseOver, -> tip1.states.next()
help1.on Events.MouseOut, -> tip1.states.next()
help2.on Events.MouseOver, -> tip2.states.next()
help2.on Events.MouseOut, -> tip2.states.next()

	