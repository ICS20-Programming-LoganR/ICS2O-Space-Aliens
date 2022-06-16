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
    //randomly decide which direction the duck will move in
    duckXVelocity *= Math.round(Math.random()) ? 1 : - 1
    const aDuck = this.physics.add.sprite(duckXLocation, -100, 'duck')
    //make the duck move
    aDuck.body.velocity.y = 200
    aDuck.body.velocity.x = duckXVelocity
    this.duckGroup.add(aDuck)

    if (aDuck.body.y == 0){
      aDuck.body.location.y = -100
      aDuck.body.location.x = Math.floor(Math.random() * 1920) + 1
    }
  }
  
  constructor () {
    super({ key: 'gameScene' })

    //declare the background
    this.background = null
    //declare the spaceship
    this.ship = null
    //declare the missiles
    this.fireMissile = false
    //declare the score
    this.score = 0
    this.scoreText = null
    //font for the score
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }

    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center'}
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
    //load the explosion of the duck
    this.load.image('kaboom', 'assets/kaboom.gif')
    //load the background music (Funny Bit by David Renda)
    this.load.audio('music', 'assets/BGMusic.mp3')
    //load the sound when the missile is fired
    this.load.audio('laser', 'assets/laser1.wav')
    //load the sounds when the duck is shot and blows up in a comical manner
    this.load.audio('explosion', 'assets/barrelExploding.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
    this.load.audio('quack', 'assets/quack.mp3')
  }

  create (data) {
    //set the location of the background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)
    //play the music
    this.sound.play('music')
    //show the score on screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    
  //give the spaceship physics and determine its starting position
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(4.0)

    //create a group of missiles
    this.missileGroup = this.physics.add.group()

    //create a group for the ducks
    this.duckGroup = this.add.group()
    this.createDuck()

    //collisions between the missiles and the ducks
    this.physics.add.collider(this.missileGroup, this.duckGroup, function (missileCollide, duckCollide) {
      //delete the duck and missile when they collide
      missileCollide.destroy()
      //make the duck explode in a comical manner
      duckCollide.destroy()
      //play the sounds
      this.sound.play('explosion')
      this.sound.play('quack')
      //add to the score
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      //create two ducks for every duck that is destroyed
      this.createDuck()
      this.createDuck()
    }.bind(this))
//collisions between the ship and ducks

    //game over screen
    this.physics.add.collider(this.ship, this.duckGroup, function (shipCollide, duckCollide) {
      //stop the music
      this.game.sound.stopAll()
      //play the sound
      this.sound.play('bomb')
      //stop all movement
      this.physics.pause()
      //delete the duck and ship
      duckCollide.destroy()
      shipCollide.destroy()
      //text when the game ends
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to restart.', this.gameOverTextStyle).setOrigin(0.5)
      //find out if the user quits the game or not
      this.gameOverText.setInteractive({ useHandCursor: true })
      //return to the game scene if the player continues
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      //reset the score when the game ends
      this.score = 0
    }.bind(this))
    
  }
  //determine how long the scene will show for
  update (time, delta){
    // called 60 times a second, hopefully.

    //declare variables to check for an input on the keyboard
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keyUpObj = this.input.keyboard.addKey('UP')
    const keyDownObj = this.input.keyboard.addKey('DOWN')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    //make the Duck warp to the top of the screen when shot
    this.duckGroup.children.each(function (item) {
      if (item.y > 1080){
        item.y = 0
        const duckXCoordinate = Math.floor(Math.random() * 1920) + 1
        item.x = duckXCoordinate
      }
    })

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
    //make an if statement for if the up key is being pressed down
    if(keyUpObj.isDown === true) {
      //move the ship left
      this.ship.y = this.ship.y - 15
      //prevent the ship from moving off the screen
      if (this.ship.y > 1080) {
        this.ship.y = 1080
      }
    }
    //make an if statement for if the down key is being pressed down
    if(keyDownObj.isDown === true) {
      //move the ship left
      this.ship.y = this.ship.y + 15
      //prevent the ship from moving off the screen
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }
    //create an if statement for if the space bar is being pressed down
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
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
  