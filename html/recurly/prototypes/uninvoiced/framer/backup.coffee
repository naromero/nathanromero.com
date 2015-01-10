
# This imports all the layers for "Uninvoiced Items" into uninvoicedItemsLayers1
Sketch = Framer.Importer.load "imported/Uninvoiced Items"

# Centered Mask
centeredLayer = new Layer
	width:  Sketch.screen.width
	height: Sketch.screen.height - 1
Sketch.screen.superLayer = centeredLayer


# Default Animation Options
Framer.Defaults.Animation =
  curve: "spring(260, 30, 0, 0.1)"


# Initial Configuration
Sketch.dialog.opacity = 0
Sketch.tooltip.opacity = 0
Sketch.newAlert.opacity = 0
Sketch.newAlert.y -= 40
Sketch.oneTimeCharge.visible = false

document.body.style.cursor = "auto"



# State Configuration
Sketch.dialog.states.add
	"open": opacity: 1
	
Sketch.table.states.add
	"alertOpen": y: Sketch.table.y + Sketch.newAlert.height + 20
	
Sketch.newAlert.states.add
	"open": opacity: 1, y: Sketch.newAlert.y + 40
	
Sketch.recurringCharges.states.add
	"added": y: Sketch.recurringCharges.y + Sketch.oneTimeCharge.height - 1
	
Sketch.oneTimeCharge.states.add
	"added": opacity: 1, y: Sketch.oneTimeCharge.y + Sketch.oneTimeCharge.height  - 3
	
Sketch.tooltip.states.add
	"visible": opacity: 1

# Event Listeners
Sketch.bg.on Events.Click, ->
	Sketch.dialog.states.switch "open"
	
Sketch.footer.on Events.Click, ->
	# Kill modal
	Sketch.dialog.states.switch "default"
	
	# Move recurring charges down and add one time charge to table
	Sketch.recurringCharges.y = Sketch.recurringCharges.y + Sketch.oneTimeCharge.height - 1
	Sketch.oneTimeCharge.visible = true
	Sketch.oneTimeCharge.y += Sketch.oneTimeCharge.height - 3
	
	Utils.delay 0.75, ->
		Sketch.newAlert.states.switch "open"
		Sketch.table.states.switch "alertOpen"
		
Sketch.uninvoiced.on Events.MouseOver, ->
	document.body.style.cursor = "help"
	Sketch.tooltip.states.switch "visible"
Sketch.uninvoiced.on Events.MouseOut, ->
	document.body.style.cursor = "auto"
	Sketch.tooltip.states.switch "default"
