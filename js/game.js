/* global Phaser */

// copyright: Mr. Coxall
// Modified by Logan Rodriguez
//
// created on May-Jun 2022
// this file defines function for the game

// import the scenes
import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js'
import GameScene from './gameScene.js'

// our game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()

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
  //set the background colour white
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

// load scenes
// every key used is global and can not be reused
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene', gameScene)

// start title
game.scene.start('splashScene')