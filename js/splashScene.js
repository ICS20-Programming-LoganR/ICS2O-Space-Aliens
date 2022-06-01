/* global Phaser */

// Created by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the splash scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })
  }

  init (data) {                
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Splash Scene')
  }

  create (data) {
  }

  update (time, delta){
  }
}

  export default SplashScene
  