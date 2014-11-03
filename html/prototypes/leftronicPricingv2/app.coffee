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
Sketch["monthlyPrice"].opacity = 0
Sketch["monthlyPrice"].y = 568


Sketch["sliderGreen"].states.add
	"hide": { opacity: 0 }
Sketch["greenDivide"].states.add
	"hide": { opacity: 0 }



Sketch["monthlyPrice"].states.add
	"show": { opacity: 1, y: 528 }
Sketch["annualPrice"].states.add
	"hide": { opacity: 0, y: 478 }

Sketch["monthlyToggle"].states.add
	"active" : { opacity: 1 }	
	
Sketch["annualToggle"].states.add
	"inactive" : { opacity: .5 }

Sketch["slider"].states.add
	"right": { x: 719 }
	
Sketch["features"].states.add
	"hide": { y: 653 }
	

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
		Sketch["sliderGreen"].states.next()
		Sketch["greenDivide"].states.next()
		Sketch["annualToggle"].states.next()
		Sketch["monthlyToggle"].states.next()
		Sketch["features"].states.next()	
	Utils.delay offsetB, ->
		Sketch["annualPrice"].states.next()
		Sketch["monthlyPrice"].states.next()
		offsetB = 1
		


	
	


	
	



