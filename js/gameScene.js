/* global Phaser */

// Copyright: Mr Coxall
// Modified by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the game scene

class GameScene extends Phaser.Scene {

  // create a duck
  createDuck() {
    //generate a random location for a duck to be spawned
    const duckXLocation = Math.floor(Math.random() * 1920) + 1
    //change the X velocity of the duck velocity
    let duckXVelocity = Math.floor(Math.random() * 50) + 1
    //randomlt decide which direction the duck will move in
    duckXVelocity *= Math.round(Math.random()) ? 1 : - 1
    const aDuck = this.physics.add.sprite(duckXLocation, -100, 'duck').setScale(4.5)
    //make the duck move
    aDuck.body.velocity.y = 200
    aDuck.body.velocity.x = duckXVelocity
    this.duckGroup.add(aDuck)
  }
  
  constructor () {
    super({ key: 'gameScene' })

    //declare the background
    this.background = null
    //declare the spaceship
    this.ship = null
    //declare the missiles
    this.fireMissile = false
  }

  //set the background colour
  init (data) {
 this.cameras.main.setBackgroundColor('#ffffff')
  }

  //tell the console that it is in game scene
  preload () {
    console.log('Game Scene')
    //load the image
    this.load.image('starBackground', 'assets/starBackground.png')
    //load the spaceship
    this.load.image('ship', 'assets/spaceShip.png')
    //load the missile
    this.load.image('missile', 'assets/missile.png')
    //load the duck
    this.load.image('duck', 'assets/duck.png')
    //load the sound when the missile is fired
    this.load.audio('laser', 'assets/laser1.wav')
  }

  create (data) {
    //set the location of the background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)
  //give the spaceship physics and determine its starting position
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

    //create a group of missiles
    this.missileGroup = this.physics.add.group()

    //create a group for the ducks
    this.duckGroup = this.add.group()
    this.createDuck()
  }
  //determine how long the scene will show for
  update (time, delta){
    // called 60 times a second, hopefully.

    //declare variables to check for an input on the keyboard
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    //make an if statement for if the left key is being pressed down
    if(keyLeftObj.isDown === true) {
      //move the ship left
      this.ship.x = this.ship.x - 15
      //prevent the ship from moving off the screen
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }
    //make an if statement for if the right key is being pressed down
    if(keyRightObj.isDown === true) {
      //move the ship right
      this.ship.x = this.ship.x + 15
      //prevent the ship from moving off the screen
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }
    //create an if statement for if the space bar is being pressed down
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(2.0)
        this.missileGroup.add(aNewMissile)
        //make the sound play when a missile is fired
        this.sound.play('laser')
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
//make it so the missile will move after being shot
   this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
     //delete the missiles when they move off screen
     if(item.y < 0) {
       item.destroy
     }
    })
  }
}

  export default GameScene
  