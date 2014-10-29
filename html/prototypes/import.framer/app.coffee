
centeredLayer = new Layer
	width:  1400
	height: 1000
	backgroundColor: "nil"
	
centeredLayer.scrollVertical = true
centeredLayer.center()

# Center it again on resizing the screen
window.onresize = -> centeredLayer.center()

# This imports all the layers for "import prototype" into importPrototypeLayers1
Sketch = Framer.Importer.load "imported/import prototype"
Sketch.import.superLayer = centeredLayer

# Inital State
Sketch["pw"].opacity = 0
Sketch["bookmark"].opacity = 0

# Click Events
Sketch["pwDeselected"].on Events.Click, ->
	Sketch["pw"].opacity = 1
	Sketch["bookmark"].opacity = 0
	Sketch["saml"].opacity = 0
Sketch["bookmarkDeselected"].on Events.Click, ->
	Sketch["pw"].opacity = 0
	Sketch["bookmark"].opacity = 1
	Sketch["saml"].opacity = 0
Sketch["samlDeselected"].on Events.Click, ->
	Sketch["pw"].opacity = 0
	Sketch["bookmark"].opacity = 0
	Sketch["saml"].opacity = 1


	
	
