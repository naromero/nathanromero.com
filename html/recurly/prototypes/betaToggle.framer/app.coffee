document.body.style.cursor = "auto"

# Default Animation Options
Framer.Defaults.Animation =
  curve: "spring(260, 30, 0, 0.1)"

# This imports all the layers for "beta_toggle" into beta_toggleLayers1
Sketch = Framer.Importer.load "imported/beta_toggle"

# Make all the imported layers available on the root
for layerGroupName of Sketch
  window[layerGroupName] = Sketch[layerGroupName]
for layerGroupName of Sketch
  Sketch[layerGroupName].originalFrame = window[layerGroupName].frame

bg = new BackgroundLayer backgroundColor: "#F2F2F2"
# Centered Mask
centeredLayer = new Layer
	width:  Sketch.toolbarDark.width
	height: Sketch.toolbarDark.height - 100
	backgroundColor: null
	
Sketch.toolbarDark.superLayer = centeredLayer
centeredLayer.center()
window.onresize = -> centeredLayer.center()

# States
messageHeight = messages.height
movingLayers = [messages, ui]
for each in movingLayers
	each.states.add
		"hidden": y: each.y - messageHeight
		
pointers = [expand, collapse, switch1, switch2, feedback]
for each in pointers
	each.style.cursor = "pointer"

expand.states.add
	"hidden": y: expand.y - 100
expand.states.switchInstant "hidden"

# Initial Setup
newScreen.visible = false

# Hover State Stuff
hoverAreas = [switch1Default, switch2Default ]
for each in hoverAreas
	each.states.add
		"hovered": visible: false

switch1.on Events.MouseOver, ->
	switch1Default.visible = false
switch1.on Events.MouseOut, ->
	switch1Default.visible = true

switch2.on Events.MouseOver, ->
	switch2Default.visible = false
switch2.on Events.MouseOut, ->
	switch2Default.visible = true
	


		
# Click Events		
collapse.on Events.Click, (e) ->
	for each in movingLayers
		each.states.switch "hidden"
	expand.states.switch "default"
expand.on Events.Click, (e) ->
	for	each in movingLayers
		each.states.switch "default"
	expand.states.switch "hidden"
	
switch1.on Events.Click, ->
	messageOld.visible = false
	newScreen.visible = true
	
switch2.on Events.Click, ->
	messageOld.visible = true
	newScreen.visible = false

newScreen.on Events.Click, ->
	messageOld.visible = false
	mesageNew.visible = false
	newScreen.visible = false
	for	each in movingLayers
		each.states.switch "default"
	expand.states.switch "hidden"

	