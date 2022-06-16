/* global Phaser */

// Copyright: Mr Coxall
// Modified by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the menu scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })
      //start button
    
    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  //set the background colour
  init (data) {
 this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Menu Scene')
    //load the image
    this.load.image('menuSceneBackgroundImage', 'assets/menuScene.png')
    //load the start button
    this.load.image('startButton', 'assets/start.png')
    //load the menu music
    this.load.audio('menuMusic', 'audio/menuMusic.mp3')
  }

  create (data) {
    //assign the variable
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackgroundImage')
    //determine the location of the image
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    //determine the location of the start button
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')

    //play the music (Arcade Kid by David Renda)
    this.sound.play('menuMusic')

  //make the button interactive
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }
  //determine how long the scene will show for
  update (time, delta){
  }
//set it to go to game scene when the button is clicked
  clickButton () {
    this.scene.start('gameScene')
    this.sound.stopAll()
  }
}

  export default MenuScene
  