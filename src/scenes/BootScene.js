import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    // Load any assets here from your assets directory
    this.load.image('faller', 'assets/faller.png');
    this.load.image('hero', 'assets/mc.png');
    this.load.image('island', 'assets/island.png');

    this.load.audio('boink', 'assets/boink.mp3');
    this.load.audio('splat', 'assets/splat.mp3');
    this.load.audio('winner', 'assets/winner.mp3');
  }

  create() {
    this.scene.start('scene-game');
  }
}

export default BootScene;