# This imports all the layers for "vat-animation" into vatAnimationLayers
vatAnimationLayers = Framer.Importer.load "imported/vat-animation"

animate = new Layer

vatAnimationLayers.tooltip.opacity = 0
vatAnimationLayers.country.opacity = 0
vatAnimationLayers.tooltip2.opacity = 0
vatAnimationLayers.country2.opacity = 0
vatAnimationLayers.tooltip3.opacity = 0
vatAnimationLayers.country3.opacity = 0

delayOffset = .5

animate.on Events.Click, ->
	vatAnimationLayers.country.animate
		properties: { opacity: 1 }
		time: .75
	vatAnimationLayers.tooltip.animate
		properties: { opacity: 1, y: vatAnimationLayers.tooltip.y - 30 }
		delay: .25
		curve: "spring(120, 12, 5, .9)"
	
	vatAnimationLayers.country2.animate
		properties: { opacity: 1 }
		time: .75
		delay: .5
	vatAnimationLayers.tooltip2.animate
		properties: { opacity: 1, y: vatAnimationLayers.tooltip2.y - 30 }
		delay: .75
		curve: "spring(120, 12, 5, .9)"

	vatAnimationLayers.country3.animate
		properties: { opacity: 1 }
		time: .75
		delay: .75
	vatAnimationLayers.tooltip3.animate
		properties: { opacity: 1, y: vatAnimationLayers.tooltip3.y - 30 }
		delay: 1
		curve: "spring(120, 12, 5, .9)"


		
	


