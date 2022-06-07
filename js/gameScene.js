/* global Phaser */

// Copyright: Mr Coxall
// Modified by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the game scene

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'gameScene' })

    //declare the background
    this.background = null
    //declare the spaceship
    this.ship = null
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
    this.load.image('ship', 'assets/spaceShip.png')
  }

  create (data) {
    //set the location of the background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)
  //give the spaceship physics and determine its starting position
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
  }
  //determine how long the scene will show for
  update (time, delta){
  }
}

  export default GameScene
  