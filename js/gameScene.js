/* global Phaser */

// Copyright: Mr Coxall
// Modified by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the game scene

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'gameScene' })

    //assign the background
    this.background = null
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
  }

  create (data) {
    //set the location of the background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0,0)
  }
  //determine how long the scene will show for
  update (time, delta){
  }
}

  export default GameScene
  