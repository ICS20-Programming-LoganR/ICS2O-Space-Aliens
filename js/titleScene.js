/* global Phaser */

// Copyright: Mr Coxall
// Modified by Logan Rodriguez
// Created on May-Jun 2022
// This file defines the title scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })
// define the variables
  this.titleSceneBackgroundImage = null
  this.titleSceneText = null
  this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }

  init (data) {    
    //set the background colour
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Title Scene')
    // load the title scene
    this.load.image('titleSceneBackgroundImage', 'assets/titleScene.png')
  }

  create (data) {
    //change the location and size of the scene
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackgroundImage')
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
//add text to the title screen
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Duck Hunt', this.titleSceneTextStyle).setOrigin(0.5)
  }

  //determine how long the scene will stay on screen
  update (time, delta){
    if (time > 6000) {
      this.scene.switch('menuScene')
    }
  }
}

  export default TitleScene
  