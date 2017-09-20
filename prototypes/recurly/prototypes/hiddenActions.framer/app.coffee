document.body.style.cursor = "auto"

bg = new BackgroundLayer backgroundColor: "#F7F8FA"
# This imports all the layers for "hidden table rows" into hiddenTableRowsLayers
Sketch = Framer.Importer.load "imported/hidden table rows"

# Centered Mask
centeredLayer = new Layer
	width:  Sketch.interaction.width
	height: Sketch.interaction.height
	scale:0.5
	backgroundColor: null
Sketch.interaction.superLayer = centeredLayer
centeredLayer.center()
window.onresize = -> centeredLayer.center()

for each in Sketch.rows.subLayers
	moreIcon = new Layer width: 40, height: 40, x: 1060, y: 28, superLayer:each, image: "images/moreIcon.png"
	actions = new Layer width: 204, height: 34, x: 938, y: 31, superLayer: each, image: "images/actions.png", opacity: 0
	each.subLayers[0].states.add "hide": opacity: 0, scale: 0
	each.subLayers[1].states.add "show": opacity: 1, x: 898, scale: 1
	
	each.on Events.MouseOver, ->
		@.subLayers[0].states.next()
		@.subLayers[1].states.next()
	each.on Events.MouseOut, ->
		@.subLayers[0].states.next()
		@.subLayers[1].states.next()
	
# Default Animation Options
Framer.Defaults.Animation =
  curve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  time: .3