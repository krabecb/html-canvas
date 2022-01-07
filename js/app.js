const canvas = document.getElementById("canvas1")
//Gives access to canvas methods
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 500

//Keep track of what keys user pressed in arr
const keys = []
const player = {
	//Players current horizontal position
	x: 0,
	y: 0,
	//Width is calculated by the width of the sprite used
	width: "???",
	height: "???",
	//Horizontal coordinate of frame we cut out from sprite sheet
	//We show only one frame at a time by cropping out and showing only a small portion
	//of an image on a sprite sheet. frameX and frameY will store coordinates of a rectangle we want to
	//crop from our sprite sheet when we are animating the player to show one frame.
	frameX: 0,
	frameY: 0,
	//Speed determines how many pixels we move per frame of animation
	speed: 9,
	//Use a boolean to switch between standing and walking animations
	moving: false
}

const playerSprite = new Image()
playerSprite.src = "./public/brianSpritesheet.png"