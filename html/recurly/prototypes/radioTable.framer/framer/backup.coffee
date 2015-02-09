# This imports all the layers for "selectableTables" into selectabletablesLayers
Sketch = Framer.Importer.load "imported/selectableTables"

# Doc setup
document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#F7F7F7"


# Make all the imported layers available on the root
for layerGroupName of Sketch
  window[layerGroupName] = Sketch[layerGroupName]
for layerGroupName of Sketch
  Sketch[layerGroupName].originalFrame = window[layerGroupName].frame

# Centered Mask
centeredLayer = new Layer
	width:  Sketch.interactionRadio.width
	height: Sketch.interactionRadio.height
	scale:0.5
	backgroundColor: null
Sketch.interactionRadio.superLayer = centeredLayer
centeredLayer.center()
window.onresize = -> centeredLayer.center()

# Hover and Interactions
for each in rows.subLayers
	each.style.cursor = "pointer"
	each.subLayers[2].visible = false
	each.subLayers[1].visible = false
	
	each.on Events.MouseOver, -> @.subLayers[1].visible = true
	each.on Events.MouseOut,  -> @.subLayers[1].visible = false
	
	each.on Events.Click, ->
		@.subLayers[2].visible = true
		for each in @.siblingLayers
			each.subLayers[2].visible = false
				
# Initial Config
row1.subLayers[2].visible = true