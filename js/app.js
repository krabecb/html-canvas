 const canvas = document.getElementById("canvas1")
//Gives access to canvas methods
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 500

//Keep track of what keys user pressed in arr
const keys = []
const player = {
	//Players current horizontal position
	x: 200,
	y: 300,
	//Width is calculated by the width of the sprite used
	//Calculated by finding the width of the png and dividing by amount of columns
	width: 64,
	//Calculated by finding the height of the png and dividing by amount of rows
	height: 64,
	//Horizontal coordinate of frame we cut out from sprite sheet
	//We show only one frame at a time by cropping out and showing only a small portion
	//of an image on a sprite sheet. frameX and frameY will store coordinates of a rectangle we want to
	//crop from our sprite sheet when we are animating the player to show one frame
	frameX: 0,
	frameY: 0,
	//Speed determines how many pixels we move per frame of animation
	speed: 9,
	//Use a boolean to switch between standing and walking animations
	moving: false
}

const playerSprite = new Image()
playerSprite.src = "./public/brianSpritesheet.png"

//Create background
const background = new Image()
background.src = "./public/background.png"

//Want to see the infinite animation loop working? replace the first 0 in drawImage() with position and then add position++ right below ctx.drawImage() and save
// let position = 0

//sX, sY, sW, sH: Area we want to crop from the spritesheet
//dX, dY, dW, dH: Where want to draw image on the canvas
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)  
}



setInterval( () => {

})

function movePlayer() {
	//player.y > 100: If the y position of the player is more than 100px away from the top of the canvas
	if(keys[38] && player.y > 100) {
		//Move player in negative direction along the vertical axis
		player.y -= player.speed
		player.frameY = 1
		player.moving = true
	//Left
	} else if(keys[37] && player.x > 0) {
		player.x -= player.speed
		player.frameY = 1
		player.moving = true
	//Down
	} else if(keys[40] && player.y < canvas.height - player.height - 10) {
		player.y += player.speed
		player.frameY = 1
		player.moving = true
	//Right
	} else if(keys[39] && player.x < canvas.width - player.width) {
		player.x += player.speed
		player.frameY = 1
		player.moving = true
	}
}

function handlePlayerFrame() {
	if(player.frameX < 7 && player.moving) {
		console.log("yes!")
		player.frameY = 1
		player.frameX++
		console.log(player.frameX, player.frameY)
	} else {
		player.frameX = 0
		player.frameY = 0
	}
}




window.addEventListener("keydown", (e) => {
	//This syntax simply add the keycode to the keys arr
	keys[e.keyCode] = true
	// console.log("Here is the keys arr: ", keys)
	player.moving = true
})

window.addEventListener("keyup", (e) => {
	delete keys[e.keyCode]
	player.moving = false
})

//REF:
// function animate() {
// 	// ctx.clearRect(0, 0, canvas.width, canvas.height) //<--Including this while position variable and increment is active will resolve trailing effect of background moving
// 	//short version that takes 5 arguments: background, second and third arg are coordinates of top left coordinates to start drawing from
// 	//last two args are width and height of the area we want our image to fit into. Make it cover the entire canvas by saying cavas.width and canvas.height
// 	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
// 	drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
// 	movePlayer()
// 	handlePlayerFrame()
// 	//Pass in name of parent function. This runs it again and again creating animation loop
// 	requestAnimationFrame(animate)
// }

// animate()

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
	fpsInterval = 1000/fps //How long we wait until we serve the next frame
	then = Date.now() 
	startTime = then //Freeze that time in this variable
	animate()
}

function animate() {
	requestAnimationFrame(animate) //Calls itself recursively
	now = Date.now()
	elapsed = now - then
	if(elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval)
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
		drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
		movePlayer()
		handlePlayerFrame()
	}
}
startAnimating(10)







