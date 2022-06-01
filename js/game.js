/* global Phaser */

// created by Logan Rodriguez
//
// created on May-Jun 2022
// this file defines function for the game

import SplashScene from './splashScene.js'

const splashScene = new SplashScene()

// game scene
const config = {
  type: Phaser.AUTO,
  width: 1920, 
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  //set the background colour
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    // place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

// load scenes
// every key used can not be reused
game.scene.add('splashScene', splashScene)

// start title
game.scene.start('splashScene')