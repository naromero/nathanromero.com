document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#eaeaea"

# This imports all the layers for "import prototype" into importPrototypeLayers
Sketch = Framer.Importer.load "imported/import prototype"

mask = new Layer
	width: Sketch.proto.width
	height: 1000
	backgroundColor: null

mask.scrollVertical= true

Sketch.proto.superLayer = mask
mask.centerX()

# Options
Sketch.passwordManager.opacity = 0

Sketch.samlDeselected.on Events.Click, ->
	Sketch.passwordManager.opacity = 0
	Sketch.saml.opacity = 1

Sketch.pwDeselected.on Events.Click, ->
	Sketch.saml.opacity = 0
	Sketch.passwordManager.opacity = 1

		