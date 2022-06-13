/* global Phaser */

// Copyright: Mr Coxall
// Modified by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the splash scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })
  }

  //load the images and background colour
  init (data) {                
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // load the image
  preload () {
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
  }
  //determine the location of the sprite
  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  //determine how long the scene will stay on the screen (ms)
  update (time, delta){
    if (time > 3000){
      this.scene.switch('titleScene')  
    }
  }
}

  export default SplashScene
  