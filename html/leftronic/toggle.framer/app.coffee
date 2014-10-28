mask = new Layer
mask.width = 1436
mask.height = 1100

mask.scrollVertical = true

# This imports all the layers for "Verification Prototype" into verificationPrototypeLayers
Sketch = Framer.Importer.load "imported/Verification Prototype"

Sketch.pricing.superLayer = mask
mask.center()

# Default Animation Options
Framer.Defaults.Animation =
	curve: "spring(300, 30, 0, 0.1)"

# Initial State
Sketch["monthlyToggle"].opacity = .5
Sketch["monthlyPrice"].opacity = 0
Sketch["monthlyPrice"].y = 722

Sketch["monthlyPrice"].states.add
	"show": { opacity: 1, y: 692 }
Sketch["annualPrice"].states.add
	"hide": { opacity: 0, y: 662 }

Sketch["monthlyToggle"].states.add
	"active" : { opacity: 1 }	
	
Sketch["annualToggle"].states.add
	"inactive" : { opacity: .5 }

Sketch["toggleSlider"].states.add
	"right": { x: 718 }
	
Sketch["features"].states.add
	"hide": { y: 813 }
	

Sketch["toggleBack"].on Events.Click, ->
	Sketch["toggleSlider"].states.next()
	Sketch["annualToggle"].states.next()
	Sketch["monthlyToggle"].states.next()
	Sketch["features"].states.next()
	Utils.delay 0.15, ->
		Sketch["annualPrice"].states.next()
		Sketch["monthlyPrice"].states.next()
		


	
	


	
	



