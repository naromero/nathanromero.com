document.body.style.cursor = "auto"
bg = new BackgroundLayer backgroundColor: "#F6F6F6"

mask = new Layer
	width: 1450, height: 1000
mask.scrollVertical = true

# This imports all the layers for "Plans Page v3" into plansPageV3Layers
Sketch = Framer.Importer.load "imported/Plans Page v3"

Sketch.interaction.superLayer = mask

fixedContainer = new Layer
	width: mask.width, height: mask.height, backgroundColor: null
	
# Sticky Header
Sketch.stickyHeader.superLayer = fixedContainer
Sketch.stickyHeader.y = 0
Sketch.stickyHeader.opacity = 0

# Default Animation Options
Framer.Defaults.Animation =
	time: .05

# Center shit
mask.centerX()
fixedContainer.centerX()

# Floating Arrow
animationA = new Animation({
    layer: Sketch.movingArrow,
    properties: {y:21},
    time: .5,
    curve: "ease-in-out",
})

animationB = animationA.reverse()

# Alternate between the two animations
animationA.on(Events.AnimationEnd, animationB.start)
animationB.on(Events.AnimationEnd, animationA.start)

animationA.start()




