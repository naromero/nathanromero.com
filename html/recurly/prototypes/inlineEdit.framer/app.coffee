# This imports all the layers for "inlineEdit" into inlineeditLayers
Sketch = Framer.Importer.load "imported/inlineEdit"

bg = new BackgroundLayer backgroundColor: "#F7F8FA"

# Default Animation Options
Framer.Defaults.Animation =
  curve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  time: .3

# Make all the imported layers available on the root
for layerGroupName of Sketch
  window[layerGroupName] = Sketch[layerGroupName]
for layerGroupName of Sketch
  Sketch[layerGroupName].originalFrame = window[layerGroupName].frame

# Centered Mask
centeredLayer = new Layer
	width:  Sketch.interaction.width
	height: Sketch.interaction.height
	scale:0.5
	backgroundColor: null
Sketch.interaction.superLayer = centeredLayer
centeredLayer.center()
window.onresize = -> centeredLayer.center()

offsetValue = 152

form.states.add
	"readOnly": opacity: 0
backdrop.states.add
	"readOnly": opacity: 0
edit.states.add
	"editMode": opacity: 0
ancillarytext.states.add
	"readOnly": y: ancillarytext.y - offsetValue
bottomcap.states.add
	"readOnly": y: bottomcap.y - offsetValue
card2.states.add
	"readOnly": y: card2.y - offsetValue

form.states.switchInstant "readOnly"
backdrop.states.switchInstant "readOnly"
ancillarytext.states.switchInstant "readOnly"
bottomcap.states.switchInstant "readOnly"
card2.states.switchInstant "readOnly"


edit.on Events.Click, ->
	form.states.switch "default"
	backdrop.states.switch "default"
	ancillarytext.states.switch "default"
	bottomcap.states.switch "default"
	card2.states.switch "default"
	
	edit.states.switch "editMode"

actions.on Events.Click, ->
	form.states.switch "readOnly"
	backdrop.states.switch "readOnly"
	ancillarytext.states.switch "readOnly"
	bottomcap.states.switch "readOnly"
	card2.states.switch "readOnly"
	
	edit.states.switch "default"
	




