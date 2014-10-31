# This imports all the layers for "pricingPrototype" into pricingprototypeLayers
Sketch = Framer.Importer.load "imported/pricingPrototype"

mask = new Layer
mask.width = 1436
mask.height = 1100

mask.scrollVertical = true

Sketch.prototype.superLayer = mask
mask.centerX()

# Default Animation Options
Framer.Defaults.Animation =
	curve: "spring(300, 30, 0, 0.1)"

# Initial State
Sketch["monthlyToggle"].opacity = .5
Sketch["monthlyToggle"].opacity = 0
Sketch["monthlyToggle"].y = 722

Sketch["monthlyToggle"].states.add
	"show": { opacity: 1, y: 692 }
Sketch["annualToggle"].states.add
	"hide": { opacity: 0, y: 662 }

Sketch["monthlyToggle"].states.add
	"active" : { opacity: 1 }	
	
Sketch["annualToggle"].states.add
	"inactive" : { opacity: .5 }

Sketch["slider"].states.add
	"right": { x: 718 }
	
Sketch["features"].states.add
	"hide": { y: 813 }
	

# Click Event
a = true

Sketch["sliderBacking"].on Events.Click, ->
	if a is true
		offsetA = 0
		offsetB = 0.125
		a = false
	else
		offsetA = 0.125
		offsetB = 0
		a = true
	Utils.delay offsetA, ->
		Sketch["slider"].states.next()
		Sketch["annualToggle"].states.next()
		Sketch["monthlyToggle"].states.next()
		Sketch["features"].states.next()	
	Utils.delay offsetB, ->
		Sketch["annualToggle"].states.next()
		Sketch["monthlyToggle"].states.next()
		offsetB = 1
		


	
	


	
	



